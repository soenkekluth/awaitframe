import nextFrame from './nextframe';

/**
 * until fn returns a truthy value do not resolve.
 * @param  {Function}  fn   a function that will be called every frame to check for changes
 * @param  {...[type]} args - optional values that would be the params of the Promises resolve
 * @return {Promise} which will resolve after the waiting frames
 */
export default function until(fn, ...args) {
  return nextFrame()
    .then(() => {
      const result = fn(...args);
      if (result) {
        return until(fn, ...args);
      }
      return (args && (args.length > 1)) ? args : result;
    });
}
