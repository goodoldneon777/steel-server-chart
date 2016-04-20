import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['c-fieldChooseFilter'],
    actions: {
        changedSelect: function(selected) {   //When a select is changed.
            this.set('activeOption', selected);    //Set to the selected option.
           	this.setBoxCount();
            console.log(selected);
        }
    },
	setOperators: function() {
		var operators = this.get('filters').filter(function(item) {    //Filter for the target select.
            if (item.get('name') === 'filter_operator') { return true; }
        })[0].get('options');

		this.set('operators', operators);
	},
	setBoxCount: function() {
		var activeOption = this.get('activeOption');
		var boxCount = 0;
		var isArray = false;

		switch (activeOption) {
			case 'range':
				boxCount = 2;
				break;
			case 'in':
				boxCount = 1
				isArray = true;
			case 'not_in':
				boxCount = 1
				isArray = true;
			default:
				boxCount = 1;
				break;
		}

		this.set('boxCount', boxCount);
		this.set('isArray', isArray);
	},
	initialize: function() {
		this.setOperators();
	}.on("init")
});
