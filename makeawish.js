/*
 * jQuery Bookmarklet - version 1.0
 * Originally written by: Brett Barros
 * Heavily modified by: Paul Irish
 *
 * If you use this script, please link back to the source
 *
 * Copyright (c) 2010 Latent Motion (http://latentmotion.com/how-to-create-a-jquery-bookmarklet/)
 * Released under the Creative Commons Attribution 3.0 Unported License,
 * as defined here: http://creativecommons.org/licenses/by/3.0/
 *
 */
 
window.bookmarklet = function(opts){fullFunc(opts)};
 
// These are the styles, scripts and callbacks we include in our bookmarklet:
window.bookmarklet({
 
    css : ['http://braintrain.github.com/fuckingrainbows/rainbows.css'],
    js  : ['http://js.pusherapp.com/1.9/pusher.min.js'],
//  jqpath : 'myCustomjQueryPath.js', <-- option to include your own jquery
    ready : function(){
            $('<div class="touchadream">Touch me!</div>').appendTo('body');
            $('<script src="http://js.pusherapp.com/1.9/pusher.min.js"></script>').appendTo('head');

        var pusher = new Pusher('0b75eb1a823194806706');    
            var channel = pusher.subscribe('blah');

            channel.bind('click', function(data) {  //listens for 'chirp' events on my channel 'alert'
             
                $(data).toggleClass('catchadream');


            });
            $('*').click(function() {
                $(this).toggleClass('catchadream');
                 
                console.log(this);
                    $.ajax( {
                        type: "POST",
                        url: "http://www.bossemails.com/pushersound/com.php?channel=blah&button=" + $(this).html(),
                        dataType: "http"
    
                    });
            });  

    }
 
})
 
function fullFunc(opts){
 
    // User doesn't have to set jquery, we have a default.
    opts.jqpath = opts.jqpath || "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";
 
    var jsfiles
    function getJS(jsfiles){
 
    // Check if we've processed all of the JS files (or if there are none)
    if (jsfiles.length === 0) {
        opts.ready();
        return false;
    }
 
        // Load the first js file in the array
        $.getScript(jsfiles[0],  function(){ 
 
            // When it's done loading, remove it from the queue and call the function again    
            getJS(jsfiles.slice(1));
 
        })
 
    }
 
    // Synchronous loop for css files
    function getCSS(csfiles){
        $.each(csfiles, function(i, val){
            $('<link>').attr({
                    href: val,
                    rel: 'stylesheet'
                }).appendTo('head');
        });
    }
 
    function getjQuery(filename) {
 
        // Create jQuery script element
        var fileref = document.createElement('script')
        fileref.type = 'text/javascript';
        fileref.src =  filename;
 
        // Once loaded, trigger other scripts and styles
        fileref.onload = function(){
 
            getCSS(opts.css); // load CSS files
            getJS(opts.js); // load JS files
 
        };
 
        document.body.appendChild(fileref);
    }
 
    getjQuery(opts.jqpath); // kick it off
 
}; // end of bookmarklet();
