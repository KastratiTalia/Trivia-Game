<script setup>
import useScore from '@/composables/useScore'
import useCounter from '@/composables/useAnswers'
const { score } = useScore()
const { correct_counter } = useCounter()


</script>

<template>
  <p class="score">Final Score: {{ score }}</p>
  <p class="paragraph">Total nr of correct answers: {{ correct_counter  }}</p>
  <p class="paragraph2"> New Game?</p>
</template>

<style lang="postcss" scoped>
.score {
@apply text-center uppercase;
  font-size: 24px; /* Adjust the font size as needed */
  color: green; /* Use your desired color code here */
}

.paragraph {
  @apply text-center  uppercase;
  font-size: 24px; /* Adjust the font size as needed */
  color: blue; /* Use your desired color code here */
}

.paragraph2 {
@apply text-center font-bold uppercase;
  font-size: 36px; /* Adjust the font size as needed */
  color: red; /* Use your desired color code here */}
</style>
