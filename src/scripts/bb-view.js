$(function () {
    
   var Start = Backbone.View.extend({
      el: "#block",

      templates : {
         "start"     :     _.template($("#start").html()),
         "error"     :     _.template($("#error").html()),
         "success"   :     _.template($("#success").html())
      },
      
      events: {
         "click input:button": "check",
         "click label" : "labelClick",
         "click input.back" : "back"


      },

      initialize: function () {
          this.listenTo(this.model, "change", this.render);
          console.log('view initialize');
          console.log(this.model);
      },

      render: function () {
         var state      = this.model.get('state');
         var toRender   = this.templates[state];
         $(this.el).html(toRender(this.model.toJSON()));
      },

      back: function () {
         console.log('back');
          this.model.set({state: "start"})
      },

      check: function () {
         console.log(this.$el);
         var username = this.$el.find("input:text").val();
         if ( username == "test") {
            this.model.set({
               state: "success",
               username: username
            })
            console.log('found user');
         }
         else {
            this.model.set({
               state: "error",
               username: username
            })
            console.log('not found user');
         }
      },

      labelClick: function () {
         console.log('label is clicked');
      }
   });

   console.log('starting view');
   console.log(appState);
   var start = new Start({model: appState});
   appState.trigger('change');
})