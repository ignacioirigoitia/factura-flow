import { auth } from "@/auth.config";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { redirect } from "next/navigation";



export default async function DashboardLayout({children}: {children: React.ReactNode; }) {

  const session = await auth();

  if(session?.user?.rol !== 'user') {
    redirect('/auth/login');
  }

  return (
    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">

      <div className="flex">

        <Sidebar />
          
        
        <div className="w-full text-slate-900">
          {children}
        </div>

      </div>
    </div>
  );
}