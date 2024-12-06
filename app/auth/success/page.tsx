import { auth } from "@/auth.config";
import { redirect } from "next/navigation";



export default async function AuthSuccess() {

  const session = await auth();

  if (session) {
    if (session.user?.rol === 'admin') {
      redirect('/admin/company');
    }
    if (session.user?.rol === 'user') {
      redirect('/dashboard/supplie');
    }
    if (session.user?.rol === 'administrator') {
      redirect('/administrator/company')
    }
  }

  redirect('/auth/login');
}