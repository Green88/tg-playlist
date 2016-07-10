/**
 * Created by Tania on 19/04/16.
 */
var app = app || {};

app.Playlist = Backbone.Model.extend({
    defaults: {
        id: null,
        title: '',
        tracks: []
    }
});