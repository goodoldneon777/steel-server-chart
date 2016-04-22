import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['c-fieldChooseSelect'],
    actions: {
        changedSelect(param) {   //When a select is changed.
            var activeOption = param;
            var prevOption = this.get('activeOption');

            this.set('activeOption', activeOption);    //Set to the selected option.
            this.setActiveOption();

            // this.sendAction('newActiveOption', activeOption);
            this.sendAction('feed', ['newActiveOption', activeOption, prevOption]);
        },
        filterToggle(param) {
            var filterEnable = this.get('filterEnable');

            //Don't bubble-up child's filterEnable if this component's filterEnable is false. In other words, filterEnable will be false if any active options have filterEnable = false.
            if (!filterEnable) {
                this.sendAction('filterToggle', false);
            } else {
                this.sendAction('filterToggle', param);
            }
        },
        feed(params) {
            this.sendAction('feed', params);
        }
    },
	setSelect: function() {
        var component = this;
        var area = this.get('area');

		var select = this.get('selects').filter(function(item) {    //Filter for the target select.
            if (item.get('name') === component.get('name')) { return true; }
        })[0];

        this.set('select', select); //Set to the target select.
	},
    setOptions: function() {
        var area = this.get('area');
        var select = this.get('select');

        var options = select.get('options').filter(function(item) {
            if (area === 'yAxis') {
                if (item.yAxisEnable) { 
                    return true; }
            } else if (area === 'xAxis') {
                if (item.xAxisEnable) { 
                    return true; }
            } else if (area === 'filters') {
                if (item.showInFilters) { 
                    return true; }
            } else {
                return true;
            }
        });

        this.set('options', options);
    },
	setActiveOption: function() {
		var component = this;
        var activeOption = this.get('options')[0].value;

		if (!this.get('activeOption')) {  //If the user didn't select an option...
            this.set('activeOption', activeOption);    //Default to the first option.
        }

        var option = this.get('select').get('options').filter(function(item) {  //Filter for the target option.
            if (item.value === component.get('activeOption')) { return true; }
        })[0];

        this.set('filterEnable', option.filterEnable);

        if (option.filterEnable) {    //If the option should have a filter...
            this.sendAction('filterToggle', true);
        } else {
            this.sendAction('filterToggle', false);
        }
	},
	initialize: function(){
        var area = this.get('area');

        this.setSelect();
        this.setOptions();
        this.setActiveOption();
    }.on("init")
});
