<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-white-off dark:bg-black-off h-screen flex">
    <aside class="w-[10.3rem]"></aside>
    <main class="flex-1 py-[6.4rem]">
      <div class="w-[73rem] mx-auto">
        <RouterView />
      </div>   
    </main>
    
  </div>
  
</template>

<style scoped></style>
