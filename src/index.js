const runningEffects = [];

const createSignal = value => {
  let observers = new Set();

  const get = () => {
    const currentlyRunningObserver = runningEffects[runningEffects.length - 1];
    if (currentlyRunningObserver) {
      observers.add(currentlyRunningObserver);
    }
    return value;
  }
  const set = (newValue) => {
    value = newValue;
    const observersToProcess = observers;
    observers = new Set();
    observersToProcess.forEach(fn => fn());
  }
  return [get, set];
}

const createEffect = (fn) => {
  function self() {
    runningEffects.push(self)
    fn();
    runningEffects.pop();
  }
  self();
};

export {
  createSignal,
  createEffect
}
