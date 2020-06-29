    var Controller = Backbone.Router.extend({
    
    routes: {
        "":          "start",
        "!":         "start",
        "!/success": "success",
        "!/error":   "error"
    },

    start: function () {
        appState.set({state: "start"})
    },

    success: function () {
        appState.set({ state: "success" })
    },

    error: function () {
        appState.set({ state: "error" })
    }

    });


    var controller = new Controller();
    Backbone.history.start();
        

        