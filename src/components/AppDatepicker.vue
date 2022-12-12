<template>
  <div v-click-outside-element="closeDropdown" class="flex flex-col gap-4 relative">
        <label class="text-fl font-medium text-blue-gray dark:text-blue-light">{{labelText}}</label>
        <button 
            @click="toggleDropdown" 
            class="px-8 h-4.8 rounded-lg flex justify-between items-center bg-white dark:bg-blue-vdark border border-blue-light focus:border-purple-light dark:focus:border-purple-light dark:border-blue-dark  hover:cursor-pointer ">
            <span class="text-fl font-bold text-black dark:text-white">{{selectedDisplayDate}}</span>
            <img src="@/assets/images/icon-calendar.svg" alt="calendar">
        </button>
        <Transition name="dropdown">
            <div v-show="state.showDropdown" class="absolute top-32 px-1.6 pt-2.4 pb-3.2 w-full rounded-xls bg-white dark:bg-blue-dark shadow-ls flex flex-col gap-3.2">
                <div class="flex items-center justify-between w-[19.3rem] mx-auto">
                    <button @click="decreaseMonth" class="w-1.6 h-1.6 flex justify-center items-center">
                        <img src="@/assets/images/icon-arrow-left.svg" alt="arrow left">
                    </button>
                    <span class="text-black dark:text-blue-light text-fl font-bold">{{displayDate}}</span>
                    <button @click="increaseMonth" class="w-1.6 h-1.6 flex justify-center items-center">
                        <img src="@/assets/images/icon-arrow-right.svg" alt="arrow right">
                    </button>
                </div>
                <div class="grid grid-cols-7 gap-x-[1.5rem] gap-y-1.6">
                    <button @click="selectDate(day)" v-for="day in monthDays" class="text-black hover:text-purple-light dark:text-blue-light dark:hover:text-purple text-fl font-bold">{{day}}</button>
                    <button disabled v-for="day in monthOffDays" class="text-black/10 dark:text-blue-light/10 text-fl font-bold">{{day}}</button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, Transition } from "vue";
import { Months } from '@/models';
import { formatDate, formatFormDate } from "@/helpers";


interface State {
    showDropdown: boolean;
    year: number;
    month: number;
}
interface Props {
    modelValue: string;
    labelText: string;
}
interface Emits {
    (e: 'update:modelValue', val: string): void
}

const props = defineProps<Props>(),
emit = defineEmits<Emits>(),
state = reactive<State>({
    showDropdown: false,
    year: 2022,
    month: 8
}),
selectedDisplayDate = computed(() => formatDate(formatFormDate(new Date(props.modelValue)))),
displayDate = computed(() => {
    const monthStr = Months.find(m => m.key === state.month)?.name
    return `${monthStr} ${state.year}`
}),
monthDays = computed(() => Months.find(m => m.key === state.month)?.days),
monthOffDays = computed(() => {
    const days = Months.find(m => m.key === state.month)?.days || 31;
    return 7 - days % 7 
}),
increaseMonth = () => {
    state.month = (state.month + 1) % 12
    if (state.month === 0) {
        state.year = state.year + 1;
    }
},
decreaseMonth = () => {
    let month = state.month - 1;
    if (month === - 1) {
        month = 11
    }
    state.month = month
    if (state.month == 11) {
        state.year = state.year - 1;
    }
},
resetCalendar = () => {
    const date = new Date(props.modelValue)
    state.year = date.getFullYear()
    state.month = date.getMonth()
},
toggleDropdown = () => {
    state.showDropdown = !state.showDropdown
    if (state.showDropdown) {
        resetCalendar();
    }
},
closeDropdown = () => state.showDropdown = false,
selectDate = (day: number) => {
    const date = formatFormDate(new Date(state.year, state.month, day))
    emit('update:modelValue', date)
    closeDropdown()
}
onMounted(() => resetCalendar())
</script>
