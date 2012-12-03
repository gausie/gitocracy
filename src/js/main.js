(function($){

    // Models
    window.Org = Backbone.Model.extend();
    
    window.OrgCollection = Backbone.Collection.extend({
        model: Org,
        url: "/orgs"
    });

    // Views
    window.OrgListView = Backbone.View.extend({
        
        tagName: "select",
        
        events: {
            'change': function() { 
                console.dir($(this).html());
                val = $(this).val();
                if(val!="null"){
                    location.href = '#/org/'+val; 
                }
            }
        },
        
        initialize: function() {
            $(this.el).append("<option value='null'>Select an organisation</option>");
            this.model.bind("reset", this.render, this);
        },

        render: function(eventName) {
            _.each(this.model.models, function (org) {
                $(this.el).append(new OrgListItemView({model:org}).render().el);
            }, this);
            return this;
        }
        
    });
    
    window.OrgListItemView = Backbone.View.extend({

        tagName: "option",

        template:_.template("<%= name %>"),

        render: function(eventName) {
            //$(this.el).html(this.model.toJSON());
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
 
    });
    
    window.OrgView = Backbone.View.extend({

        render: function(){
            this.orgList = new OrgCollection();
            this.orgListView = new OrgListView({model:this.orgList});
            this.orgList.fetch();
            return this.orgListView.render().el;
        }
        
    });

    // Routes
    var AppRouter = Backbone.Router.extend({

        routes: {
            "": "main",
        },

        main: function(){
            $('body').append(new OrgView().render());
        }

    });

    app = new AppRouter();
    Backbone.history.start();

})(jQuery);
