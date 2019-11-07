
function* range({ start = 0, end, step = 1 }) {
  for (let i = start; i < end;) {
    i += step;
    yield i;
  }
}

export { range };
