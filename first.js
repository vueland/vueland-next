const arr = ['c', 'j', 'w', 'a', 'd', 'g', 'y', 'h']

const obj = arr.reduce((acc, it) => {

})


function sortArray(arr) {
  const map = {}

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      if (arr[i] >= arr[j]) continue
      map[arr[i]] = j
    }
  }

  console.log(map)
}

sortArray(arr)
