<script setup lang="ts">
import type { Invoice } from '@/models/invoice';
import { onMounted, reactive } from 'vue';
import InvoiceCard from '../components/InvoiceCard.vue';

interface State {
  invoices: Invoice[]
} 

const state: State = reactive({ invoices: []});
onMounted(async () => {
  const data = await fetch('invoices.json');
  const invoices = await data.json(); 
  state.invoices = invoices
})


</script>

<template>
  <div class="flex flex-col gap-1.6">
    <InvoiceCard v-for="invoice in state.invoices" :key="invoice.id" :invoice="invoice" /> 
  </div>
</template>
