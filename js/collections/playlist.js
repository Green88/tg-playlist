/**
 * Created by Tania on 17/04/16.
 */
var app = app || {};

var PlaylistTracksList = Backbone.Collection.extend({
    model: app.Track,
    localStorage: new Backbone.LocalStorage('playlist')

});

app.Playlist = new TracksList();