<template>
    <div class="flex flex-col gap-4">
        <div  v-if="labelText" class="flex justify-between">
            <label :for="id || labelText" :class="{'text-red': hasError}" class="text-fl font-medium text-blue-gray dark:text-blue-light">{{labelText}}</label>
            <span v-if="hasError" class="text-red text-xs leading-xs tracking-ls font-semibold">{{ errorMessage || `can't be empty`}}</span>
        </div>
        
        <input 
            :id="id || labelText"
            :class="{'border-red focus:border-red': hasError , 'border-blue-light focus:border-purple-light dark:focus:border-purple-light dark:border-blue-dark': !hasError}"
            class="border caret-purple-light hover:cursor-pointer focus:ring-0 bg-white dark:bg-blue-vdark rounded-lg text-black dark:text-white font-bold text-fl px-8 h-4.8 focus-visible:outline-none placeholder:text-black/40 dark:placeholder:text-white"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target ? ($event.target as HTMLInputElement).value : '')" 
            type="text"
            :placeholder="placeholder"
        >
    </div>
    
</template>

<script setup lang="ts">

interface Props {
    modelValue?: string | number;
    labelText?: string;
    id?: string;
    placeholder?: string
    hasError?: boolean;
    errorMessage?: string; 
}
interface Emits {
    (e: 'update:modelValue', val: string | number): any
}

defineProps<Props>()
defineEmits<Emits>()
</script>
