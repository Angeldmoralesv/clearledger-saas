"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignOut } from "@phosphor-icons/react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button className="logout-btn" onClick={handleLogout} disabled={loading}>
      <SignOut size={16} />
      {loading ? "Saliendo..." : "Cerrar sesión"}
    </button>
  );
}
