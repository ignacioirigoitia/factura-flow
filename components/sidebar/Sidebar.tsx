
import Image from 'next/image'
import React from 'react'
import { IoBusinessOutline, IoPeopleOutline, IoDocumentTextOutline, IoLogOutOutline, IoPaperPlaneOutline } from 'react-icons/io5'

import { SidebarMenuItem } from './SidebarMenuItem'
import Link from 'next/link'

const menuItems = [
    {
        path: '/dashboard/company',
        icon: <IoBusinessOutline size={40} />,
        title: 'Administrativo',
        subtitle: 'Facturas para el administrativo'
    },
    {
        path: '/dashboard/supplie',
        icon: <IoPeopleOutline size={40} />,
        title: 'Empleado',
        subtitle: 'Facturas para el empleado'
    },
    {
        path: '/admin/company',
        icon: <IoDocumentTextOutline size={40} />,
        title: 'Consultorios',
        subtitle: 'Gestion de consultorios'
    },
    {
        path: '/admin/users',
        icon: <IoPaperPlaneOutline size={40} />,
        title: 'Usuarios',
        subtitle: 'Gestion de usuarios'
    },
]

export const Sidebar = () => {

    return (
        <div 
            id="menu" 
            className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-scroll"
            style={{width: '400px'}}
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
                            src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c" 
                            alt="User avatar" 
                        />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        Ignacio Irigoitia
                    </span>
                </div>
            </div>

            <div id="nav" className="w-full px-6">
                {
                    menuItems.map(item => (
                        <SidebarMenuItem {...item} key={item.path} />
                    ))
                }
            </div>

            <div className="absolute bottom-4 w-full px-6">
                <Link
                    href={'/auth/login'} 
                    className="flex items-center text-red-500 hover:text-red-400 focus:outline-none"
                >
                    <IoLogOutOutline size={20} className="mr-2" />
                    <span className="font-semibold">Cerrar sesión</span>
                </Link>
            </div>
        </div>
    )
}
