import { format } from 'date-fns';

export const formatDate = (value: string) => format(new Date(value), 'dd MMM yyyy')
export const formatFormDate = (date: string | Date) => {
    const dateEl = new Date(date);
    return format(dateEl, 'yyyy-MM-dd');
}

export const formatAmount = (value: number) => Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(value)
