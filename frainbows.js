$(document).ready( function() {
    $('*').click( function() {
        if(!$(this).hasClass('title') || $(this).parent().hasClass('title') || !$(this).hasClass('suggest_link') || $(this).parent().hasClass('suggest_link') ) {     
            $(this).toggleClass('catchadream');
            return false;
        } else {
            return true;
        }
    });  

});
