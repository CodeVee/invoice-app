<script setup lang="ts">
import type { Invoice } from '@/models/invoice';
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import InvoiceCard from '../components/InvoiceCard.vue';
import NoInvoice from '../components/NoInvoice.vue';
import MainHeader from '../components/MainHeader.vue';

interface State {
  invoices: Invoice[]
} 

const state: State = reactive({ invoices: []}),
hasNoInvoice = computed(() => {
  return state.invoices.length === 0;
}),
router = useRouter(),
viewInvoice = (id: string) => router.push({name: 'invoice', params: {id}})

onMounted(async () => {
  const data = await fetch('invoices.json');
  const invoices = await data.json(); 
  state.invoices = invoices
})



</script>

<template>
  <div class="">
    <MainHeader :invoice-count="state.invoices.length"/>
    <div class="flex flex-col gap-1.6">
      <InvoiceCard v-for="invoice in state.invoices" :key="invoice.id" :invoice="invoice" @select="viewInvoice(invoice.id)" /> 
    </div>
    <NoInvoice v-if="hasNoInvoice" />
  </div>
  
</template>
