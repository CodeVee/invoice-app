<template>
    <div class="bg-white dark:bg-black-off w-[71.9rem] h-full absolute z-10 top-0 left-0 rounded-r-4xl pt-5.6 pr-5.6 pb-3.2 pl-[15.6rem] overflow-y-auto bars">
        <h3 class="text-black dark:text-white font-bold text-ts mb-4.8">{{editMode? 'Edit #XM9141' : 'New Invoice'}}</h3>
        <form @submit.prevent="">        
            <div class="flex flex-col gap-2.4 mb-4.8">
                <h4 class="text-fl font-bold text-purple">Bill From</h4>
                <text-box label-text="Street Address"/>
                <div class="grid grid-cols-3 gap-x-2.4">
                    <text-box label-text="City"/>
                    <text-box label-text="Post Code"/>
                    <text-box label-text="Country"/>
                </div>
            </div>
            <div class="flex flex-col gap-2.4 mb-4.8">
                <h4 class="text-fl font-bold text-purple">Bill To</h4>
                <text-box label-text="Client's Name"/>
                <text-box label-text="Client's Email"/>
                <text-box label-text="Street Address" id="street2"/>
                <div class="grid grid-cols-3 gap-x-2.4">
                    <text-box label-text="City" id="city2"/>
                    <text-box label-text="Post Code" id="post2"/>
                    <text-box label-text="Country" id="country2"/>
                </div>
            </div>
            <div class="flex flex-col gap-2.4 mb-3.2">
                <div class="grid grid-cols-2 gap-x-2.4">
                    <text-box label-text="Invoice Date"/>
                    <text-box label-text="Payment Terms"/>
                </div>
                <text-box label-text="Project Description"/>
            </div>
            <div>
                <h5 class="font-bold text-[1.8rem] leading-[3.2rem] -tracking-[0.38px] text-blue-vdeep">Item List</h5>
                <div class="grid grid-cols-[21.4rem_4.6rem_5.6rem_auto] gap-x-1.6 my-1.6">
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">Item Name</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">Qty.</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">Price</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">Total</span>
                </div>
                <div class="flex flex-col gap-[1.8rem] mb-16">
                    <div v-for="item in items" :key="item" class="grid grid-cols-[21.4rem_4.6rem_5.6rem_1fr_auto] gap-x-1.6 items-center">
                        <text-box />
                        <text-box />
                        <text-box />
                        <span class="text-blue-vgray dark:text-blue-light text-fl font-bold">{{formatAmount(item)}}</span>
                        <button>
                            <img src="@/assets/images/icon-delete.svg" alt="delete">
                        </button>
                    </div>
                    <button class="bg-blue-vlight dark:bg-blue-dark rounded-4ls h-4.8 text-blue-gray dark:text-blue-light font-bold text-fl">+ Add New Item</button>
                </div>
                <div class="flex justify-end gap-0.8">
                    <AppButton text="Cancel" type="tetiary" @btn-click="cancelForm"/>
                    <AppButton text="Save Changes" type="primary"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import TextBox from './TextBox.vue';
import AppButton from './AppButton.vue';
import { formatAmount } from '@/helpers';

interface Props {
    editMode: boolean
}
interface Emits {
    (e: 'cancel'): void
}
const items = [ 156, 400],

props = defineProps<Props>(),

emits = defineEmits<Emits>(),

cancelForm = () => emits('cancel')


</script>

<style scoped>
.bars {
    scrollbar-width: none;
}
</style>