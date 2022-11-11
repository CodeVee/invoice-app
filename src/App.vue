<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterView } from 'vue-router'
  import SideBar from './components/SideBar.vue';

  const darkMode = ref(false),

  toggleMode = () => {
    darkMode.value = !darkMode.value
  }
</script>

<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-white-off dark:bg-black-off h-screen flex">
      <SideBar :dark-mode="darkMode" @toggle="toggleMode" />
      <main class="flex-1 py-[6.4rem] overflow-y-scroll">
        <div class="w-[73rem] mx-auto ">
          <RouterView />
        </div>   
      </main>   
    </div>
  </div>
</template>
