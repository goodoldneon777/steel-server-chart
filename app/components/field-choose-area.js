import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['c-fieldChooseArea'],
    actions: {
        parse() {
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


            console.log("fieldSelection:  ", fieldSelection);
            console.log("fieldFilter:  ", fieldFilter);
        },
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


        this.$('.field-choose-select option:selected').each(function() {
            fieldSelection += $(this).val() + ' ';
        });


        console.log(fieldSelection);
    },
    initialize: function(){
        var area = this.get('area');

        this.set('filterFlag', true);
    }.on("init")
});
