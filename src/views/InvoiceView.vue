<template>
    <div class="w-[68.8rem] mx-auto pt-4.8 lg:pt-[6.4rem] lg:pb-[5.4rem] lg:w-full lg:mx-0" v-if="state.invoice">
        <button class="flex" @click="goHome">
            <img class="self-center" src="@/assets/images/icon-arrow-left.svg" alt="left arrow">
            <span class="text-black dark:text-white hover:text-blue-gray dark:hover:text-blue-vgray text-fl ml-16 font-bold">Go back</span>
        </button>
        <div class="bg-white dark:bg-blue-vdark h-[8.8rem] px-3.2 flex justify-between items-center shadow-lgs rounded-xls mt-3.2 mb-2.4">
            <div class="flex gap-1.6">
                <span class="self-center text-fl font-medium text-blue-mgray">Status</span>
                <InvoiceStatus :status="state.invoice.status" />
            </div>
            <div class="flex gap-0.8">
                <AppButton text="Edit" type="tetiary" @btn-click="editInvoice"/>
                <AppButton text="Delete" type="secondary" @btn-click="deleteInvoice"/>
                <AppButton text="Mark as Paid" type="primary"/>
            </div> 
        </div>
        <div class="bg-white dark:bg-blue-vdark shadow-lgs rounded-xls px-3.2 pt-4.8 pb-3.2 lg:p-4.8">
            <div class="flex justify-between mb-[2.1rem]">
                <div class="flex flex-col">
                    <h4 class="font-bold text-sl">
                        <span class="text-blue-vgray">#</span>
                        <span class="text-black dark:text-white">{{state.invoice.id}}</span>
                    </h4>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">{{state.invoice.description}}</span>
                </div>
                <p class="text-bs text-blue-gray dark:text-blue-light text-right">
                    {{state.invoice.senderAddress.street}} <br> 
                    {{state.invoice.senderAddress.city}} <br> 
                    {{state.invoice.senderAddress.postCode}} <br> 
                    {{state.invoice.senderAddress.country}}
                </p>
            </div>
            <div class="flex mb-[4.5rem]">
                <div class="flex flex-col gap-3.2">
                    <div>
                        <h5 class="text-fl font-medium text-blue-gray dark:text-blue-light mb-1.2">Invoice Date</h5>
                        <h5 class="text-black dark:text-white font-bold text-ms leading-ms">{{formatDate(state.invoice.createdAt)}}</h5>
                    </div>
                    <div>
                        <h5 class="text-fl font-medium text-blue-gray dark:text-blue-light mb-1.2">Payment Due</h5>
                        <h5 class="text-black dark:text-white font-bold text-ms leading-ms">{{formatDate(state.invoice.paymentDue)}}</h5>
                    </div>       
                </div>
                <div class="flex flex-col gap-0.8 ml-40 mr-44">
                    <div>
                        <h5 class="text-fl font-medium text-blue-gray dark:text-blue-light mb-1.2">Bill To</h5>
                        <h5 class="text-black dark:text-white font-bold text-ms leading-ms">{{state.invoice.clientName}}</h5>
                    </div> 
                    <p class="text-bs text-blue-gray dark:text-blue-light">
                        {{state.invoice.clientAddress.street}} <br> 
                        {{state.invoice.clientAddress.city}} <br> 
                        {{state.invoice.clientAddress.postCode}} <br> 
                        {{state.invoice.clientAddress.country}}
                    </p>
                </div>
                <div class="flex">
                    <div>
                        <h5 class="text-fl font-medium text-blue-gray dark:text-blue-light mb-1.2">Sent To</h5>
                        <h5 class="text-black dark:text-white font-bold text-ms leading-ms">{{state.invoice.clientEmail}}</h5>
                    </div> 
                </div>
            </div>
            <div class="bg-blue-vlight dark:bg-blue-dark px-3.2 pt-3.2 pb-16 rounded-t-xls">
                <div class="grid grid-cols-[28.4rem_3rem_1fr_1fr]">
                    <span class="text-blue-gray dark:text-blue-light text-bs font-medium">Item name</span>
                    <span class="text-blue-gray dark:text-blue-light text-bs font-medium text-center">QTY.</span>
                    <span class="text-blue-gray dark:text-blue-light text-bs font-medium text-right">Price</span>
                    <span class="text-blue-gray dark:text-blue-light text-bs font-medium text-right">Total</span>
                </div>
                <div v-for="item in state.invoice.items" :key="item.name" class="grid grid-cols-[28.4rem_3rem_1fr_1fr] mt-3.2">
                    <span class="text-black dark:text-white text-fl font-bold">{{item.name}}</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-bold text-center">{{item.quantity}}</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-bold text-right">£ {{formatAmount(item.price)}}</span>
                    <span class="text-black dark:text-white text-fl font-bold text-right">£ {{formatAmount(item.total)}}</span>
                </div>
            </div>
            <div class="flex justify-between items-center bg-blue-deep dark:bg-black text-white px-3.2 h-32 rounded-b-xls">
                <span class="font-medium text-bs">Amount Due</span>
                <span class="font-bold text-[2.4rem] leading-[3.2rem]">£ {{formatAmount(state.invoice.total)}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import InvoiceStatus from '@/components/InvoiceStatus.vue';
import  type { Invoice } from '@/models';
import { formatAmount, formatDate } from '@/helpers';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '@/store';

    interface Props { 
        id: string
    }
    interface State {
        invoice?: Invoice,
    }
    const props = defineProps<Props>(),
    state = reactive<State>({}),
    router = useRouter(),
    goHome = () => router.push({name: 'home'}),
    editInvoice = () => {
        store.setInvoice({...state.invoice} as Invoice)
        store.toggleFormMode()
    },
    deleteInvoice = () => store.toggleModalMode()

    onMounted(() => {
        if (!store.invoices.length) {
            store.getInvoices();
        }
        
        const selectedInvoice = store.invoices.find(i => i.id === props.id);
        if (!selectedInvoice) {
            goHome();
            return;
        }
        state.invoice = selectedInvoice;
    })
</script>