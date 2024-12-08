export function defaultDict(defaultValue) {
    return new Proxy({}, {
      get: (target, name) => {
        if (!(name in target)) {
          target[name] = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
        }
        return target[name];
      }
    });
  }