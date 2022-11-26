import { DefaultInvoice, type Invoice } from '@/models/invoice';
import { reactive } from 'vue'

interface Store {
    formMode: boolean;
    darkMode: boolean;
    editMode: boolean;
    invoice: Invoice;
    toggleFormMode(): void;
    toggleDarkMode(): void
    setEditMode(invoice: Invoice): void
}

export const store = reactive<Store>({
  formMode: false,
  darkMode: false,
  editMode: false,
  invoice: { ... DefaultInvoice},

  toggleFormMode() {
    this.formMode = !this.formMode
    if (!this.formMode) {
        this.editMode = false;
        this.invoice = { ... DefaultInvoice}
    }
  },
  
  toggleDarkMode() {
    this.darkMode = !this.darkMode
  },

  setEditMode(invoice: Invoice) {
    this.editMode = true;
    this.formMode = true;
    this.invoice = invoice
  }
})