<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import SideBar from './components/SideBar.vue';
  import InvoiceForm from './components/InvoiceForm.vue';
  import { store } from './store'
</script>

<template>
  <div :class="{'dark': store.darkMode}">
    <div class="bg-white-off dark:bg-black-off h-screen flex relative">
      <div v-show="store.formMode" class="absolute z-10 top-0 left-0 w-full h-full">
        <div @click="store.toggleFormMode()" class="bg-black w-full h-full opacity-50"></div>
      </div>
      <Transition>
          <InvoiceForm v-if="store.formMode" :edit-mode="store.editMode" @cancel="store.toggleFormMode()" />
      </Transition>
      <SideBar :dark-mode="store.darkMode" @toggle="store.toggleDarkMode()" />
      <main class="flex-1 py-[6.4rem] overflow-y-scroll">
        <div class="w-[73rem] mx-auto ">
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
</style>
