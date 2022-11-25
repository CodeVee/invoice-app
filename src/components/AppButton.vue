<template>
    <button :class="btnClass" class="py-1.6 px-2.4 text-fl font-bold rounded-4ls">{{text}}</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';


interface Props {
    text: string;
    type: 'primary' | 'secondary' | 'tetiary'
}
const props = defineProps<Props>(),
btnClass = computed(() => {
    switch (props.type) {
        case 'primary':
            return 'text-white bg-purple';
        case 'secondary':
            return 'text-white bg-red';
        default:
            return 'text-blue-gray dark:text-blue-light bg-blue-vlight dark:bg-blue-dark';
    }
})
</script>
