<template>
    <div class="bg-white flex items-center h-[7.2rem] shadow-lgs pl-[3.2rem] pr-[2.4rem] rounded-xls">
        <h3 class="text-fl font-bold mr-[4.3rem]">
            <span class="text-blue-gray">#</span>
            <span class=" text-black">RT3080</span>
        </h3>
        <h3 class="mr-[4.5rem] text-fl font-medium">
            <span class="text-blue-gray">Due  </span>
            <span class=" text-blue-vgray">19 Aug 2021</span>
        </h3>
        <h3 class="text-blue-mgray mr-[7.3rem] text-fl font-medium">Jensen Huang</h3>
        <h3 class="text-black mr-16  text-sl font-bold">£ 1,800.90</h3>
        <div class="relative mr-auto h-16 w-[10.4rem] flex items-center justify-center gap-0.8">
            <div class="bg-green absolute w-full h-full opacity-5 rounded-lgs"></div>
            <span class="h-0.8 w-0.8 bg-green rounded-full"></span>
            <span class="capitalize text-green text-fl font-bold">paid</span>
        </div>
        <button>
            <img src="@/assets/images/icon-arrow-right.svg" alt="right-arrow">
        </button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Invoice Card'
}
</script>

<style scoped>

</style>