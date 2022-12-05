<template>
    <div class="grid grid-cols-[6.4rem_10rem_1fr_auto] md:grid-cols-[21rem_6.8rem_9rem_1fr_auto] gap-x-1.6 gap-y-2.4 items-center">
        <app-textbox :label-text="isMobile ? 'Item Name' : ''" class="col-span-4 md:col-auto" :has-error="v$.name.$error" v-model="v$.name.$model" />
        <app-textbox :label-text="isMobile ? 'Qty.' : ''" :has-error="v$.quantity.$error" v-model="v$.quantity.$model" />
        <app-textbox :label-text="isMobile ? 'Price' : ''" :has-error="v$.price.$error" v-model="v$.price.$model" />
        <span class="hidden md:inline-flex text-blue-vgray dark:text-blue-light text-fl font-bold">{{formatAmount(state.total)}}</span>
        <div class="flex flex-col md:hidden gap-4">
            <span class="text-fl font-medium text-blue-gray dark:text-blue-light">Total</span>  
            <span class="text-blue-vgray dark:text-blue-light h-4.8 flex items-center text-fl font-bold">{{formatAmount(state.total)}}</span>
        </div>
        <button class="pt-8 md:pt-0" @click="emit('delete', index)">
            <svg class="fill-blue-vgray lg:hover:fill-red" width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"  fill-rule="nonzero"/></svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import type { InvoiceItem } from '@/models';
import { formatAmount } from '@/helpers';
import AppTextbox from './AppTextbox.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, integer, decimal } from '@vuelidate/validators'
import { reactive, watch, computed } from 'vue';
import { store } from '@/store';
import { useScreen } from 'vue-screen'

interface Prop {
    item: InvoiceItem,
    index: number
}
interface Emit {
    (e: 'delete', index: number): void
}

const rules = {
    name: { required },
    quantity: { minValue: minValue(1), integer },
    price: { minValue: minValue(1), decimal }
},
screen = useScreen(),
props = defineProps<Prop>(),
emit = defineEmits<Emit>(),
state = reactive({...props.item}),
isMobile = computed(() => screen.width < store.mobileWidth),
v$ = useVuelidate(rules, state),
setTotal = () => {
    const total = state.price * state.quantity;
    state.total = +total.toFixed(2);
}

watch(() => state.price, (value) => {
    if (!isNaN(value)) {
        setTotal();
    }
})
watch(() => state.quantity, (value) => {
    if (!isNaN(value)) {
        setTotal();
    }
})
</script>
