const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const throttle = (func, delay) => {
  let timer = 0;
  return (...args) => {
    const now = Date.now();
    if (now - timer >= delay) {
      timer = now;
      func(...args);
    }
  };
};

export { debounce, throttle };
