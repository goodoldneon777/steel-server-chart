import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['c-main-section'],
    actions: {
    	foo() {
    		this.parse();
    	},
        feed(params) {
            this.sendAction('feed', params);    //Bubble-up whatever was sent to the feed.
        }
    },
	// parse: function() {
	// 	var yAxisField = '';
	// 	var xAxisField = '';


	// 	this.$('.y-axis .field-choose-select option:selected').each(function() {
	//         yAxisField += $(this).val() + ' ';
	//     });

	//     this.$('.x-axis .field-choose-select option:selected').each(function() {
	//         xAxisField += $(this).val() + ' ';
	//     });


	// 	console.log({
	// 		yAxisField: yAxisField,
	// 		xAxisField: xAxisField
	// 	});
	// },
	initialize: function() {
	}.on("init")
});
