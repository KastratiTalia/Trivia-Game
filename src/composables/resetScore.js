const resetScore = (score) => {
    const changeS = () => {
    score.value=0
  }
  return { changeS }
}

export default resetScore;