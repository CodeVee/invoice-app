<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import SideBar from './components/SideBar.vue';
  import InvoiceForm from './components/InvoiceForm.vue';
  import DeleteModal from '@/components/DeleteModal.vue';
  import { useInvoiceStore, useAppStore } from './store'
  import { storeToRefs } from 'pinia'

  const istore = useInvoiceStore(),
  astore = useAppStore(),
  { selectedInvoice } = storeToRefs(istore),
  { darkMode, showOverlay, modalMode, formMode } = storeToRefs(astore),
  { closeBackDrop, toggleDarkMode, toggleFormMode } = astore;
</script>

<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-white-off dark:bg-black-off min-h-screen md:min-h-0 md:pb-0 md:h-screen flex flex-col lg:flex-row relative overlay">
      <div v-show="showOverlay" class="absolute z-10 top-0 left-0 w-full h-full">
        <div @click="closeBackDrop()" class="bg-black w-full h-full opacity-50"></div>
      </div>
      <Transition name="fade">
          <DeleteModal 
            v-if="modalMode" 
            :invoice-id="selectedInvoice?.id || ''"
            @close="closeBackDrop()"/>
      </Transition>
      <Transition>
          <InvoiceForm v-if="formMode" @cancel="toggleFormMode()" />
      </Transition>
      <SideBar :dark-mode="darkMode" @toggle="toggleDarkMode()" />
      <main class="lg:flex-1 lg:overflow-y-scroll">
        <div class="w-full lg:w-[73rem] lg:mx-auto ">
          <RouterView />
        </div>   
      </main>   
    </div>
  </div>
</template>

<style >
.v-enter-active,
.v-leave-active {
  transition: 0.8s ease all;
}
.v-enter-from,
.v-leave-to {
  transform: translateX(-61.6rem);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: 0.2s ease all;
}
.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-2rem);
  opacity: 0;
}
</style>
