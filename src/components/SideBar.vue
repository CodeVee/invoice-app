<script setup lang="ts">

    interface Props {
        darkMode: boolean
    }

    interface Emits {
        (e: 'toggle'): void
    }

    const props = defineProps<Props>(),
    emit = defineEmits<Emits>(),
    toggleMode = () => {
        emit('toggle');
    }
</script>

<template>
    <aside class="bg-blue-deep dark:bg-blue-vdark relative z-20 h-7.2 md:h-32 lg:h-full w-full lg:w-10.3 lg:rounded-r-4xl flex flex-row lg:flex-col justify-between">
        <div class="relative overflow-y-clip w-32 lg:w-full h-full lg:h-10.3 bg-purple rounded-r-4xl flex items-center justify-center">
            <img class="relative z-10" src="@/assets/images/logo.svg" alt="logo">
            <div class="absolute left-0 top-[50%] h-full w-full bg-purple-light rounded-l-4xl flex items-center justify-center"></div>
        </div>
        
        <div class="flex flex-row lg:flex-col">
            <button @click="toggleMode" class="self-center mr-3.2 lg:mr-0 lg:mb-3.2">
                <img v-show="darkMode" src="@/assets/images/icon-sun.svg" alt="sun">
                <img v-show="!darkMode" src="@/assets/images/icon-moon.svg" alt="moon">
            </button>
            <div class="h-full lg:h-[8.8rem] w-[9.6rem] lg:w-full flex items-center justify-center border-l lg:border-t border-blue-mdeep">
                <img src="@/assets/images/image-avatar.jpg" class="w-3.2 lg:w-16 h-3.2 lg:h-16 rounded-full" alt="avatar">
            </div>
        </div>
    </aside>
</template>
