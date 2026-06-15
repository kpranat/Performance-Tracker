import bcrypt from "bcrypt";
import { db } from "./lib/db";
import { members } from "./db/schema";
import { eq } from "drizzle-orm";

export async function loginUser(email: string, password: string) {
  const users = await db.select().from(members).where(eq(members.email, email)).limit(1);

  if (users.length === 0) {
    return { success: false, message: "User not found" };
  }

  const foundUser = users[0];


  const isMatch = await bcrypt.compare(password, foundUser.password_hash);


  if (isMatch) {
    return { success: true, user: foundUser };
  } else {
    return { success: false, message: "Invalid password" };
  }
}

export async function registerMember(name: string, email: string, plainTextPassword: string) {
  try {
  
    const saltRounds = 12; 
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    const newMember = await db.insert(members).values({
      name: name,
      email: email,
      password_hash: hashedPassword,
    }).returning(); 

    console.log("Success! Member created:", newMember[0].name);
    return { success: true, member: newMember[0] };

  } catch (error) {
    console.error("Error creating member:", error);
    return { success: false, message: "Failed to register member. Email might already exist." };
  }
}