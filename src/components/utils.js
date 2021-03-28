export function continueSequence(arr) {
  arr.push(Math.floor(Math.random() * 4));
  return arr;
}

export function compareSequences(sequence, steps) {
  const lastIndex = steps.length - 1;
  if (steps[lastIndex] === sequence[lastIndex]) {
    if (steps.length === sequence.length) return "next";
    else return "waiting";
  } else if (steps[lastIndex] !== sequence[lastIndex]) {
    return "lose";
  }
}
