import { DefaultInvoice, type Invoice, type status } from '@/models/invoice';
import { reactive } from 'vue'
import jsonInvoices from '@/data/invoices.json'

interface Store {
    formMode: boolean;
    darkMode: boolean;
    editMode: boolean;
    showOverlay: boolean;
    modalMode: boolean;
    invoices: Invoice[];
    filteredInvoices: Invoice[];
    filterStatus: status[];
    selectedInvoice: Invoice;
    toggleFormMode(): void;
    toggleDarkMode(): void;
    toggleModalMode(): void;
    getInvoices(): void;
    closeBackDrop(): void;
    handleForm(): void;
    setInvoice(invoice: Invoice): void;
    setStatus(status: status[]): void;
    filterInvoices(): void;
}

export const store = reactive<Store>({
  formMode: false,
  darkMode: false,
  editMode: false,
  modalMode: false,
  showOverlay: false,
  invoices: [],
  filteredInvoices: [],
  filterStatus: [],
  selectedInvoice: { ...DefaultInvoice},

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
    this.invoices = invoices;
    this.filteredInvoices = [...invoices];
  },

  closeBackDrop() {
    this.showOverlay = false;
    this.modalMode = false;
    this.formMode = false;
    this.editMode = false;
    this.handleForm();
  },

  handleForm() {
    if (this.formMode && !!this.selectedInvoice.id) {
      this.editMode = true
    }

    if (!this.formMode) {
      this.editMode = false;
    }
  },

  setInvoice(invoice: Invoice) {
    this.selectedInvoice = invoice
  },

  setStatus(status: status[]) {
    this.filterStatus = [...status]
  },

  filterInvoices() {
    if (this.filterStatus.length) {
      this.filteredInvoices = this.invoices.filter(i => this.filterStatus.includes(i.status));
    } else {
      this.filteredInvoices = [...this.invoices];
    }
  }
})