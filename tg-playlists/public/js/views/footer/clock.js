/**
 * Created by Tania on 10/07/16.
 */
app.ClockView = Backbone.View.extend({
    el: '.clock',
    template: _.template($('#clock-template').html()),
    events: {
    },
    initialize: function() {

    },
    render: function() {
        this.el.html(this.template);
        return this;
    }

});