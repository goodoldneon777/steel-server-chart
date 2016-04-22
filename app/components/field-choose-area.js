import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['c-fieldChooseArea'],
    actions: {
        filterToggle(param) {
            if (param === true) {
                this.set('filterFlag', true);
            } else if (param === false) {
                this.set('filterFlag', false);
            }
        },
        feed(params) {
            var feedType = params[0];
            var filterIndex = this.get('filterIndex');  //Location in filter list (0-based).

            if (feedType === 'newActiveOption') {
                var activeOption = params[1];
                var prevOption = params[2];

                if (activeOption === 'none') {
                    this.sendAction('feed', ['deleteFilter', filterIndex]);
                } else if (activeOption !== 'none'  &&  prevOption === 'none') {
                    this.sendAction('feed', ['addFilter']);
                }
            }

            this.sendAction('feed', params);
        }
    },
    initialize: function(){
        var area = this.get('area');

        this.set('filterFlag', true);
    }.on("init")
});
