import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['c-fieldChooseFilter'],
	setOperators: function() {
		var operators = this.get('filters').filter(function(item) {    //Filter for the target select.
            if (item.get('name') === 'filter_operator') { return true; }
        })[0].get('options');

// 		var operators = this.get('filters')[0].get('options');
// console.log(operators);
		this.set('operators', operators);
	},
	initialize: function() {
		this.setOperators();
	}.on("init")
});
