<template>
    <div class="relative h-16 w-[10.4rem] flex items-center justify-center gap-0.8">
        <div :class="statusColors.bgColor" class="absolute w-full h-full opacity-5 rounded-lgs"></div>
        <span :class="statusColors.bgColor" class="h-0.8 w-0.8 rounded-full"></span>
        <span :class="statusColors.textColor" class="capitalize text-fl font-bold">{{status}}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    status: 'paid' | 'pending' | 'draft'
}
const props = defineProps<Props>(),
statusColors = computed(() => {
    switch (props.status) {
        case 'paid':
            return { bgColor: 'bg-green', textColor: 'text-green'}
        case 'pending':
            return { bgColor: 'bg-yellow', textColor: 'text-yellow'}
        default:
            return { bgColor: 'bg-blue-deep dark:bg-blue-light', textColor: 'text-blue-deep dark:text-blue-light'};
    }
})
</script>
