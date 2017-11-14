var Events = require('Events');
(function(){
    var events = new Events({
        '.input-group@click':'getFocus',
        '.input-group input@focus':'inputFocus',
        '.input-group input@blur':'inputBlur',
    })
    return {
        init: function() {
            events.dispatch(this);
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
        }
    }
}());
