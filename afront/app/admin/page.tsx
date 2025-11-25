
import { cookies } from "next/headers";
import UserLogoutButton from "@/app/component/admin/userLogouteBtn/logoutbtn"
import ProviderLogoutButton from "@/app/component/admin/providerLogouteBtn/logoutbtn"

export default async function AdminHome() {
  const cookieStore = await cookies();               // ✔ correct
  const id = cookieStore.get("id")?.value;     // ✔ correct
  const role = cookieStore.get("role")?.value; // ✔ correct

  return (
    <>
   {role== "2" ? <ProviderLogoutButton /> : <UserLogoutButton/>}
    
      AdminHome page — ID: {id}, Role: {role}
      {role === "1" ?<p>You are User  </p>:<p>You are Provider  </p>}
    </>
  );
}




