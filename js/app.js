/**
 * Created by Tania on 17/04/16.
 */
var app = app || {};
var ENTER_KEY = 13;
$(function() {
    SC.initialize({
        client_id: '84c8787a2bd5c45dfa372c11e73958b1'
    });
    new app.AppView();
});