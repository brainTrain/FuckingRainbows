$(document).ready( function() {
    $('*').click( function() {
                        if( !$(this).parent().hasClass('blue_button') || !$(this).hasClass('blue_button') || !$(this).parent().hasClass('white_button') || !$(this).hasClass('white_button')) {
            $(this).toggleClass('catchadream');
            return false;
        } else {
            return true;
        }
    });  

});
