import type { Invoice, status } from '@/models';
import { reactive } from 'vue'
import jsonInvoices from '@/data/invoices.json'

interface Store {
    mobileWidth: number;
    formMode: boolean;
    darkMode: boolean;
    showOverlay: boolean;
    modalMode: boolean;
    invoices: Invoice[];
    filteredInvoices: Invoice[];
    filterStatus: status[];
    selectedInvoice: Invoice | null;
    toggleFormMode(): void;
    toggleDarkMode(): void;
    toggleModalMode(): void;
    getInvoices(): void;
    closeBackDrop(): void;
    setInvoice(invoice: Invoice): void;
    setStatus(status: status[]): void;
    filterInvoices(): void;
}

export const store = reactive<Store>({
  mobileWidth: 500,
  formMode: false,
  darkMode: false,
  modalMode: false,
  showOverlay: false,
  invoices: [],
  filteredInvoices: [],
  filterStatus: [],
  selectedInvoice: null,

  toggleFormMode() {
    this.formMode = !this.formMode;
    this.showOverlay = this.formMode;
    if (!this.formMode) {
      this.selectedInvoice = null
    }
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
    this.selectedInvoice = null
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