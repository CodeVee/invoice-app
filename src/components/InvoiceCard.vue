<script setup lang="ts">
import type { Invoice } from '@/models/invoice';
import { formatAmount, formatDate } from '@/helpers/main.helper';
import InvoiceStatus from './InvoiceStatus.vue';

interface Props {
    invoice: Invoice
}
interface Emits {
    (e: 'select'): void
}
const props = defineProps<Props>(),
emits = defineEmits<Emits>(),
viewMore = () => emits('select');


</script>

<template>
    <div @click="viewMore" class="bg-white dark:bg-blue-vdark flex items-center h-[7.2rem] shadow-lgs pl-[3.2rem] pr-[2.4rem] rounded-xls cursor-pointer active:scale-[.99]">
        <h3 class="text-fl font-bold mr-[4.3rem]">
            <span class="text-blue-gray">#</span>
            <span class=" text-black dark:text-white">{{invoice.id}}</span>
        </h3>
        <h3 class="mr-[4.5rem] text-fl font-medium">
            <span class="text-blue-gray dark:text-blue-light">Due  </span>
            <span class=" text-blue-vgray dark:text-blue-light">{{formatDate(props.invoice.paymentDue)}}</span>
        </h3>
        <h3 class="text-blue-mgray dark:text-white mr-[7.3rem] text-fl font-medium">{{invoice.clientName}}</h3>
        <h3 class="text-black dark:text-white mr-16  text-sl font-bold">
            £ {{formatAmount(invoice.total)}}
        </h3>
        <InvoiceStatus :status="invoice.status"/>
        <button>
            <img src="@/assets/images/icon-arrow-right.svg" alt="right-arrow">
        </button>
    </div>
</template>
