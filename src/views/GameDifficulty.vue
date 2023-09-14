<script setup>
import { useRoute } from 'vue-router'
import BaseTitle from '@/components/BaseTitle.vue'

const route = useRoute()
const categoryId = route.params.id
</script>

<template>
  <BaseTitle>
    <template #logo>
      <img src="/logo.svg" alt="logo" />
    </template>
    Trivia Game
  </BaseTitle>

  <p class="p_difficulty">Please select a game difficulty</p>

  <div class="difficulties">
    <router-link :to="'/question/category/' + categoryId + '/easy'" class="difficulty easy">
      Easy
    </router-link>


    <router-link :to="'/question/category/' + categoryId + '/medium'" class="difficulty medium">
      Medium
    </router-link>

    <router-link :to="'/question/category/' + categoryId + '/hard'" class="difficulty hard">
      Hard
    </router-link>

    <router-link :to="'/question/category/' + categoryId" class="difficulty random">
      Random
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
.difficulties {
  @apply grid flex-grow grid-cols-4 gap-20;
}

.difficulty {
  @apply flex h-24 w-24 items-center justify-center rounded-lg border-4 py-4 text-center font-bold uppercase text-slate-600 transition-colors duration-300;

  &:hover {
    @apply cursor-pointer;
    transform: scale(1.1); 
    box-shadow: 0 0 10px #adadad;
  }
}

.easy {
  @apply border-yellow-500;

  &:hover {
    @apply border-yellow-500 bg-yellow-500 text-white;
  }
}

.medium {
  @apply border-blue-500;

  &:hover {
    @apply border-blue-500 bg-blue-500 text-white;
  }
}

.hard {
  @apply border-red-500;

  &:hover {
    @apply border-red-500 bg-red-500 text-white;
  }
}

.random {
  @apply border-purple-500;

  &:hover {
    @apply border-purple-500 bg-purple-500 text-white;
  }
}

.p_difficulty {
  @apply text-center text-2xl font-bold;
}
</style>
