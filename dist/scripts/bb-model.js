   var AppState = Backbone.Model.extend({
      defaults: {
         username:   "",
         state:      "start"
      }

   });


   var appState = new AppState();
   console.log('model created');
   console.log(appState);