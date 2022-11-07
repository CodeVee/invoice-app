<script setup lang="ts">
import InvoiceCard from '../components/InvoiceCard.vue';
</script>

<template>
  <div>
    <InvoiceCard /> 
  </div>
</template>
<script lang="ts">
export default {
  name: 'Home View',
  components: { InvoiceCard }
}
</script>