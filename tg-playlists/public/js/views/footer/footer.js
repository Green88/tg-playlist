/**
 * Created by Tania on 10/07/16.
 */

app.FooterView = Backbone.View.extend({
    el: '.footer',
    events: {
    },
    initialize: function() {
        this.limitView = new app.FooterLimitView();
        this.clockView = new app.ClockView();
        this.sessionCounterView = new app.SessionCounterView();
    },
    render: function() {
        this.limitView.render();
        this.clockView.render();
        this.sessionCounterView.render();
        return this;
    }
    
});