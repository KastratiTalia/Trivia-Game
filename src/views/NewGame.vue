<script setup>
import FinalScore from '@/components/FinalScore.vue';
import BaseTitle from '@/components/BaseTitle.vue'

</script>

<template>

    <BaseTitle>
    <template #logo>
      <img src="/logo.svg" alt="logo" />
    </template>
    Trivia Game
  </BaseTitle>

    <FinalScore/>

    <div class="buttons">
     <router-link :to="'/'" class="button">
       Back to categories
     </router-link>
    </div>
</template>

<style lang="postcss" scoped>
.buttons {
  @apply justify-center flex-grow;

  & .button {
    @apply flex h-20 w-32 items-center justify-center rounded-lg border-4 border-green-500 py-4 text-center font-bold uppercase text-slate-600 transition-colors duration-300;

    &:hover {
      @apply cursor-pointer border-red-500 bg-red-500 text-white;
       transform: scale(1.1); 
       box-shadow: 0 0 10px #adadad;
    }
  }
}
</style>