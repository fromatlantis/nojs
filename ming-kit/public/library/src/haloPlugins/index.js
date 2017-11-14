'use strict';
var Events = require('Events');
var profile = require('../../../../views/profile/index.js');
var msgPlus = require('../../../../views/msgPlus/index.js');
var modal = require('../../../../views/modal/index.js');
var industryWarn = require('../../../../views/industryWarn/index.js');
/**IE8不支持
function haloPlugins(options) {
	var opts = options || {};
	this.profile = profile;
	this.msgPlus = msgPlus;
	//this.$ = window.jQuery;
}
**/
var haloPlugins = {};
haloPlugins.profile = profile;
haloPlugins.msgPlus = msgPlus;
haloPlugins.modal = modal;
haloPlugins.industryWarn = industryWarn;

haloPlugins.HandleEvents = (function(){
    var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    var events = new Events({
        '.search-chip-input input@keyup':'enter',
        '.search-chip-input .input-group@click':'getFocus',
        '.search-chip-input input@focus':'inputFocus',
        '.search-chip-input input@blur':'inputBlur',
        '.search-chip-input i@click':'search'
    })
    function initProfile(code) {
        if(isIDCard2.test(code)){
            profile.init({
                certificateCode:code
            });
        }else{
            var err = $('.search-chip-input input').attr('err-msg');
            $('.search-chip-input input').val(err);
            $('.search-chip-input input').blur();
            profile.destroy();
        }
    }
    return {
        init: function() {
            events.dispatch(this);
        },
        enter: function(e) {
            var idCard = $(this).val();
            if(e.keyCode == 13 ){
                initProfile(idCard);
            }
        },
        getFocus: function() {
            var $placeholder=$(this).find('span');
            var $input=$(this).find('input');
            $placeholder.hide();
            $input.focus();
        },
        inputFocus: function() {
            var err = $('.search-chip-input input').attr('err-msg');
            var value = $(this).val();
            if(value == ''){
                $(this).next('span').hide();
            }else if(value == err){
                $(this).val('');
            }
        },
        inputBlur: function() {
            if($(this).val()==''){
                $(this).next('span').show();
            }
        },
        search: function() {
            var idCard = $('.search-chip-input input').val();
            initProfile(idCard);
        }
    }
}());

haloPlugins.HandleEvents.init();

module.exports=haloPlugins;//function 对象必须用new
