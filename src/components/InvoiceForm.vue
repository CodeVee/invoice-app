<template>
    <div class="bg-white dark:bg-black-off w-[71.9rem] h-full absolute z-10 top-0 left-0 rounded-r-4xl pt-5.6 pr-5.6 pb-3.2 pl-[15.6rem] overflow-y-auto bars">
        <h3 class="text-black dark:text-white font-bold text-ts mb-4.8">{{editMode? `Edit #${state.id}` : 'New Invoice'}}</h3>
        <form @submit.prevent="">        
            <div class="flex flex-col gap-2.4 mb-4.8">
                <h4 class="text-fl font-bold text-purple">Bill From</h4>
                <app-textbox label-text="Street Address" :has-error="v$.senderAddress.street.$error" v-model="v$.senderAddress.street.$model"/>
                <div class="grid grid-cols-3 gap-x-2.4">
                    <app-textbox label-text="City" :has-error="v$.senderAddress.city.$error" v-model="v$.senderAddress.city.$model"/>
                    <app-textbox label-text="Post Code" :has-error="v$.senderAddress.postCode.$error" v-model="v$.senderAddress.postCode.$model"/>
                    <app-textbox label-text="Country" :has-error="v$.senderAddress.country.$error" v-model="v$.senderAddress.country.$model"/>
                </div>
            </div>
            <div class="flex flex-col gap-2.4 mb-4.8">
                <h4 class="text-fl font-bold text-purple">Bill To</h4>
                <app-textbox label-text="Client's Name" :has-error="v$.clientName.$error" v-model="v$.clientName.$model"/>
                <app-textbox label-text="Client's Email" placeholder="e.g. email@example.com" :has-error="v$.clientEmail.$error" :error-message="v$.clientEmail.email.$invalid ? `invalid email` : ''" v-model="v$.clientEmail.$model"/>
                <app-textbox label-text="Street Address" id="street2" :has-error="v$.clientAddress.street.$error"  v-model="v$.clientAddress.street.$model"/>
                <div class="grid grid-cols-3 gap-x-2.4">
                    <app-textbox label-text="City" id="city2" :has-error="v$.clientAddress.city.$error"  v-model="v$.clientAddress.city.$model"/>
                    <app-textbox label-text="Post Code" id="post2" :has-error="v$.clientAddress.postCode.$error"  v-model="v$.clientAddress.postCode.$model"/>
                    <app-textbox label-text="Country" id="country2" :has-error="v$.clientAddress.country.$error" v-model="v$.clientAddress.country.$model"/>
                </div>
            </div>
            <div class="flex flex-col gap-2.4 mb-3.2">
                <div class="grid grid-cols-2 gap-x-2.4">
                    <app-textbox label-text="Invoice Date"/>
                    <app-select v-model="state.paymentTerms" :options="options" label-text="Payment Terms" />
                </div>
                <app-textbox label-text="Project Description" placeholder="e.g. Graphic Design Service" :has-error="v$.description.$error" v-model="v$.description.$model"/>
            </div>
            <div>
                <h5 class="font-bold text-[1.8rem] leading-[3.2rem] -tracking-[0.38px] text-blue-vdeep">Item List</h5>
                <div class="grid grid-cols-[21rem_6.8rem_9rem_auto] gap-x-1.6 my-1.6">
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">Item Name</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">Qty.</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">Price</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">Total</span>
                </div>
                <div class="flex flex-col gap-[1.8rem] mb-16">
                    <InvoiceItemForm 
                        v-for="(item, index) in v$.items.$model" 
                        :key="item.id" 
                        :item="item" 
                        :index="index" 
                        @delete="removeItem"
                    />
                    <button @click="addItem" class="bg-blue-vlight hover:bg-blue-light dark:bg-blue-dark rounded-4ls h-4.8 text-blue-gray dark:text-blue-light font-bold text-fl">+ Add New Item</button>
                </div>
                <div v-if="editMode" class="flex justify-end gap-0.8">
                    <AppButton text="Cancel" type="tetiary" @btn-click="cancelForm"/>
                    <AppButton text="Save Changes" type="primary"/>
                </div>
                <div v-else class="flex">
                    <AppButton text="Discard" type="tetiary" @btn-click="cancelForm"/>
                    <AppButton text="Save as Draft" class="ml-auto mr-0.8" type="dark" />
                    <AppButton text="Save & Send" type="primary" @btn-click="submitForm"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import AppTextbox from './AppTextbox.vue';
