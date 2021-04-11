const arr = ['000', '010']

function bitwise([a, b]) {
  return a.split('').reduce((acc, s, i) => {
    return acc += +s || +b[i]
  }, '')
}

console.log(bitwise(arr))

function subarray(arr) {
  let result = 0
  let max = 0

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = i; j < arr.length; j += 1) {
      result += arr[i]

      if (result > max) max = result
    }

    result = 0
  }

  return max
}

console.log(subarray([1, -2, -3, 1, 3]))
