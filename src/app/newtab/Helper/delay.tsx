const delay = (n: number, fn: () => void) => {
  // n time in ms
  setTimeout(function () {
    // delay
    fn();
    console.log('delayed ', n, ' ms');
  }, n);
};

export default delay;
