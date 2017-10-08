$(function(){

    $('.ex').live('click',function(e){
    $(this).parent().remove();
    });
    $('.add').live('click',function(e){
        $('#symptoms').after($('#symptoms').clone());
    });

});