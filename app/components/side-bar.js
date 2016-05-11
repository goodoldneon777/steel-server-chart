import Ember from 'ember';

export default Ember.Component.extend({
	triggerParse: false,
	actions: {
	    submit() {
	    	this.toggleProperty('triggerParse');
	    },
        feed(params) {
        	// console.log(1);
            this.sendAction('feed', params);    //Bubble-up whatever was sent to the feed.
            // console.log(params);
        }
	},
	start: function() {

	}.on("init")
});
