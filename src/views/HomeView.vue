<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '@/store';
import InvoiceCard from '@/components/InvoiceCard.vue';
import NoInvoice from '@/components/NoInvoice.vue';
import MainHeader from '@/components/MainHeader.vue';

const hasNoInvoice = computed(() => {
  return store.filteredInvoices.length === 0;
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
  <div class="md:w-[67.2rem] mx-auto pt-3.2 md:pt-5.6 lg:pt-[7.2rem] lg:pb-[5.4rem] px-2.4 md:px-0 lg:w-full lg:mx-0">
    <MainHeader :invoice-count="store.filteredInvoices.length"/>
    <div class="flex flex-col gap-1.6">
      <InvoiceCard v-for="invoice in store.filteredInvoices" :key="invoice.id" :invoice="invoice" @select="viewInvoice(invoice.id)" /> 
    </div>
    <NoInvoice v-if="hasNoInvoice" />
  </div>
  
</template>
