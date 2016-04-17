import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['c-fieldChooseArea'],
    actions: {
        filterToggle: function(param){
            if (param === true) {
                this.set('filterFlag', true);
            } else if (param === false) {
                this.set('filterFlag', false);
            }
        }
    },
    initialize: function(){
        var area = this.get('area');
        this.set('filterFlag', true);

        var selects = this.get('fieldChooseSelect').filter(function(item) {    //Filter for the target select.
            if (area === 'yAxis') {
                // console.log(item.name);
                if (item.get('yAxisEnable') === true) { return true; }
            }
        });
// console.log(selects);
        // this.set('fieldChooseSelect', selects);
    }.on("init")
});
