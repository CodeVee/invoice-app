<template>
  <button
    @click="press"
    :class="btnClass"
    class="py-1.6 px-2.4 text-fl font-bold rounded-4ls"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  text: string;
  type: "primary" | "secondary" | "tetiary" | "dark";
}
interface Emits {
  (e: "btnClick"): void;
}
const props = defineProps<Props>(),
  emits = defineEmits<Emits>(),
  btnClass = computed(() => {
    switch (props.type) {
      case "primary":
        return "text-white bg-purple hover:bg-purple-light";
      case "secondary":
        return "text-white bg-red hover:bg-red-light";
      case "dark":
        return "text-blue-vgray dark:text-blue-light bg-blue-deep";
      default:
        return `text-blue-gray dark:text-blue-light bg-blue-vlight dark:bg-blue-dark 
            hover:bg-blue-light dark:hover:bg-white dark:hover:text-blue-gray `;
    }
  }),
  press = () => emits("btnClick");
</script>
