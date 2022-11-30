<template>
    <div class="w-[19.2rem] flex justify-center relative">
        <button @click="toggleDropdown" class="flex">
            <span class="mr-1.6 text-black dark:text-white font-bold text-fl">Filter by status</span>
            <img :class="{'rotate-180': state.showDropdown}" class="self-center" src="@/assets/images/icon-arrow-down.svg" alt="down arrow">
        </button>
        <Transition name="dropdown">
            <div v-show="state.showDropdown" class="absolute top-16 w-full p-2.4 rounded-xls bg-white shadow-lgs flex flex-col gap-1.6">
            <label v-for="status in state.statuses" class="inline-flex cursor-pointer" :for="status">
                <input  
                    :id="status" 
                    :value="status"
                    v-model="state.checkedStatus"
                    type="checkbox"
                    class="rounded cursor-pointer  checked:text-purple focus:ring-offset-0 focus:ring-transparent border border-purple bg-blue-light h-1.6 w-1.6 " />
                <span class="text-fl text-blue-vdark ml-1.2 self-center font-bold">{{ capitalizeFirstLetter(status) }}</span>
            </label>
        </div>
        </Transition>
        
    </div>
</template>

<script setup lang="ts">
import type { status } from '@/models/invoice';
import { reactive, watch } from 'vue';

interface State {
    statuses: status[];
    checkedStatus: status[];
    showDropdown: boolean;
}
interface Emit {
    (e: 'statusChange', status: status[]): void
}
interface Prop {
    status: status[]
}


const prop = withDefaults(defineProps<Prop>(), { status: () => []}),
emit = defineEmits<Emit>(),
state = reactive<State>({
    statuses: ['draft', 'pending', 'paid'],
    checkedStatus: [...prop.status],
    showDropdown: false
}),


toggleDropdown = () => state.showDropdown = !state.showDropdown,

capitalizeFirstLetter = (str: string) => {
    return str ? str[0].toUpperCase() + str.slice(1) : '';
};

watch(() => state.checkedStatus, (newStatus) => {
    emit('statusChange', newStatus)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: 0.5s ease all;
}
.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-2rem);
  opacity: 0;
}
</style>