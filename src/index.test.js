import {createSignal, createEffect} from './index';

describe('reactivity', () => {
  test('effect should run on initialisation', () => {
    const [count] = createSignal(0);

    const countEffectSpy = jest.fn();
    createEffect(() => countEffectSpy(count()));

    expect(countEffectSpy).toHaveBeenCalledTimes(1);
    expect(countEffectSpy).toHaveBeenCalledWith(0);
  });

  test('effect should run when dependency changes', () => {
    const [count, setCount] = createSignal(0);

    const countEffectSpy = jest.fn();
    createEffect(() => countEffectSpy(count()));
    setCount(1);

    expect(countEffectSpy).toHaveBeenCalledTimes(2);
    expect(countEffectSpy).toHaveBeenCalledWith(1);
  })

  test('effect that depends on two signals should run on initialisation', () => {
    const [firstName] = createSignal('Bob');
    const [lastName] = createSignal('Smith');

    const nameSpy = jest.fn();
    createEffect(() => nameSpy(firstName(), lastName()));

    expect(nameSpy).toHaveBeenCalledTimes(1);
    expect(nameSpy).toHaveBeenCalledWith('Bob', 'Smith');
  });

  test('effect that depends on two signals should re-run when a signal is changed', () => {
    const [firstName, setFirstName] = createSignal('Bob');
    const [lastName] = createSignal('Smith');

    const nameSpy = jest.fn();
    createEffect(() => nameSpy(firstName(), lastName()));

    setFirstName('Alice');
    expect(nameSpy).toHaveBeenCalledTimes(2);
    expect(nameSpy).toHaveBeenCalledWith('Alice', 'Smith');
  });
});
