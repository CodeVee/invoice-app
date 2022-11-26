<template>
    <div class="h-[5.9rem] mb-[6.5rem] flex items-center">
        <div class="flex flex-col">
            <h1 class="text-max text-black dark:text-white font-bold mb-0.8">Invoices</h1>
            <h2 class="text-blue-vgray dark:text-blue-light text-fl font-medium">{{invoiceMessage}}</h2>
        </div>
        <button class="flex mr-16 ml-auto">
            <span class="mr-1.6 text-black dark:text-white font-bold text-fl">Filter by status</span>
            <img class="self-center" src="@/assets/images/icon-arrow-down.svg" alt="down arrow">
        </button>
        <button class="w-[15rem] h-[4.8rem] px-0.8 rounded-[2.4rem] bg-purple flex items-center">
            <span class="w-3.2 h-3.2 rounded-full bg-white flex justify-center items-center">
                <img src="@/assets/images/icon-plus.svg" alt="plus">
            </span>
            <span class="text-white text-fl font-bold ml-1.6">New Invoice</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

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
    })
</script>

<style scoped>

</style>