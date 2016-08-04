/**
 * Created by Tania on 10/07/16.
 */
app.SessionCounterView = Backbone.View.extend({
    el: '.session-counter',
    template: _.template( $('#session-counter-template').html()),
    events: {
    },
    initialize: function() {

    },
    render: function() {
        return this;
    }

});