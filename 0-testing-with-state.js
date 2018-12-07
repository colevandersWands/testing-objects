/* exercises
  given an object with one state value and one method
  test it
    (provide a bunch of these simple objects to test)

  see how writing test cases is different when your code is no longer pure functions
*/
const tests = [
  {name: 'add 3', args: [3], expected: 3},
  {name: 'add 3', args: [3], expected: 6},
  {name: 'sutract 3', args: [-3], expected: 3},
  {name: 'subtract 3', args: [-3], expected: 0}
]



let obj = {
  val: 0,
  add: function (a) {
    this.val += a;
    return this.val
  }
}

run_tests(obj.add.bind(obj), tests)



// testing utils
function run_tests(_target, _cases) {
  for (let t_case of _cases) {

    let expected = t_case.expected;

    let actual = _target(...t_case.args);

    let pass;
    if (typeof expected === 'object') {
      const _actual = JSON.stringify(actual);
      const _expected = JSON.stringify(expected);
      pass = _actual === _expected;
    } else {
      pass = actual === expected;
    };

    if (!pass) {
      console.log(`${t_case.name}: \n` + 
          `   actual: {${typeof actual}, ${actual}} \n` +
          `   expected: {${typeof expected}, ${expected}}`);
    };
  };
};