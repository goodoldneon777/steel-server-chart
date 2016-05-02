import Ember from 'ember';

export default Ember.Route.extend({
	model() {
	    return Ember.RSVP.hash({
	      	fieldChooseSelect: this.store.findAll('fieldChooseSelect'),
	      	fieldChooseFilter: this.store.findAll('fieldChooseFilter')
	    });
	}
});
