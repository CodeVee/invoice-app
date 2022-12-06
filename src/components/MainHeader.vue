<template>
    <div class="h-[5.9rem] mb-3.2 md:mb-[6.5rem] flex items-center">
        <div class="flex flex-col mr-auto">
            <h1 class="text-tl md:text-max text-black dark:text-white font-bold md:mb-0.8">Invoices</h1>
            <h2 class="text-blue-vgray dark:text-blue-light text-fl font-medium">
              <span class="hidden md:inline">{{invoiceMessage}}</span>
              <span class="md:hidden">{{invoiceMobileMessage}}</span>  
            </h2>
        </div>
        <invoice-filter :status="filterStatus" @status-change="filterInvoices"/>
        <button @click="addInvoice" class="w-36 md:w-[15rem] h-[4.8rem] px-2 md:px-0.8 rounded-[2.4rem] bg-purple hover:bg-purple-light flex items-center">
            <span class="w-3.2 h-3.2 rounded-full bg-white flex justify-center items-center">
                <img src="@/assets/images/icon-plus.svg" alt="plus">
            </span>
            <span class="text-white text-fl font-bold ml-0.8 md:ml-1.6">New <span class="hidden md:inline">Invoice</span></span>
        </button>
    </div>
</template>

<script setup lang="ts">
import InvoiceFilter from './InvoiceFilter.vue';
import type { status } from '@/models';
import { computed } from 'vue';
import { useInvoiceStore, useAppStore } from '@/store'
import { useScreen } from 'vue-screen'
import { storeToRefs } from 'pinia';

    interface Props { 
        invoiceCount: number
    }
    interface Emits {
        (e: 'open'): void
    }

    const screen = useScreen(),
    istore = useInvoiceStore(),
    astore = useAppStore(),
    { filterStatus } = storeToRefs(istore),
    { setStatus } = istore,
    { toggleFormMode } = astore,
    { mobileWidth } = storeToRefs(astore),
    props = defineProps<Props>(),
    emits = defineEmits<Emits>(),
    isMobile = computed(() => screen.width < mobileWidth.value),
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
    invoiceMobileMessage = computed(() => {
        switch (props.invoiceCount) {
            case 0:
                return 'No invoices';
            case 1:
                return `${props.invoiceCount} toinvoice`;
            default:
                return `${props.invoiceCount} invoices`;
        }
    }),
    filterInvoices = (status: status[]) => {
        setStatus(status)
    },
    addInvoice = () => {
        if (isMobile.value) {
            emits('open')
        } else {
            toggleFormMode()
        }
    }
</script>
