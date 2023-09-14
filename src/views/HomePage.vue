<script setup>
import { onMounted } from 'vue'
import useAPI from '@/composables/useAPI'
import BaseTitle from '@/components/BaseTitle.vue'
import useCounter from '@/composables/useAnswers'
import resetCounter from '@/composables/resetCounter'
import resetScore from '@/composables/resetScore'
import useScore from '@/composables/useScore'

const { categories, getCategories } = useAPI()

onMounted(async () => {
  await getCategories()
})

const { correct_counter } = useCounter()
const { changeC } = resetCounter(correct_counter)
const { changeS } = resetScore(useScore().score)

const resetCounterOnClick = () => {
  changeC();
}

resetCounterOnClick();

const resetScoreOnClick2 = () => {
  changeS();
}

resetScoreOnClick2();

const borderColors = [
  'border-red-500',
  'border-green-500',
  'border-blue-500',
  'border-yellow-500',
  'border-purple-500',
  'border-blue-300',
  'border-pink-500',
];
</script>

<template>
  <BaseTitle>
    <template #logo>
      <img src="/logo.svg" alt="logo" />
    </template>
    Trivia Game
  </BaseTitle>
  <div v-if="categories.length > 0" class="categories">
    <RouterLink
      v-for="(category, index) in categories"
      :key="category.id"
      :to="`/category/${category.id}/gamedifficulty`"
      :class="[ 'category', borderColors[index % borderColors.length] ]"
    >
      {{ category.name }}
    </RouterLink>
  </div>
</template>

<style lang="postcss" scoped>
.categories {
  @apply grid flex-grow grid-cols-4 gap-12;
}

.category {
  @apply w-36 h-36 border-4 rounded-full flex items-center justify-center text-center font-bold uppercase text-slate-600 transition-colors duration-300;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0);

  &:hover {
    @apply cursor-pointer;
    background-color: var(--category-hover-bg-color, white);
    color: var(--category-hover-text-color, black);
    transform: scale(1.1); 
    box-shadow: 0 0 10px #ddd;
  }
}
</style>
