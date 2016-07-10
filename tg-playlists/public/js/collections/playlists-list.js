/**
 * Created by Tania on 17/04/16.
 */
var app = app || {};

app.PlaylistsList = Backbone.Collection.extend({
    model: app.Playlist,
    url: '/api/playlists',
    parse: function(response) {
        console.log(response);
        return response;
    }

});
