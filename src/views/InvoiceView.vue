<template>
    <div>
        <button class="flex">
            <img class="self-center" src="@/assets/images/icon-arrow-left.svg" alt="left arrow">
            <span class="text-black dark:text-white text-fl ml-16 font-bold">Go back</span>
        </button>
        <div class="bg-white dark:bg-blue-vdark h-[8.8rem] px-3.2 flex justify-between items-center shadow-lgs rounded-xls mt-3.2 mb-2.4">
            <div class="flex gap-1.6">
                <span class="self-center text-fl font-medium text-blue-mgray">Status</span>
                <InvoiceStatus status="pending" />
            </div>
            <div class="flex gap-0.8">
                <AppButton text="Edit" type="tetiary"/>
                <AppButton text="Delete" type="secondary"/>
                <AppButton text="Mark as Paid" type="primary"/>
            </div> 
        </div>
        <div class="bg-white dark:bg-blue-vdark shadow-lgs rounded-xls p-4.8">
            <div class="flex justify-between mb-[2.1rem]">
                <div class="flex flex-col">
                    <h4 class="font-bold text-sl">
                        <span class="text-blue-vgray">#</span>
                        <span class="text-black dark:text-white">XM9141</span>
                    </h4>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-medium">Graphic Design</span>
                </div>
                <p class="text-bs text-blue-gray dark:text-blue-light text-right">
                    19 Union Terrace <br> London <br> E1 3EZ <br> United Kingdom
                </p>
            </div>
            <div class="flex mb-[4.5rem]">
                <div class="flex flex-col gap-3.2">
                    <div>
                        <h5 class="text-fl font-medium text-blue-gray dark:text-blue-light mb-1.2">Invoice Date</h5>
                        <h5 class="text-black dark:text-white font-bold text-ms leading-ms">21 Aug 2021</h5>
                    </div>
                    <div>
                        <h5 class="text-fl font-medium text-blue-gray dark:text-blue-light mb-1.2">Payment Due</h5>
                        <h5 class="text-black dark:text-white font-bold text-ms leading-ms">20 Sep 2021</h5>
                    </div>       
                </div>
                <div class="flex flex-col gap-0.8 ml-40 mr-44">
                    <div>
                        <h5 class="text-fl font-medium text-blue-gray dark:text-blue-light mb-1.2">Bill To</h5>
                        <h5 class="text-black dark:text-white font-bold text-ms leading-ms">Alex Grim</h5>
                    </div> 
                    <p class="text-bs text-blue-gray dark:text-blue-light">
                        84 Church Way <br> Bradford <br> BD1 9PB <br> United Kingdom
                    </p>
                </div>
                <div class="flex">
                    <div>
                        <h5 class="text-fl font-medium text-blue-gray dark:text-blue-light mb-1.2">Sent To</h5>
                        <h5 class="text-black dark:text-white font-bold text-ms leading-ms">alexgrim@mail.com</h5>
                    </div> 
                </div>
            </div>
            <div class="bg-blue-vlight dark:bg-blue-dark px-3.2 pt-3.2 pb-16 rounded-t-xls">
                <div class="grid grid-cols-[28.4rem_3rem_1fr_1fr]">
                    <span class="text-blue-gray dark:text-blue-light text-bs font-medium">Item name</span>
                    <span class="text-blue-gray dark:text-blue-light text-bs font-medium text-center">QTY.</span>
                    <span class="text-blue-gray dark:text-blue-light text-bs font-medium text-right">Price</span>
                    <span class="text-blue-gray dark:text-blue-light text-bs font-medium text-right">Total</span>
                </div>
                <div class="grid grid-cols-[28.4rem_3rem_1fr_1fr] mt-3.2">
                    <span class="text-black dark:text-white text-fl font-bold">Banner Design</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-bold text-center">1</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-bold text-right">£ 156.00</span>
                    <span class="text-black dark:text-white text-fl font-bold text-right">£ 156.00</span>
                </div>
                <div class="grid grid-cols-[28.4rem_3rem_1fr_1fr] mt-3.2">
                    <span class="text-black dark:text-white text-fl font-bold">Email Design</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-bold text-center">2</span>
                    <span class="text-blue-gray dark:text-blue-light text-fl font-bold text-right">£ 200.00</span>
                    <span class="text-black dark:text-white text-fl font-bold text-right">£ 400.00</span>
                </div>
            </div>
            <div class="flex justify-between items-center bg-blue-deep dark:bg-black text-white px-3.2 h-32 rounded-b-xls">
                <span class="font-medium text-bs">Amount Due</span>
                <span class="font-bold text-[2.4rem] leading-[3.2rem]">£ 556.00</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import InvoiceStatus from '@/components/InvoiceStatus.vue';


</script>