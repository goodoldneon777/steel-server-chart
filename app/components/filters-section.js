import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		remove: function(params) {
		    var itemArr = this.get('itemArr').toArray();
		    var itemArrRenum = [];

		    itemArr.splice(params, 1);

		    this.set('itemArr', itemArr);
		}
	},
	initialize: function(){
    	var items = this.get('itemCount');
    	var itemArr = [];

		for (var i = 1; i <= items; i++) {
			itemArr.push(i);
		}

    	this.set('itemArr', itemArr);
    }.on("init")
});
