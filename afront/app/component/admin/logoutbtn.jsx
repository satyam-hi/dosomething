"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <p><button onClick={() => router.push("/admin/logout")}>
      Logout
    </button></p>
  );
}