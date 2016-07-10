/**
 * Created by Tania on 17/04/16.
 */
var app = app || {};

var TracksList = Backbone.Collection.extend({
    model: app.Track
    
});

app.Tracks = new TracksList();
