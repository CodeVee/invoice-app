import { formatFormDate } from "@/helpers";
import { add } from "date-fns";

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: status;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
}

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface InvoiceItem {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export const DefaultInvoice: Invoice = {
  id: '',
  createdAt: '2022-11-24',
  paymentDue: '2022-11-25',
  description: '',
  paymentTerms: 1,
  clientName: '',
  clientEmail: '',
  status: 'draft',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: [],
  total: 0,
}

export const getDefaultInvoice = () => {
  const today = new Date(),
  createdAt = formatFormDate(today),
  paymentDue = formatFormDate(add(today, { days: DefaultInvoice.paymentTerms }))
  
  const invoice = { ...DefaultInvoice, createdAt, paymentDue } as Invoice
  return JSON.parse(JSON.stringify(invoice)) as Invoice
}

export type status = 'paid' | 'pending' | 'draft'

export interface Option {
  id: number;
  name: string;
}