'use strict';

require('./index.css');
var Store = require('Store');
var Events = require('Events');

var store = new Store();

function Page (options) {
    var opts = options || {};
    this.opts = opts;
    this.init();
    /**
    if(opts.overlay) {
        var $overlay = '<div class="page-overlay"></div>';
        $(document.body).append($overlay);
    }
    **/
}
Page.prototype = {
    constructor: Page,  //继承时必须显示指定
    init: function(){
        /**
        var $modal = $('<div class="__modal"></div>');                                                               
        this.container = $modal;
        _HandleEvents.call(this).init();
        **/
    },
    destroy: function() {
        /**
        this.container.remove();
        $(".page-overlay").hide();
        **/
    },
    update: function(options) {
        /**
        var opts = options || {};
        var $modal = this.container;
        var template = _UI().indexView();
        var html = template(store.getState());
        $modal.find('.__modal-body').html(opts.content);
        **/
    }
    /**这种模式也不错
    handleEvents: function() {
        this.container.find('.__modal-footer')
            .on('click.__modal', '.__modal-close', $.proxy(this.destroy, this));
        this.container.find('.__modal-header')
            .on('click.__modal', '.__modal-close', $.proxy(this.destroy, this));
    }
    **/
}
function _UI() {
    return {
        indexView: function() {
            return require('./tmpl/index.jade');
        }
    }
}

function _HandleEvents() {
    var _self = this;
    /**
    var events = new Events({
        '.__modal-close@click': 'destroy'
    }); 
    return {
        init: function() {
            events.dispatch(this,_self.container);
        },
        destroy: function() {
            //console.log(_self);
            _self.destroy();
        }
    }
    **/
}

function _Action() {
    return {
        index: function(record){
            //console.log(record);
            var tabs=[],content=[];
            return {
                type: 'opts',
                payload: record
            }
        }
    }
}

module.exports = Page;