import AppButton from './AppButton.vue';
import AppSelect from './AppSelect.vue';
import InvoiceItemForm from './InvoiceItemForm.vue';
import { store } from '@/store';
import { reactive, onBeforeMount, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { getDefaultInvoice, type InvoiceItem, type Option } from '@/models';
import { computed } from '@vue/reactivity';
import { add } from 'date-fns';
import { formatFormDate } from '@/helpers';


interface Emits {
    (e: 'cancel'): void
}

const state = reactive({...getDefaultInvoice()}),
rules = {
    senderAddress: {
        street: { required },
        city: { required },
        postCode: { required },
        country: { required },
    },
    clientAddress: {
        street: { required },
        city: { required },
        postCode: { required },
        country: { required },
    },
    clientName: { required },
    clientEmail: { required, email },
    description: { required },
    items: { required }
},
v$ = useVuelidate(rules, state),
editMode = computed(() => !!state.id),
options: Option[] = [
    {id: 1, name: 'Net 1 Day'},
    {id: 7, name: 'Net 7 Day'},
    {id: 14, name: 'Net 14 Day'},
    {id: 30, name: 'Net 30 Day'},
],
emits = defineEmits<Emits>(),

addItem = () => {
    const item: InvoiceItem = {
        id: Date.now(),
        name: '',
        quantity: 0,
        price: 0,
        total: 0,
    }
    state.items.push(item);
},
removeItem = (index: number) => {
    state.items = state.items.filter((_, i) => index !== i);
},
setPaymentDueDate = () => {
    const createdDate = new Date(state.createdAt);
    const paymentDueDate = add(createdDate, { days: state.paymentTerms});
    state.paymentDue = formatFormDate(paymentDueDate);
},
submitForm =  async () => {
  const vt = await v$.value.$validate();
  console.log(vt)
  console.log(state)
},
cancelForm = () => emits('cancel')

onBeforeMount(() => {
    if (store.selectedInvoice) {
        const now = Date.now();
        const { selectedInvoice } = store;
        state.id = selectedInvoice.id
        state.clientName = selectedInvoice.clientName
        state.clientEmail = selectedInvoice.clientEmail
        state.clientAddress.street = selectedInvoice.clientAddress.street
        state.clientAddress.postCode = selectedInvoice.clientAddress.postCode
        state.clientAddress.city = selectedInvoice.clientAddress.city
        state.clientAddress.country = selectedInvoice.clientAddress.country
        state.senderAddress.street = selectedInvoice.senderAddress.street
        state.senderAddress.postCode = selectedInvoice.senderAddress.postCode
        state.senderAddress.city = selectedInvoice.senderAddress.city
        state.senderAddress.country = selectedInvoice.senderAddress.country
        state.description = selectedInvoice.description
        state.paymentTerms = selectedInvoice.paymentTerms
        state.paymentDue = selectedInvoice.paymentDue
        state.total = selectedInvoice.total
        state.status = selectedInvoice.status
        state.createdAt = selectedInvoice.createdAt
        state.items = selectedInvoice.items.map((item, i) => {
            item.id = now + i;
            return item;
        })
    }
})
watch(() => state.paymentTerms, () => setPaymentDueDate())

</script>

<style scoped>
.bars {
    scrollbar-width: none;
}
.bars::-webkit-scrollbar {
    display: none;
}
</style>