import bcryptjs from 'bcryptjs';

interface SeedInvoices {
    fechaActual: Date;
    monto: number;
    CAE: string;
    fechaDeFactura: Date;
    numeroDeFactura: string;
    periodo: string;
    estado: Estado;
}

interface SeedCompany {
    nombre: string;
    activo: boolean;
}

interface SeedEmployee {
    nombreCompleto: string;
    correo: string;
    telefono: string;
    password: string;
    rol: 'admin'|'administrator'|'user';
    activo: boolean;
}

type Estado = 'PENDIENTE' | 'REGISTRADA' | 'PAGADA' | 'CANCELADA';

interface SeedData {
    invoices: SeedInvoices[],
    companies: SeedCompany[],
    users: SeedEmployee[],
}

export const initialData: SeedData = {
    users: [
        {
            nombreCompleto: 'Admin',
            correo: 'admin@google.com',
            telefono: '123456789',
            password: bcryptjs.hashSync('123456', 10),
            rol: 'admin',
            activo: true
        },
        {
            nombreCompleto: 'User',
            correo: 'user@google.com.ar',
            telefono: '123456789',
            password: bcryptjs.hashSync('123456', 10),
            rol: 'user',
            activo: false,
        }
    ],
    companies: [
        {
            nombre: 'Consultorio 1',
            activo: true
        },
        {
            nombre: 'Consultorio 2',
            activo: true
        },
        {
            nombre: 'Consultorio 3',
            activo: false
        },
        {
            nombre: 'Consultorio 4',
            activo: true
        }
    ],
    invoices: [
        {
            fechaActual: new Date(),
            monto: 72500,
            CAE: '123456713',
            fechaDeFactura: new Date(),
            numeroDeFactura: '0001-00000001',
            periodo: '01/2021',
            estado: 'PENDIENTE'
        },
        {
            fechaActual: new Date(),
            monto: 72500,
            CAE: '123456712',
            fechaDeFactura: new Date(),
            numeroDeFactura: '0001-00000002',
            periodo: '01/2021',
            estado: 'REGISTRADA'
        },
        {
            fechaActual: new Date(),
            monto: 72500,
            CAE: '123456711',
            fechaDeFactura: new Date(),
            numeroDeFactura: '0001-00000003',
            periodo: '03/2021',
            estado: 'PAGADA'
        },
        {
            fechaActual: new Date(),
            monto: 72500,
            CAE: '123456710',
            fechaDeFactura: new Date(),
            numeroDeFactura: '0001-00000004',
            periodo: '02/2021',
            estado: 'CANCELADA'
        }
    ]
}