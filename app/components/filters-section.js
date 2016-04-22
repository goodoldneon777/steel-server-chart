import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		remove: function(params) {
		    var filterIDArr = this.get('filterIDArr').toArray();
		    var filterIDArrRenum = [];

		    filterIDArr.splice(params, 1);

		    this.set('filterIDArr', filterIDArr);
		},
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
	    var filterIDArr = this.get('filterIDArr').toArray();
	    var filterIDMax = Math.max.apply(null, filterIDArr);

	    filterIDArr.push(filterIDMax + 1);

	    this.set('filterIDArr', filterIDArr);
	},
	deleteFilter: function(filterIndex) {
	    var filterIDArr = this.get('filterIDArr').toArray();

	    filterIDArr.splice(filterIndex, 1);

	    this.set('filterIDArr', filterIDArr);
	},
	initialize: function(){
    	var items = this.get('filterCountInit');
    	var filterIDArr = [];

		for (var i = 1; i <= items; i++) {
			filterIDArr.push(i);
		}

    	this.set('filterIDArr', filterIDArr);
    }.on("init")
});
