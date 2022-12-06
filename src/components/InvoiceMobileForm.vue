<template>
    <div class="bg-white dark:bg-black-off pt-3.2 px-2.4">
        <button class="flex" @click="cancelForm">
            <img class="self-center" src="@/assets/images/icon-arrow-left.svg" alt="left arrow">
            <span class="text-black dark:text-white hover:text-blue-gray dark:hover:text-blue-vgray text-fl ml-2.4 md:ml-16 font-bold">Go back</span>
        </button>
        <h3 v-if="editMode" class="font-bold text-ts my-2.4">
            <span class="text-black dark:text-white">Edit </span>
            <span class="text-blue-vgray">#</span>
            <span class="text-black dark:text-white">{{state.id}}</span>
        </h3>
        <h3 v-else class="text-black dark:text-white font-bold text-ts my-2.4">New Invoice</h3>
        <form @submit.prevent="">        
            <div class="flex flex-col gap-2.4 mb-16">
                <h4 class="text-fl font-bold text-purple">Bill From</h4>
                <app-textbox label-text="Street Address" :has-error="v$.senderAddress.street.$error" v-model="v$.senderAddress.street.$model"/>
                <div class="grid grid-cols-2 gap-x-2.4">
                    <app-textbox label-text="City" :has-error="v$.senderAddress.city.$error" v-model="v$.senderAddress.city.$model"/>
                    <app-textbox label-text="Post Code" :has-error="v$.senderAddress.postCode.$error" v-model="v$.senderAddress.postCode.$model"/>
                </div>
                <app-textbox label-text="Country" :has-error="v$.senderAddress.country.$error" v-model="v$.senderAddress.country.$model"/>
            </div>
            <div class="flex flex-col gap-2.4 mb-16">
                <h4 class="text-fl font-bold text-purple">Bill To</h4>
                <app-textbox label-text="Client's Name" :has-error="v$.clientName.$error" v-model="v$.clientName.$model"/>
                <app-textbox label-text="Client's Email" placeholder="e.g. email@example.com" :has-error="v$.clientEmail.$error" :error-message="v$.clientEmail.email.$invalid ? `invalid email` : ''" v-model="v$.clientEmail.$model"/>
                <app-textbox label-text="Street Address" id="street2" :has-error="v$.clientAddress.street.$error"  v-model="v$.clientAddress.street.$model"/>
                <div class="grid grid-cols-2 gap-x-2.4">
                    <app-textbox label-text="City" id="city2" :has-error="v$.clientAddress.city.$error"  v-model="v$.clientAddress.city.$model"/>
                    <app-textbox label-text="Post Code" id="post2" :has-error="v$.clientAddress.postCode.$error"  v-model="v$.clientAddress.postCode.$model"/>
                </div>
                <app-textbox label-text="Country" id="country2" :has-error="v$.clientAddress.country.$error" v-model="v$.clientAddress.country.$model"/>
            </div>
            <div class="flex flex-col gap-2.4 mb-5.6">
                <app-datepicker v-model="state.createdAt" label-text="Invoice Date" />
                <app-select v-model="state.paymentTerms" :options="options" label-text="Payment Terms" />
                <app-textbox label-text="Project Description" placeholder="e.g. Graphic Design Service" :has-error="v$.description.$error" v-model="v$.description.$model"/>
            </div>
            <div>
                <h5 class="mb-2.4 font-bold text-[1.8rem] leading-ls -tracking-[0.38px] text-blue-vdeep">Item List</h5>
                <div class="flex flex-col gap-4.8 mb-2.4">
                    <InvoiceItemForm 
                        v-for="(item, index) in v$.items.$model" 
                        :key="item.id" 
                        :item="item" 
                        :index="index" 
                        @delete="removeItem"
                    />
                    <button @click="addItem" class="bg-blue-vlight hover:bg-blue-light dark:bg-blue-dark rounded-4ls h-4.8 text-blue-gray dark:text-blue-light font-bold text-fl">+ Add New Item</button>
                </div>
                <div class="h-[6.4rem] lin-gra -mx-2.4"></div>
                <div class="-mx-2.4 px-2.4 h-36 bg-white dark:bg-blue-vdark">
                    <div v-if="editMode" class="flex h-full items-center justify-end gap-0.8">
                        <AppButton text="Cancel" type="tetiary" @btn-click="cancelForm"/>
                        <AppButton text="Save Changes" type="primary"/>
                    </div>
                    <div v-else class="flex h-full items-center shadow-lgs">
                        <AppButton text="Discard" type="tetiary" @btn-click="cancelForm"/>
                        <AppButton text="Save as Draft" class="ml-auto mr-0.8" type="dark" />
                        <AppButton text="Save & Send" type="primary" @btn-click="submitForm"/>
                    </div>
                </div>                
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import AppTextbox from './AppTextbox.vue';
import AppButton from './AppButton.vue';
import AppSelect from './AppSelect.vue';
import AppDatepicker from './AppDatepicker.vue';
import InvoiceItemForm from './InvoiceItemForm.vue';
import { useAppStore } from '@/store';
import { storeToRefs } from 'pinia'
import { reactive, onBeforeMount, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { getDefaultInvoice, type Invoice, type InvoiceItem } from '@/models';
import { computed } from '@vue/reactivity';
import { add } from 'date-fns';
import { formatFormDate } from '@/helpers';


interface Emits {
    (e: 'cancel'): void
}
interface Props {
    invoice?: Invoice
}

const state = reactive({...getDefaultInvoice()}),
astore = useAppStore(),
{ options } = storeToRefs(astore),
props = defineProps<Props>(),
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
    if (props.invoice) {
        const now = Date.now();
        const { invoice } = props;
        state.id = invoice.id
        state.clientName = invoice.clientName
        state.clientEmail = invoice.clientEmail
        state.clientAddress.street = invoice.clientAddress.street
        state.clientAddress.postCode = invoice.clientAddress.postCode
        state.clientAddress.city = invoice.clientAddress.city
        state.clientAddress.country = invoice.clientAddress.country
        state.senderAddress.street = invoice.senderAddress.street
        state.senderAddress.postCode = invoice.senderAddress.postCode
        state.senderAddress.city = invoice.senderAddress.city
        state.senderAddress.country = invoice.senderAddress.country
        state.description = invoice.description
        state.paymentTerms = invoice.paymentTerms
        state.paymentDue = invoice.paymentDue
        state.total = invoice.total
        state.status = invoice.status
        state.createdAt = invoice.createdAt
        state.items = invoice.items.map((item, i) => {
            item.id = now + i;
            return item;
        })
    }
})
watch(() => state.paymentTerms, () => setPaymentDueDate())

</script>

<style scoped>
.lin-gra {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.1) 100%);
}
</style>