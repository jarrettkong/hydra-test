# Hydra Test

### Notes on the test

`Sinon.stub` is being used to force the output of a `Math.random()` call to be what I tell it to be. For example `random.onCall(0).returns(0.25)` means that the first time `Math.random()` is called between `hydra.js` and `hero.js`, it will output `0.25`. It does not require any special code or integration in either file, `Math.random()` can be invoked as normal.

### Running the test

1. Navigate to the `hydra-test` directory
2. Run `npm init`
3. Run `npm install mocha chai sinon`
4. Run `npm test test/hydra-test.js`
