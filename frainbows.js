$(document).ready( function() {
    $('*').click( function() {
        if(!$(this).hasClass('.title') || !$(this).parent().hasClass('.title')) {     
            $(this).toggleClass('catchadream');
            return false;
        } else {
            return true;
        }
    });  

});
