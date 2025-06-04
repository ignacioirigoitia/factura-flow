
import Image from 'next/image'
import React from 'react'
import { 
    IoBusinessOutline, 
    IoPeopleOutline, 
    IoDocumentTextOutline, 
    IoPaperPlaneOutline 
} from 'react-icons/io5'

import { SidebarMenuItem } from './SidebarMenuItem'
import { auth } from '@/auth.config'
import { LogoutButton } from './LogoutButton'


const menuUserItems = [
    {
        path: '/dashboard/supplie',
        icon: <IoPeopleOutline size={40} />,
        title: 'Facturas',
        subtitle: 'Carga tus facturas aqui'
    },
]
const menuAdminItems = [
    {
        path: '/admin/company',
        icon: <IoBusinessOutline size={40} />,
        title: 'Administrativo',
        subtitle: 'Mira tus facturas aqui'
    },
    {
        path: '/admin/users',
        icon: <IoPaperPlaneOutline size={40} />,
        title: 'Usuarios',
        subtitle: 'Gestion de usuarios'
    },
    {
        path: '/admin/invoices',
        icon: <IoDocumentTextOutline size={40} />,
        title: 'Mis Facturas',
        subtitle: 'Mira todas las facturas aqui'
    }
]

const menuSuperAdmin = [
    {
        path: '/administrator/company',
        icon: <IoDocumentTextOutline size={40} />,
        title: 'Consultorios',
        subtitle: 'Gestion de consultorios'
    },
    {
        path: '/administrator/users',
        icon: <IoPaperPlaneOutline size={40} />,
        title: 'Usuarios',
        subtitle: 'Gestion de usuarios'
    },
    {
        path: '/administrator/invoices',
        icon: <IoBusinessOutline size={40} />,
        title: 'Facturas',
        subtitle: 'Mira todas las facturas aqui'
    },
]

export const Sidebar = async () => {

    const session = await auth();
    const isAdmin = session?.user.rol === 'admin';
    const isUser = session?.user.rol === 'user';

    return (
        <div
            id="menu"
            className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-scroll"
            style={{ width: '400px' }}
        >

            <div id="logo" className="my-4 px-6">
                <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
                    <IoDocumentTextOutline className='mr-2' />
                    <span>Factura</span>
                    <span className="text-blue-500">Flow</span>.
                </h1>
                <p className="text-slate-500 text-sm">Controla tus facturas</p>
            </div>
            <div id="profile" className="px-6 py-4 mb-4">
                <p className="text-slate-500 mb-2">Bienvenido,</p>
                <div className="inline-flex space-x-2 items-center">
                    <span>
                        <Image
                            className="rounded-full w-8 h-8"
                            width={50}
                            height={50}
                            src="https://res.cloudinary.com/dcyx4jnch/image/upload/v1733463051/profile-default-icon-2048x2045-u3j7s5nj_ob96dp.png"
                            alt="User avatar"
                        />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        {session?.user.nombreCompleto}
                    </span>
                </div>
            </div>

            <div id="nav" className="w-full px-6">
                {
                    isAdmin ? menuAdminItems.map(item => (
                        <SidebarMenuItem {...item} key={item.path} />
                    )) : isUser ? menuUserItems.map(item => (
                        <SidebarMenuItem {...item} key={item.path} />
                    )) : menuSuperAdmin.map(item => (
                        <SidebarMenuItem {...item} key={item.path} />
                    ))
                }
            </div>

            <div className="absolute bottom-4 w-full px-6">
                <LogoutButton />
            </div>
        </div>
    )
}
