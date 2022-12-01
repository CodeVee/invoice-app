<template>
    <div class="flex flex-col gap-4">
        <label v-if="labelText" :for="id || labelText" class="text-fl font-medium text-blue-gray dark:text-blue-light">{{labelText}}</label>
        <input 
            :id="id || labelText"
            class="border border-blue-light caret-purple-light hover:cursor-pointer focus:ring-0 focus:border-purple-light dark:focus:border-purple-light dark:border-blue-dark bg-white dark:bg-blue-vdark rounded-lg text-black dark:text-white font-bold text-fl px-8 h-4.8 focus-visible:outline-none placeholder:text-black/40 dark:placeholder:text-white"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target ? ($event.target as HTMLInputElement).value : '')" 
            type="text"
            :placeholder="placeholder"
        >
    </div>
    
</template>

<script setup lang="ts">

interface Props {
    modelValue?: any;
    labelText?: string;
    id?: string;
    type?: 'text' | 'date';
    placeholder?: string
}
interface Emits {
    (e: 'update:modelValue'): any
}

defineProps<Props>()
defineEmits<Emits>()
</script>
