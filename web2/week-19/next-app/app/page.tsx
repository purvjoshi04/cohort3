import Link from "next/link";

export default async function Home() {
  return (
    <div className="text-lg w-screen h-screen flex items-center justify-center">
      <div>
        Todo application
        <br />
        <Link href={"/signup"}>Sign up to Todo app</Link>
        <br />
        <Link href={"/signin"}>Sign in to Todo app</Link>
      </div>
    </div>
  );
}
