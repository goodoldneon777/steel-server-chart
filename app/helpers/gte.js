import Ember from 'ember';

const gte = (params) => params[0] >= params[1];

export default Ember.Helper.helper(gte);