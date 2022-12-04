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
  paymentDue: '2022-11-24',
  description: '',
  paymentTerms: 0,
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

export const getDefaultInvoice = () => JSON.parse(JSON.stringify(DefaultInvoice)) as Invoice

export type status = 'paid' | 'pending' | 'draft'
