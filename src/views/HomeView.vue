<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useInvoiceStore, useAppStore } from '@/store'
import InvoiceCard from '@/components/InvoiceCard.vue';
import NoInvoice from '@/components/NoInvoice.vue';
import MainHeader from '@/components/MainHeader.vue';
import InvoiceMobileForm from '@/components/InvoiceMobileForm.vue';
import { useScreen } from 'vue-screen'
import { storeToRefs } from 'pinia'


const screen = useScreen(),
istore = useInvoiceStore(),
astore = useAppStore(),
{ invoices, filteredInvoices } = storeToRefs(istore),
{ mobileWidth } = storeToRefs(astore),
{ getInvoices } = istore,
showForm = ref(false),
hasNoInvoice = computed(() => {
  return filteredInvoices.value.length === 0;
}),
isMobile = computed(() => screen.width < mobileWidth.value),
router = useRouter(),
viewInvoice = (id: string) => router.push({name: 'invoice', params: {id}}),
openMobileForm = () => showForm.value = true,
closeMobileForm = () => showForm.value = false

watch(isMobile, (val) => {
  if (!val) {
    closeMobileForm()
  }
})

onMounted(() => {
  if (!invoices.value.length) {
    getInvoices();
  }
})
</script>

<template>
  <invoice-mobile-form v-if="showForm" @cancel="closeMobileForm"/>
  <div v-else class="md:w-[67.2rem] mx-auto pt-3.2 md:pt-5.6 pb-5.6 md:pb-0 lg:pt-[7.2rem] lg:pb-[5.4rem] px-2.4 md:px-0 lg:w-full lg:mx-0">
    <MainHeader :invoice-count="filteredInvoices.length" @open="openMobileForm"/>
    <div class="flex flex-col gap-1.6">
      <InvoiceCard v-for="invoice in filteredInvoices" :key="invoice.id" :invoice="invoice" @select="viewInvoice(invoice.id)" /> 
    </div>
    <NoInvoice v-if="hasNoInvoice" />
  </div>
</template>
