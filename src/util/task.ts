const getRandomNumberInRange = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start + 1) + start)
}

function generateEquation(
  start: number,
  end: number,
  type: string,
  number: number = 3
) {
  const operators = ['+', '-']
  let equation = ''
  let result = 0

  while (true) {
    equation = '' // 重置算式
    result = 0 // 重置结果
    let numCount =
      type === 'PM' || type === 'random' ? getRandomNumberInRange(3, number) : 2 // 3到number个数字
    let operator =
      type === 'plus' ? operators[0] : type === 'minus' ? operators[1] : ''

    for (let i = 0; i < numCount; i++) {
      let num
      if (i === 0) {
        num = getRandomNumberInRange(Math.floor(end / 2), end) // 第一个数字随机
      } else {
        if (type === 'PM' || type === 'random') {
          operator = operators[Math.floor(Math.random() * operators.length)]
        }
        if (operator === '+') {
          num = getRandomNumberInRange(start, end) // 加数随机
        } else {
          // 减数不能大于当前结果，避免结果为负数
          num = Math.floor(Math.random() * result) + 1
        }
        equation += ` ${operator} ${num}`
        result = operator === '+' ? result + num : result - num
      }

      if (i === 0) {
        equation += num
        result = num
      }
    }

    // 如果结果大于0，退出循环
    if (result > 0) {
      break
    }
  }

  return { equation, result }
}

const generateEquationWithCount = (
  start: number,
  end: number,
  type: string,
  count: number,
  number?: number
) => {
  return Array(count)
    .fill(null)
    .map(() => generateEquation(start, end, type, number))
}

export { getRandomNumberInRange, generateEquation, generateEquationWithCount }
