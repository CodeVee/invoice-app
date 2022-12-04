<template>
    <div class="grid grid-cols-[21rem_6.8rem_9rem_1fr_auto] gap-x-1.6 items-center">
        <text-box :has-error="v$.name.$error" v-model="v$.name.$model" />
        <text-box :has-error="v$.quantity.$error" v-model="v$.quantity.$model" />
        <text-box :has-error="v$.price.$error" v-model="v$.price.$model" />
        <span class="text-blue-vgray dark:text-blue-light text-fl font-bold">{{formatAmount(state.total)}}</span>
        <button @click="emit('delete', index)">
            <img src="@/assets/images/icon-delete.svg" alt="delete">
        </button>
    </div>
</template>

<script setup lang="ts">
import type { InvoiceItem } from '@/models';
import { formatAmount } from '@/helpers';
import TextBox from './TextBox.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, integer, decimal } from '@vuelidate/validators'
import { reactive, watch } from 'vue';

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
props = defineProps<Prop>(),
emit = defineEmits<Emit>(),
state = reactive({...props.item}),
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
