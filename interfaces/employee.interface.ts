import { Company } from "./company.interface";



export interface Employee {
  id: string
  nombreCompleto: string
  correo: string;
  password: string;
  telefono: string;
  rol: 'admin'|'administrator'|'user';
  companyId: string | null;
  company?: Company;
  activo: boolean
}