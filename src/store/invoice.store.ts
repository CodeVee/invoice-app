import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import type { Invoice, status } from '@/models';
import jsonInvoices from '@/data/invoices.json'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices = ref<Invoice[]>([]),
  filterStatus = ref<status[]>([]),
  selectedInvoice =  ref<Invoice | null>(null),
  filteredInvoices = computed(() => {
    if (filterStatus.value.length) {
        return invoices.value.filter(i => filterStatus.value.includes(i.status));
    } 
    return invoices.value;
  }),

  getInvoices = () => {
    invoices.value = jsonInvoices as Invoice[];
  },

  setInvoice = (invoice: Invoice) => {
    selectedInvoice.value = {...invoice}
  },

  setStatus = (status: status[]) => {
    filterStatus.value = [...status]
  }

  return { invoices, selectedInvoice, filteredInvoices, filterStatus, getInvoices, setInvoice, setStatus }
})