import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
        feed(params) {
        	// console.log(1);
            console.log(params);
        }
	}
});
