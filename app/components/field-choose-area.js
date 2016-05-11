import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['c-fieldChooseArea'],
    observerParse: Ember.observer('triggerParse', function() {
        this.parse();
        // Executes whenever the "value" property changes
        // See the addObserver method for more information about the callback arguments
    }),
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

            this.sendAction('feed', params);    //Bubble up whatever was sent to the feed.
        }
    },
    parse: function() {
            var fieldSelection = '';
            var fieldFilter = '';


            this.$('.field-choose-select option:selected').each(function() {
                if (fieldSelection.length > 0) {
                    fieldSelection += ',';
                }
                
                fieldSelection += $(this).val();
            });


            this.$('.field-choose-filter option:selected').each(function() {
                if (fieldFilter.length > 0) {
                    fieldFilter += ',';
                }

                fieldFilter += $(this).val();
            });
            this.$('.field-choose-filter input').each(function() {
                if (fieldFilter.length > 0) {
                    fieldFilter += ',';
                }

                fieldFilter += $(this).val();
            });


            var area = this.get('area');
            var params = [];

            if (['yAxis', 'xAxis'].indexOf(area) >= 0) {   
                params = ['parse', area, fieldSelection, fieldFilter];
            } else if (area === 'filters') {
                var filterNum = this.get('filterIndex') + 1;
                params = ['parse', area, filterNum, fieldSelection, fieldFilter];
            }


            this.sendAction('feed', params);
    },
    initialize: function(){
        var area = this.get('area');

        this.set('filterFlag', true);
    }.on("init")
});
