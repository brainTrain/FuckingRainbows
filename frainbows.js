$(document).ready( function() {
    $('*').click( function() {
        if($(this).hasClass('.title')) {     
            return true;
        } else {
            $(this).toggleClass('catchadream');
            return false;
        }
    });  

});
