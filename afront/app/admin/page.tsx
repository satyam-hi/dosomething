
import { cookies } from "next/headers";
import LogoutButton from "@/app/component/admin/logoutbtn"

export default async function AdminHome() {
  const cookieStore = await cookies();               // ✔ correct
  const id = cookieStore.get("id")?.value;     // ✔ correct
  const role = cookieStore.get("role")?.value; // ✔ correct

  return (
    <>
    <LogoutButton/>
      AdminHome page — ID: {id}, Role: {role}
      {role === "1" ?<p>You are User  </p>:<p>You are Provider  </p>}
    </>
  );
}




