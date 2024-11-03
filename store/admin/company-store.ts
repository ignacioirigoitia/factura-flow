import { Company } from "@/interfaces";
import { create } from "zustand";

interface State {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;

  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}


export const useAdminCompanyStore = create<State>()((set) => ({
  openDialog: false,
  selectedCompany: null,
  setSelectedCompany: (company: Company | null) => set({ selectedCompany: company }),
  setOpenDialog: (value) => set({ openDialog: value }),
}))