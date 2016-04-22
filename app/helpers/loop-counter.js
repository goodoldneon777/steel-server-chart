import Ember from 'ember';

export function loopCounter(loops) {
  for (var i = 0; i < loops; i++) {
    args.push(arguments[i]);
  }
}

export default Ember.Helper.helper(loopCounter);
