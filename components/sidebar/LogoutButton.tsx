'use client'

import { logout } from "@/actions/auth/logout";
import { IoLogOutOutline } from "react-icons/io5";


export const LogoutButton = () => {

  const onLogout = async () => {
    await logout();
    window.location.replace('/')
  }

  return (
    <button
      onClick={() => onLogout()}
      className="flex items-center text-red-500 hover:text-red-400 focus:outline-none"
    >
      <IoLogOutOutline size={20} className="mr-2" />
      <span className="font-semibold">Cerrar sesión</span>
    </button>
  )
}
