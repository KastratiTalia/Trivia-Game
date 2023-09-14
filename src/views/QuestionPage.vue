 <script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainScore from '@/components/MainScore.vue'

import { shuffle } from 'lodash-es'
import NotificationAnswers from '@/components/NotificationAnswers.vue'
import useAPI from '@/composables/useAPI'
import useColor from '@/composables/useColor'
import useScore from '@/composables/useScore'
import BaseTitle from '@/components/BaseTitle.vue'
import DifficultyChip from '@/components/DifficultyChip.vue'
import useCounter from '@/composables/useAnswers'

const route = useRoute()
const router = useRouter()
const colors = useColor()
const api = useAPI()
const question = ref(null)
const answers = ref([])
const showNotification = ref(false)
const isCorrect = ref(false)
const { changeScore } = useScore()
const { changeCounter } = useCounter()

const maxQuestions = 5

let answeredQuestions = 0
let currentQuestion = 0
let currentQuestionData = null

let semicircleStyles = ref(['', '', ''])
let timerStyles = ref('')
let timerContent = ref('')
let backgroundColorChanged = false
let isRedBackground = false
let min = 2
let sec = 60
let minutes = min * 60000
let seconds = sec * 1000
let setTime = minutes + seconds
let starTime = Date.now()
let futureTime = starTime + setTime
let timerLoop
let completed = false

const handleAnswer = (points) => {
  isCorrect.value = points > 0

  showNotification.value = true
  setTimeout(() => {
    changeScore(points)

    answeredQuestions++

    if (isCorrect.value) {
      changeCounter()
    }

    if (answeredQuestions < maxQuestions) {
      showNotification.value = false

      
      setTimeout(() => {
        currentQuestion++ 
        loadNextQuestion()
      }, 100)
    } else {
      completed = true;

      if (futureTime - Date.now() <= 0) {
        
        router.push('/times-up')
      } else {
     
        router.push('/end-screen')
      }
    }
  }, 1000)
}


const loadNextQuestion = async () => {
  const difficulty = route.params.difficulty
  question.value = null 
  currentQuestionData = await api.getQuestionDifficulty(route.params.id, difficulty) 

  setTimeout(() => {
    question.value = currentQuestionData
    answers.value = []
    answers.value.push({
      id: answers.value.length,
      correct: true,
      answer: currentQuestionData.correct_answer,
      points: currentQuestionData.difficulty === 'easy' ? 10 : currentQuestionData.difficulty === 'medium' ? 20 : 30,
    })
    currentQuestionData.incorrect_answers.map((answer) => {
      answers.value.push({
        id: answers.value.length,
        correct: false,
        answer,
        points: 0,
      })
    })
    answers.value = shuffle(answers.value)
  }, 500)
}

onMounted(() => {
  timerLoop = setInterval(countDownTimer)
  countDownTimer()
   loadNextQuestion()
})

const countDownTimer = () => {
  let currentTime = Date.now()
  let remainingTime = futureTime - currentTime
  let angle = (remainingTime / setTime) * 360

  if (angle > 180) {
    semicircleStyles.value[2] = 'display: none;'
    semicircleStyles.value[0] = 'transform: rotate(180deg);'
    semicircleStyles.value[1] = `transform: rotate(${angle}deg);`
  } else {
    semicircleStyles.value[2] = 'display: block;'
    semicircleStyles.value[0] = `transform: rotate(${angle}deg); `
    semicircleStyles.value[1] = `transform: rotate(${angle}deg); `
  }

  let mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
  const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

  timerContent.value = `
    <div >${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
  `

  if (remainingTime <= 5000 && !backgroundColorChanged) {
    semicircleStyles.value[0] = 'background-color: red !important;'
    semicircleStyles.value[1] = 'background-color: red !important;'
    backgroundColorChanged = true 
  }

  if (remainingTime < 0) {
    clearInterval(timerLoop)
    semicircleStyles.value[0] = 'display: none;'
    semicircleStyles.value[1] = 'display: none;'
    semicircleStyles.value[2] = 'display: none;'

    timerContent.value = `
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
  `
    router.push('/times-up');

  }

  if (remainingTime <= 6000 && !isRedBackground) {
    isRedBackground = true
  }
}
</script>

<template>
  <div v-if="question" class="question-container">
    <BaseTitle> {{ question.category }}</BaseTitle>

    <div class="countdowntimer">
    <div class="main-container center">
    <div class="circle-container center">
      <div class="semicircle" :style="semicircleStyles[0]" :class="{ 'red-bg': isRedBackground }"></div>
      <div class="semicircle" :style="semicircleStyles[1]" :class="{ 'red-bg': isRedBackground }"></div>
      <div class="semicircle" :style="semicircleStyles[2]"></div>
      <div class="outermost-circle"></div>
    </div>

    <div class="timer-container center">
      <div class="timer center"  :style="timerStyles" v-html="timerContent"></div>
    </div>
    </div>
    </div>

    <p class="question-number">Question {{ currentQuestion + 1 }} / 5</p>
    <p class="question" v-html="question.question" />
    <div class="answers">
      <div
    v-for="answer in answers" :key="answer.id" :class="colors.getColor(answer.id)" class="answer"
        @click="handleAnswer(answer.points)" v-html="answer.answer" />
    </div>
    <DifficultyChip :difficulty="question.difficulty" />
    <MainScore/>
  </div>
  <div v-else class="loading">Loading...</div>
  <NotificationAnswers v-if="showNotification  && !completed" class="index" :correct="isCorrect" />
</template>

<style lang="postcss" scoped>

.question-container {
  @apply flex h-full w-full flex-col items-center gap-8;

  & .question {
    @apply text-center text-2xl font-bold;
  }

  & .answers {
    @apply grid w-full flex-grow grid-cols-2 gap-8;

    & .answer {
      @apply flex items-center justify-center rounded-lg text-center text-4xl text-white;

      &:hover {
        @apply cursor-pointer;
         transform: scale(1.05); 
      }
    }
  }
}

.loading {
  @apply flex h-full w-full items-center justify-center text-7xl;
}

.question-number{
    @apply   rounded-full px-4 py-2 font-bold capitalize text-slate-700 bg-yellow-600;
}


.center{
  display: flex;
  justify-content: center;
  align-items: center;

}

.main-container{
  width: 100%;
  height: 10vh;
  background-color: white;
  
}

.circle-container{
  width: 70px;
  height: 70px;
  background-color: #ddd;
  border-radius: 100%;
  position: fixed;
  overflow: hidden;
  z-index: 1;
  
}

.semicircle{
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin:right center;
}

.semicircle:nth-child(1){
  background-color: blue;
  z-index: 2;
}

.semicircle:nth-child(2){
  background-color: blue;
  z-index: 3;
}

.semicircle:nth-child(3){
  background-color: #ddd;
  z-index: 4;
}

.outermost-circle{
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  z-index: 5;
}

.timer-container{
  width: 330px;
  height: 200px;
  z-index: 6;
}

.timer{
  width: 100px;
  height:100px;
  z-index: 7;
}

.timer div{
  font-size:70px;
  font-weight: 100;
  width:80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 0 10ox;

}

.timer .colon{
  background-color: transparent;
  width: 10px;
  margin-left: 0;
  margin-right: 0;
  padding-bottom: 15px;
}

.red-bg {
  background-color: red !important;
}
.red-text{
  color: red;
}

.index{
  z-index: 8;
}

</style>
