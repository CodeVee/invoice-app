<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '@/store';
import InvoiceCard from '@/components/InvoiceCard.vue';
import NoInvoice from '@/components/NoInvoice.vue';
import MainHeader from '@/components/MainHeader.vue';

const hasNoInvoice = computed(() => {
  return store.invoices.length === 0;
}),
router = useRouter(),
viewInvoice = (id: string) => router.push({name: 'invoice', params: {id}})

onMounted(() => {
  if (!store.invoices.length) {
    store.getInvoices();
  }
})
</script>

<template>
  <div class="">
    <MainHeader :invoice-count="store.invoices.length"/>
    <div class="flex flex-col gap-1.6">
      <InvoiceCard v-for="invoice in store.invoices" :key="invoice.id" :invoice="invoice" @select="viewInvoice(invoice.id)" /> 
    </div>
    <NoInvoice v-if="hasNoInvoice" />
  </div>
  
</template>
