/**
 * Created by Tania on 17/04/16.
 */
var app = app || {};

app.PlaylistView = Backbone.View.extend({
    tagName: 'li',

    template: _.template( $('#playlist-template').html() ),
    events: {
        'click #deleteList': 'deleteList'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    },
    deleteList: function() {
        //Delete model
        this.model.destroy();

        //Delete view
        this.remove();
    }
});