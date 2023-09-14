import { ref } from 'vue'

const correct_counter = ref(0)

const useCounter = () => {
  const changeCounter = () => {
    correct_counter.value += 1
  }
  return { correct_counter, changeCounter }
}

export default useCounter;
