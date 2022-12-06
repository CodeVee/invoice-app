import type { Option } from "@/models";
import { defineStore } from "pinia";
import { useInvoiceStore } from "./invoice.store";

export const useAppStore = defineStore("app", {
  state: () => ({
    mobileWidth: 500,
    formMode: false,
    darkMode: false,
    modalMode: false,
    showOverlay: false,
    options: [
      { id: 1, name: "Net 1 Day" },
      { id: 7, name: "Net 7 Day" },
      { id: 14, name: "Net 14 Day" },
      { id: 30, name: "Net 30 Day" },
    ] as Option[],
  }),
  actions: {
    toggleFormMode() {
      this.formMode = !this.formMode;
      this.showOverlay = this.formMode;
      if (!this.formMode) {
        const istore = useInvoiceStore();
        istore.selectedInvoice = null;
      }
    },

    toggleModalMode() {
      this.modalMode = !this.formMode;
      this.showOverlay = this.modalMode;
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },

    closeBackDrop() {
      this.showOverlay = false;
      this.modalMode = false;
      this.formMode = false;
      const istore = useInvoiceStore();
      istore.selectedInvoice = null;
    },
  },
});
