import { DefaultInvoice, type Invoice } from '@/models/invoice';
import { reactive } from 'vue'
import jsonInvoices from '@/data/invoices.json'

interface Store {
    formMode: boolean;
    darkMode: boolean;
    editMode: boolean;
    showOverlay: boolean;
    modalMode: boolean;
    invoices: Invoice[];
    selectedInvoice?: Invoice;
    toggleFormMode(invoice?: Invoice): void;
    toggleDarkMode(): void;
    toggleModalMode(): void;
    getInvoices(): void;
    closeBackDrop(): void;
    handleForm(): void;
    setInvoice(invoice?: Invoice): void;
}

export const store = reactive<Store>({
  formMode: false,
  darkMode: false,
  editMode: false,
  modalMode: false,
  showOverlay: false,
  invoices: [],

  toggleFormMode() {
    this.formMode = !this.formMode;
    this.showOverlay = this.formMode;
    this.handleForm();
  },
  toggleModalMode() {
    this.modalMode = !this.formMode;
    this.showOverlay = this.modalMode;
  },
  
  toggleDarkMode() {
    this.darkMode = !this.darkMode
  },

  getInvoices() {
    const invoices = jsonInvoices as Invoice[]; 
    this.invoices = invoices
  },

  closeBackDrop() {
    this.showOverlay = false;
    this.modalMode = false;
    this.formMode = false;
    this.handleForm();
  },

  handleForm() {
    if (this.formMode ) {

      if (this.selectedInvoice) 
        this.editMode = true
      else {
        this.editMode = false;
        this.selectedInvoice = { ...DefaultInvoice}
      }
        
    }

    if (!this.formMode) {
        this.editMode = false;
    }
  },

  setInvoice(invoice?: Invoice) {
    this.selectedInvoice = invoice
  }
})