const resetCounter = (counter) => {
    const changeC = () => {
    counter.value=0
  }
  return { counter, changeC }
}

export default resetCounter;