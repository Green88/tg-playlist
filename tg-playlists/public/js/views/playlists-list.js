/**
 * Created by Tania on 17/04/16.
 */
var app = app || {};

app.PlaylistsListView = Backbone.View.extend({
    el: '#playlistWrapper',
    playlistTemplate: _.template( $('#playlist-template').html()),
    events: {
        'click #createPlaylist': 'createPlaylist'
    },
    initialize: function() {
        this.collection = new app.PlaylistsList();
        this.collection.fetch();
        this.render();

        this.$newPlaylistTitle = this.$('#playlistTitle');
        
        console.log('playlists collection', this.collection);
        
        this.listenTo(this.collection, 'add', this.renderPlaylist);
        this.listenTo(this.collection, 'reset', this.hellReset);
        this.listenTo(this.collection, 'update', this.hellUpdate);
        //this.listenTo(this.collection, 'sync', this.render);
    },
    render: function() {
        console.log('render: ', this.collection);
        this.collection.each(function(item) {
            this.renderPlaylist(item);
        }, this );
        return this;
    },
    renderPlaylist: function(playlist) {
        var listView = new app.PlaylistView({
            model: playlist
        });
        this.$('#playlistItems').append(listView.render().el);
    },
    hellAdd: function() {
        console.log('add', this.collection);
    },
    hellReset: function() {
        console.log('reset', this.collection);
    },
    hellUpdate: function() {
        console.log('update', this.collection);
    },
    hellSync: function() {
        console.log('sync', this.collection);
    },

    playTrack: function() {

    },
    createPlaylist: function() {
        if(!_.isEmpty(this.$newPlaylistTitle.val())) {
            console.log('playlist created with title:' + this.$newPlaylistTitle.val());
            var playlist = {
                title: this.$newPlaylistTitle.val(),
                tracks: []
            };

            this.collection.create(playlist);
        }

        this.$newPlaylistTitle.val('');
    }
});