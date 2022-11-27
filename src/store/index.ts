import { DefaultInvoice, type Invoice } from '@/models/invoice';
import { reactive } from 'vue'

interface Store {
    formMode: boolean;
    darkMode: boolean;
    editMode: boolean;
    invoices: Invoice[];
    selectedInvoice: Invoice | null;
    toggleFormMode(invoice?: Invoice): void;
    toggleDarkMode(): void,
    getInvoices(): Promise<void>
}

export const store = reactive<Store>({
  formMode: false,
  darkMode: false,
  editMode: false,
  invoices: [],
  selectedInvoice: null,

  toggleFormMode(invoice?: Invoice) {
    this.formMode = !this.formMode

    if (this.formMode) {
        this.editMode = !!invoice;
        this.selectedInvoice = invoice ? invoice : {...DefaultInvoice}
    }

    if (!this.formMode) {
        this.editMode = false;
        this.selectedInvoice = null
    }
  },
  
  toggleDarkMode() {
    this.darkMode = !this.darkMode
  },

  async getInvoices() {
    const data = await fetch('/invoices.json');
    const invoices = await data.json() as Invoice[]; 
    this.invoices = invoices
  }
})