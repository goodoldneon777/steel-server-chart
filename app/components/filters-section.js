import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['c-filters-section'],
	actions: {
		feed(params) {
			var feedType = params[0];

			if (feedType === 'addFilter') {
				this.addFilter();
			} else if (feedType === 'deleteFilter') {
				var filterIndex = params[1];
				this.deleteFilter(filterIndex);
			}
			// console.log(params);
		}
	},
	addFilter: function() {
		//Add a new filter item to end of list.
	    var filterIDArr = this.get('filterIDArr').toArray();
	    var filterIDMax = Math.max.apply(null, filterIDArr);

	    filterIDArr.push(filterIDMax + 1);

	    this.set('filterIDArr', filterIDArr);
	},
	deleteFilter: function(filterIndex) {
		//Remove a filter at the filterIndex (0-based) in the filter list.
	    var filterIDArr = this.get('filterIDArr').toArray();

	    filterIDArr.splice(filterIndex, 1);

	    this.set('filterIDArr', filterIDArr);
	},
	initialize: function(){
    	var items = this.get('filterCountInit');
    	var filterIDArr = [];

		for (var i = 1; i <= items; i++) {
			filterIDArr.push(i);
			//The values being pushed are meaningless (they could be anything). The array is just a surrogate for managing the filter list. Only position in the array matters.
		}

    	this.set('filterIDArr', filterIDArr);
    }.on("init")
});
