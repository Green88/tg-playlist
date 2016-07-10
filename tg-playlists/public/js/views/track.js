/**
 * Created by Tania on 17/04/16.
 */
var app = app || {};

app.TrackView = Backbone.View.extend({
    tagName: 'li',

    template: _.template( $('#search-item-template').html() ),

    events: {
        'click .play': 'playTrack'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },
    playTrack: function() {
        this.model.set('showPlayer', true);
    }
});