const findSum = (a, b) => {
  let sum = 0;
  for (let i = a; i <= b; i++) {
    sum += i;
  }
  return sum;
};
console.log(findSum(1, 10));
