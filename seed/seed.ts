

interface SeedInvoices {
    fechaActual: Date;
    monto: number;
    CAE: string;
    fechaDeFactura: Date;
    numeroDeFactura: string;
    periodo: string;
    estado: Estado;
}

type Estado = 'PENDIENTE' | 'REGISTRADA' | 'PAGADA' | 'CANCELADA';

interface SeedData {
    invoices: SeedInvoices[],
}

export const initialData: SeedData = {
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