import { Pipe, PipeTransform } from '@angular/core';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any --
  this matches the type bound on Parameters and ReturnType */
type AnyFunction = (...args: any[]) => any;

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFnPipe implements PipeTransform {
  transform<F extends AnyFunction>(
    fn: F,
    ...args: Parameters<F>
  ): ReturnType<F> {
    return fn(...args);
  }
}

// alternate version which takes the first argument and then the function:
// {{ x | call: fn : y : z }}
// fn effectively acts as an ad-hoc custom pipe.
@Pipe({
  name: 'call',
  standalone: true,
})
export class CallPipe implements PipeTransform {
  /* eslint-disable @typescript-eslint/no-explicit-any -- used only as type bound */
  transform<T, F extends (t: T, ...rest: any) => any>(
    value: T,
    fn: F,
    ...rest: Parameters<F> extends [any, ...infer R] ? R : never
    /* eslint-enable @typescript-eslint/no-explicit-any */
  ): ReturnType<F> {
    return fn(value, ...rest);
  }
}
