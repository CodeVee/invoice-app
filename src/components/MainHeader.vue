<template>
    <div class="h-[5.9rem] mb-[6.5rem] flex items-center">
        <div class="flex flex-col mr-auto">
            <h1 class="text-max text-black dark:text-white font-bold mb-0.8">Invoices</h1>
            <h2 class="text-blue-vgray dark:text-blue-light text-fl font-medium">{{invoiceMessage}}</h2>
        </div>
        <invoice-filter :status="store.filterStatus" @status-change="filterInvoices"/>
        <button @click="store.toggleFormMode()" class="w-[15rem] h-[4.8rem] px-0.8 rounded-[2.4rem] bg-purple hover:bg-purple-light flex items-center">
            <span class="w-3.2 h-3.2 rounded-full bg-white flex justify-center items-center">
                <img src="@/assets/images/icon-plus.svg" alt="plus">
            </span>
            <span class="text-white text-fl font-bold ml-1.6">New Invoice</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import InvoiceFilter from './InvoiceFilter.vue';
import type { status } from '@/models/invoice';
import { computed } from 'vue';
import { store } from '@/store';

    interface Props { 
        invoiceCount: number
    }
    const props = defineProps<Props>(),
    invoiceMessage = computed(() => {
        switch (props.invoiceCount) {
            case 0:
                return 'No invoices';
            case 1:
                return `There is ${props.invoiceCount} total invoice`;
            default:
                return `There are ${props.invoiceCount} total invoices`;
        }
    }),
    filterInvoices = (status: status[]) => {
        store.setStatus(status);
        store.filterInvoices();
    }
</script>
