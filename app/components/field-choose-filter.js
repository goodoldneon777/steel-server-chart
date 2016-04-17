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
		var boxCount = null;

		switch (activeOption) {
			case 'none':
				boxCount = 0;
				break;
			case 'range':
				boxCount = 2;
				break;
			default:
				boxCount = 1;
				break;
		}

		this.set('boxCount', boxCount);
	},
	initialize: function() {
		this.setOperators();
	}.on("init")
});
