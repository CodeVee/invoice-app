<template>
    <div class="flex flex-col gap-4 relative">
        <label class="text-fl font-medium text-blue-gray dark:text-blue-light">{{labelText}}</label>
        <button 
            @click="toggleDropdown" 
            class="px-8 h-4.8 rounded-lg flex justify-between items-center bg-white dark:bg-blue-vdark border border-blue-light focus:border-purple-light dark:focus:border-purple-light dark:border-blue-dark  hover:cursor-pointer ">
            <span class="text-fl font-bold text-black dark:text-white">{{selectedOptionName}}</span>
            <img :class="{'rotate-180': state.showDropdown}" src="@/assets/images/icon-arrow-down.svg" alt="down arrow">
        </button>
        <Transition name="select">
            <div v-show="state.showDropdown" class="absolute top-32 w-full rounded-xls bg-white dark:bg-blue-dark shadow-ls flex flex-col">
                <button @click="selectOption(option.id)" v-for="option in options" :key="option.id" class="h-[4.5rem] px-2.4 text-fl font-bold text-left text-black dark:text-white hover:text-purple dark:hover:text-purple-light border-b border-blue-light dark:border-blue-vdark">
                    {{option.name}}
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { Option } from '@/models';
import { computed, reactive } from 'vue';

interface State {
    showDropdown: boolean;
}
interface Props {
    modelValue: number;
    labelText: string;
    options: Option[]
}
interface Emits {
    (e: 'update:modelValue', val: number): void
}

const props = defineProps<Props>(),
emit = defineEmits<Emits>(),
state = reactive<State>({
    showDropdown: false
}),
selectedOptionName = computed(() => props.options.find(o => o.id === props.modelValue)?.name || ''),
toggleDropdown = () => state.showDropdown = !state.showDropdown,
closeDropdown = () => state.showDropdown = false,
selectOption = (id: number) => {
    emit('update:modelValue', id);
    closeDropdown()
}
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: 0.2s ease all;
}
.select-enter-from,
.select-leave-to {
  transform: translateY(-2rem);
  opacity: 0;
}
</style>