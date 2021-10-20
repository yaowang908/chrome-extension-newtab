const throttle = (func: (arg?:any)=>void, delay: number, ...args:any[]) => {
  let timer: null | NodeJS.Timeout = null;
  let startTime = Date.now();
  return function() {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);
    if (timer) clearTimeout(timer);
    if(remaining <= 0 ) {
      func(args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  }
}

export default throttle;