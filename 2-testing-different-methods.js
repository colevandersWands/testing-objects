const tests = [
  {name: 'add 3', method: 'add', args: [3], expected: 3},
  {name: 'add 3', method: 'add', args: [3], expected: 6},
  {name: 'sutract 3', method: 'sub', args: [3], expected: 3},
  {name: 'subtract 3', method: 'sub', args: [3], expected: 0}
]



let obj = {
  val: 0,
  add: function (a) {
    this.val += a;
    return this.val
  },
  sub: function (a) {
    this.val -= a;
    return this.val
  },
}

test_methods(obj, tests)

function test_methods(_target, _cases) {
  let log = {};
  for (let i = 0; i < _cases.length; i++) {

    let result = method_assert(_target, _cases[i]);
    if (result !== true) {
      log[i+1] = result;
    }

  };
  if (Object.keys(log).length !== 0) {
    console.log(log)
  }
};

function method_assert(_object, _test) {
    let method = _test.method;
    let args = _test.args;
    let expected = _test.expected;

    let actual = _object[method](...args);

    let pass;
    if (typeof expected === 'object') {
      const _actual = JSON.stringify(actual);
      const _expected = JSON.stringify(expected);
      pass = _actual === _expected;
    } else {
      pass = actual === expected;
    };

    if (pass) {
      return true
    } else {
      return { method, actual, expected  }
    };
  };