import { CreateInvoice } from "./InvoiceHeader";


interface Props {
  newInvoice: CreateInvoice;
}

export const InvoiceInformation = ({newInvoice}: Props) => {
  return (
    <div className="mt-4">
      <div className="text-sm font-semibold">Datos de la factura</div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-sm">Monto</div>
          <div className="text-lg font-semibold">${newInvoice.monto?.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm">CAE</div>
          <div className="text-lg font-semibold">{newInvoice.CAE}</div>
        </div>
        <div>
          <div className="text-sm">Fecha de Emisión</div>
          <div className="text-lg font-semibold">{newInvoice.fechaDeFactura?.toLocaleDateString('es')}</div>
        </div>
        <div>
          <div className="text-sm">Nro de Factura</div>
          <div className="text-lg font-semibold">{newInvoice.numeroDeFactura}</div>
        </div>
        <div>
          <div className="text-sm">Periodo</div>
          <div className="text-lg font-semibold">{newInvoice.periodo}</div>
        </div>
      </div>
    </div>
  )
}
