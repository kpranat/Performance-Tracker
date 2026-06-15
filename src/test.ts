import { registerMember, loginUser } from "./auth";

async function runTests() {
  console.log("--- Starting Backend Tests ---");

  console.log("\nTesting Registration...");
  const registerResult = await registerMember(
    "Test User", 
    "testuser@example.com", 
    "mySecretPassword123"
  );
  console.log(registerResult);

  console.log("\nTesting Login...");
  const loginResult = await loginUser(
    "testuser@example.com", 
    "mySecretPassword123"
  );
  console.log(loginResult);

  console.log("\nTesting Failed Login...");
  const failedLogin = await loginUser(
    "testuser@example.com", 
    "wrongpassword!"
  );
  console.log(failedLogin);

  process.exit(0);
}

runTests();