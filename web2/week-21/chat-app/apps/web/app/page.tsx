"use client"
import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div style={{ height: "100vh", width: "100vw", background: "black", display: "flex", justifyContent: "center", justifyItems: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <TextInput placeholder={"Join room"} onChange={() => alert("creffrfr")}/>
        <button onClick={() => {
          router.push("/chat")
        }}>Join room</button>
      </div>
    </div>
  );
}