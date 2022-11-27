<template>
    <div class="flex flex-col gap-4">
        <label v-if="labelText" :for="id || labelText" class="text-fl font-medium text-blue-gray dark:text-blue-light">{{labelText}}</label>
        <input 
            :id="id || labelText"
            class="border border-blue-light dark:border-blue-dark bg-white dark:bg-blue-vdark rounded-lg text-black dark:text-white font-bold text-fl px-8 h-4.8 focus-visible:outline-none"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target ? ($event.target as HTMLInputElement).value : '')" 
            type="text"
        >
    </div>
    
</template>

<script setup lang="ts">

interface Props {
    modelValue?: any;
    labelText?: string;
    id?: string;
    type?: 'text' | 'date';
}
interface Emits {
    (e: 'update:modelValue'): any
}

defineProps<Props>()
defineEmits<Emits>()
</script>
