import Ember from 'ember';

export default Ember.Component.extend({
	triggerChildActionProp: true,
	actions: {
	    submit() {
	    	this.toggleProperty('triggerChildActionParse');
	    }
	},
	start: function() {

	}.on("init")
});
