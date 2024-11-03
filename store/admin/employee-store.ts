


import { Employee } from "@/interfaces";
import { create } from "zustand";

interface State {
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;

  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}


export const useAdminEmployeeStore = create<State>()((set) => ({
  openDialog: false,
  selectedEmployee: null,
  setSelectedEmployee: (employee: Employee | null) => set({ selectedEmployee: employee }),
  setOpenDialog: (value) => set({ openDialog: value }),
}))