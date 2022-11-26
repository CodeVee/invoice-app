<script setup lang="ts">

    interface Props {
        darkMode: boolean
    }

    interface Emits {
        (e: 'toggle'): void
    }

    const name = 'SideBar',
    props = defineProps<Props>(),
    emit = defineEmits<Emits>(),
    toggleMode = () => {
        emit('toggle');
    }
</script>

<template>
    <aside class="bg-blue-deep dark:bg-blue-vdark h-full w-10.3 rounded-r-4xl flex flex-col justify-between">
        <div class="relative overflow-y-clip h-10.3 bg-purple rounded-r-4xl flex items-center justify-center">
            <img class="relative z-10" src="@/assets/images/logo.svg" alt="logo">
            <div class="absolute left-0 top-[50%] h-full w-full bg-purple-light rounded-l-4xl flex items-center justify-center"></div>
        </div>
        
        <div class="flex flex-col">
            <button @click="toggleMode" class="self-center mb-3.2">
                <img v-show="darkMode" src="@/assets/images/icon-sun.svg" alt="sun">
                <img v-show="!darkMode" src="@/assets/images/icon-moon.svg" alt="moon">
            </button>
            <div class="h-[8.8rem] flex items-center justify-center border-t border-t-blue-mdeep">
                <img src="@/assets/images/image-avatar.jpg" class="w-16 h-16 rounded-full" alt="avatar">
            </div>
        </div>
    </aside>
</template>
