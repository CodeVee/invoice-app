<template>
    <div class="flex justify-center items-center w-full h-full px-2.4 absolute top-0 z-20" @click="$emit('close')">
        <div class="md:w-[48rem] rounded-xls shadow-lgs p-3.2 md:p-4.8 bg-white dark:bg-blue-vdark relative" @click.stop="">
            <h4 class="text-black dark:text-white font-bold md:text-ts text-lg leading-ls">Confirm Deletion</h4>
            <p class=" text-sm leading-md tracking-lg font-medium text-blue-vgray dark:text-blue-light mt-1.2 mb-1.6">Are you sure you want to delete invoice #{{invoiceId}}? This action cannot be undone.</p>
            <div class="flex justify-end gap-0.8">
                <AppButton text="Cancel" type="tetiary" @btn-click="$emit('close')"/>
                <AppButton text="Delete" type="secondary"/>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import AppButton from './AppButton.vue';

interface Props {
    invoiceId: string
}
interface Emits {
    (e: 'close'): void
}
defineProps<Props>()
defineEmits<Emits>()

</script>