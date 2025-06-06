import {getEmployeeCompanies} from "@/actions/employee/get-employee-companies";
import {Pagination} from "@/components/pagination/Pagination";
import {InvoicesPaginatedGrid} from "./ui/InvoicesPaginatedGrid";
import InvoiceAdminHeader from "@/components/admin/InvoiceAdminHeader";
import {getAllAdminInvoicesPaginated} from "@/actions/admin-invoices/get-all-admin-invoices";


export default async function InvoicesManagement({searchParams}: { searchParams: { [key: string]: string } }) {

    try {
        const page = Number(searchParams.page) || 1;
        const concept = searchParams.concept ?? undefined;
        const date = searchParams.date ?? undefined;

        const [invoicesData, companyData] = await Promise.all([
            getAllAdminInvoicesPaginated({page, take: 12, concept, date}),
            getEmployeeCompanies()
        ]);

        const {totalPages, invoices} = invoicesData;
        const {companies} = companyData;

        return (
            <div className="container mx-auto p-6 space-y-4">
                <InvoiceAdminHeader companies={companies ?? []}/>
                <InvoicesPaginatedGrid invoices={invoices ?? []}/>
                {
                    ((totalPages ?? 0) > 1 && <Pagination totalPages={totalPages}/>)
                }
            </div>
        );
    } catch (error) {
        console.error("Error al cargar la página de facturas:", error);
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-red-600">Error al Cargar la Página</h1>
                <p>Hubo un problema al obtener los datos de las facturas. Por favor, recarga la página o inténtalo más
                    tarde.</p>
            </div>
        )
    }

}