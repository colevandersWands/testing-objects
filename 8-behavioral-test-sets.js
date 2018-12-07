/*
  now we've got _state_, isolated unit tests can no longer capture the behavior of our code
  objects enable sequences of interactions with a single set of data
  so our tests should also be _behavioral_ - sequences of actions
  
*/

const tests = [
  {it_should: 'return to zero with add', actions: [
    {method: 'clear', args: [], expected: undefined},
    {method: 'add', args: [3], expected: 3},
    {method: 'add', args: [3], expected: 6},
    {method: 'add', args: [-3], expected: 3},
    {method: 'add', args: [-3], expected: 0},
    {method: 'clear', args: [], expected: undefined} ] },
  {it_should: 'return to zero with sub', actions: [
    {method: 'clear', args: [], expected: undefined},
    {method: 'sub', args: [-3], expected: 3},
    {method: 'sub', args: [-3], expected: 6},
    {method: 'sub', args: [4], expected: 3},
    {method: 'sub', args: [3], expected: 0},
    {method: 'clear', args: [], expected: undefined} ] },
  {it_should: 'return to zero with add then sub', actions: [
    {method: 'clear', args: [], expected: undefined},
    {method: 'add', args: [3], expected: 3},
    {method: 'add', args: [3], expected: 6},
    {method: 'sub', args: [3], expected: 3},
    {method: 'sub', args: [3], expected: 0},
    {method: 'clear', args: [], expected: undefined} ] },
  {it_should: 'return to zero with sub then add', actions: [
    {method: 'clear', args: [], expected: undefined},
    {method: 'sub', args: [-3], expected: 3},
    {method: 'sub', args: [-3], expected: 6},
    {method: 'add', args: [-3], expected: 3},
    {method: 'add', args: [-3], expected: 0},
    {method: 'clear', args: [], expected: undefined} ] }
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
  clear: function() {
    this.val = 0;
  }
}
test_object(obj, tests)


// testing utilities
function test_object(_obj, _tests) {
  let log = [];
  for (let test of _tests) {
    let entry = { it_should: test.it_should };
    let result = run_actions(_obj, test.actions);
    if (result !== true) {
      entry.errors = result
    }
    log.push(entry)
  }
  console.log(log)


}

function run_actions(_obj, _cases) {
  let log = {};
  for (let i = 0; i < _cases.length; i++) {

    let result = method_assert(_obj, _cases[i]);
    if (result !== true) {
      log[i] = result;
    }

    };
    if (Object.keys(log).length === 0) {
      return true
    } else {
      return log
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

