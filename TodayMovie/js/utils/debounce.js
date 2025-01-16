const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};
// 실행할 함수 func, 함수가 실행될 최소 시간 간격 delay
const throttle = (func, delay) => {
  // timer는 마지막 함수 실행 시간 추적하는 변수
  let timer = 0;
  // 반환된 함수를 실행
  // ...args -> func 호출할 때 인자로 받은 모든 인자들을 그대로 전달

  return (...args) => {
    // 함수 실행 간격을 계산하는 데 사용 - 현재 시간
    const now = Date.now();
    // 현재 시간, 마지막 함수 실행시간 차이가 delay이상인 경우에만 함수 실행
    if (now - timer >= delay) {
      // 함수가 실행된 뒤 timer를 현재 시간으로 설정
      timer = now;
      // 매개변수로 받은 func()과 ...args로 매개변수를 받음
      func(...args);
    }
  };
};

export { debounce, throttle };
