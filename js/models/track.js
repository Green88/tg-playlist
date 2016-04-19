/**
 * Created by Tania on 17/04/16.
 */

var app = app || {};

app.Track = Backbone.Model.extend({
   defaults: {
       id: '',
       title: '',
       permalinkUrl: '',
       imageUrl: '',
       showPlayer: false
   }
});