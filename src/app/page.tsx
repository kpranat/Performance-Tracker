// const Home = () => {
//   return (
//     <div className="flex flex-1 flex-col items-center justify-center">
//       <h1 className="font-serif text-7xl">Performance Tracker</h1>
//       Happy Coding{" <3"}
//     </div>
//   );
// };
// export default Home;
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}