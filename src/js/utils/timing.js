// 공통 실행할 함수 func, 실행 지연 시간 delay
// 마지막 함수 실행 시간 추적 let timer;
// ...args -> func 클로저를 통해 호출할 때
// 인자로 받은 모든 인자들을 그대로 전달

// 디바운스
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    // 타이머 초기화, 이전 호출 실행 x
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

// 쓰로틀링
const throttle = (func, delay) => {
  let timer = 0;
  return (...args) => {
    // 함수 실행 간격을 계산하는 데 사용 - 현재 시간
    const now = Date.now();
    // 현재 시간, 마지막 함수 실행시간 차이가 delay이상인 경우에만 함수 실행
    if (now - timer >= delay) {
      // timer를 지금시간으로 업데이트
      timer = now;
      func(...args);
    }
  };
};

export { debounce, throttle };
