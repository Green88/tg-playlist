/**
 * Created by Tania on 17/04/16.
 */
var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#playlistsApp',
    events: {
        'keyup #search': 'search',
        'click #loadMore': 'loadMore'
    },
    loadMoreTemplate: _.template( $('#load-more-template').html()),
    initialize: function() {
        this.$search = this.$('#search');
        this.$tracksList = this.$('#tracksList');

        this.limit = 10;
        this.offset = 0;
        this.query = '';
        
        this.listenTo(app.Tracks, 'add', this.addTracks);
        this.listenTo(app.Tracks, 'change:showPlayer', this.loadPlayer);
    },
    keyValidator_: new RegExp('^[a-zA-Z0-9\b]+$'),

    search: _.debounce(function(e) {
        if (this.keyValidator_.test(String.fromCharCode(e.keyCode))) {
            var query = this.$search.val();
            if(!_.isEmpty(query) && this.query!== query) {
                //new search
                this.query = query;
                this.resetSearchParams();
                app.Tracks.reset();
                this.doSearch();
            }
        }
    }, 500),
    resetSearchParams: function() {
        this.offset = 0;
    },
    setNextPageParams: function() {
        this.offset = this.offset + this.limit;
    },
    doSearch: function() {
        //TODO: destroy collection contents
        SC.get('/tracks', { q: this.query, limit: this.limit, offset: this.offset, linked_partitioning: 1}).then(function(result) {
            console.log(result);
            if(!_.isEmpty(result)) {
                var tracks = _.map(result.collection, function(track) {
                    return new app.Track({
                        id: track.id,
                        title: track.title,
                        permalinkUrl: track.permalink_url,
                        imageUrl: track.artwork_url
                    })
                });
                app.Tracks.add(tracks);
            } else {
                this.$('#loadMore').remove();
            }
        });
    },
    loadMore: function() {
        this.setNextPageParams();
        this.doSearch();
    },
    addTracks: function() {
        this.$tracksList.html('');
        app.Tracks.each(this.addTrack, this);
        this.renderLoadMore();
    },
    addTrack: function(track) {
        var view = new app.TrackView({ model: track });
        this.$tracksList.append( view.render().el );
    },
    renderLoadMore: function() {
        this.$tracksList.append( this.loadMoreTemplate);
    },
    loadPlayer: function(track) {
        console.log(track);
        SC.oEmbed(track.get('permalinkUrl'), { auto_play: true }).then(function(oEmbed) {
            console.log('oEmbed response: ', oEmbed);
            this.$('#scIframe').html(oEmbed.html);
        });
    }
});