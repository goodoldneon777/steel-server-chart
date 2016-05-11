import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['c-main-section'],
    actions: {
        feed(params) {
        	// console.log(params);
            this.sendAction('feed', params);    //Bubble-up whatever was sent to the feed.
        }
    },
	initialize: function() {
	}.on("init")
});
