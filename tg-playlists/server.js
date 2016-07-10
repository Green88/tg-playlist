/**
 * Created by Tania on 20/04/16.
 */
'use strict';



// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

var uuid = require('node-uuid');

//Create server
var app = express();

//Connect to database
mongoose.connect('mongodb://127.0.0.1/playlist_database');

//Schemas
var Track = new mongoose.Schema({
    id: String,
    title: String,
    permalinkUrl: String,
    imageUrl: String,
    showPlayer: Boolean

});

var Playlist = new mongoose.Schema({
    id: String,
    title: String,
    tracks: [ Track ]
});

//Models
var PlaylistModel = mongoose.model( 'Playlist', Playlist );




// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );
    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );
    //perform route lookup based on URL and HTTP method
    app.use( app.router );
    //Where to serve static content
    app.use( express.static( path.join( application_root, 'public') ) );
    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Library API is running' );
});

//Get a list of all playlists
app.get( '/api/playlists', function( request, response ) {
    return PlaylistModel.find( function( err, playlists ) {
        if( !err ) {
            return response.send( playlists );
        } else {
            return console.log( err );
        }
    });
});

//Get a single playlist by id
app.get( '/api/playlist/:id', function( request, response ) {
    return PlaylistModel.findOne( {id: request.params.id}, function( err, playlist ) {
        if( !err ) {
            return response.send( playlist );
        } else {
            return console.log( err );
        }
    });
});

//Insert a new playlist
app.post( '/api/playlists', function( request, response ) {
    var id = uuid.v4();
    var playlist = new PlaylistModel({
        id: id,
        title: request.body.title,
        tracks: request.body.tracks
    });
    console.log('inserting new playlist', playlist);
    playlist.save( function( err ) {
        if( !err ) {
            return console.log( 'created', playlist);
        } else {
            return console.log( err );
        }
        return response.send( playlist );
    });
});

//Update a playlist
app.put( '/api/playlists/:id', function( request, response ) {
    console.log( 'Updating playlist ' + request.body.title );
    return PlaylistModel.findOne({'id': request.params.id}, function( err, playlist ) {
        console.log('found model: ', playlist);
        console.log('request: ', request.body);
        playlist.id = request.body.id;
        playlist.title = request.body.title;
        playlist.tracks = request.body.tracks;

        return playlist.save( function( err ) {
            if( !err ) {
                console.log( 'playlist updated' );
            } else {
                console.log( err );
            }
            return response.send( playlist );
        });
    });
});

//Delete a playlist
app.delete( '/api/playlists/:id', function( request, response ) {
    console.log( 'Deleting playlist with id: ' + request.params.id );
    return PlaylistModel.findOne( {id: request.params.id}, function( err, playlist ) {
        return playlist.remove( function( err ) {
            if( !err ) {
                console.log( 'Playlist removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode',
        port, app.settings.env );
});
