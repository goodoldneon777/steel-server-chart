import Ember from 'ember';

export default Ember.Route.extend({
	model() {
	    return Ember.RSVP.hash({
	      	fieldChooseSelect: this.store.findAll('fieldChooseSelect'),
	      	fieldChooseFilter: this.store.findAll('fieldChooseFilter')
	    });
	},
	start: function() {
		// var store = this.store;

		// store.findAll('fieldChooseSelect');

		// this.set('selects', 'hi');
	}.on("init")
});
