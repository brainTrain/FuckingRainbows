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
    js  : ['http://js.pusherapp.com/1.9/pusher.min.js', 'http://braintrain.github.com/fuckingrainbows/md5-min.js'],
//  jqpath : 'myCustomjQueryPath.js', <-- option to include your own jquery
    ready : function() {
        $(document).ready( function() {
            $('<div class="partytehdreamz blue_rb_button badmofo"><span>Activate Rainbow Party!!</span></div>').appendTo('body');
            $('<div class="touchadream blue_rb_button badmofo"><span>Touch me!</span></div>').appendTo('body');
            $('<div class="karmaadream blue_rb_button badmofo"><span>Good karma me!</span></div>').appendTo('body');
            $('<div class="karmagoodz badmofo"><h2>Fight for Human Rights!<h2><p></p><br/><p>Why not help <a class="donate_rb_site"> ' + document.location.href + '</a> support gay marriage?! <br/> <br/> ...because sometimes rainbows just aren\'t enough.  <a class="hrc_donate white_rb_button badmofo" href="http://shop.hrc.org/donate/hrc-donation-starting-at-5.html" target="blank"><span>Click here to donate!</span></a> </p></div>').appendTo('body');

            var rainbowChannel = hex_md5(document.location.href);
            var dreamMagic = false;
            var partyMagic = false;

                $('.touchadream').click( function() {
                    dreamMagic = !dreamMagic;
                    if(partyMagic) {
                        partyMagic = !partyMagic;
                        $('.partytehdreamz span').html('Activate Rainbow Party!!');
                    }
                    if(dreamMagic) {
                        $('.touchadream span').html('no more rainbows please!!');
                    } else {
                        $('.touchadream span').html('Touch me!');
                    }
                });  
                $('.partytehdreamz').click( function() {
                    partyMagic = !partyMagic;
                    if(dreamMagic) {
                        dreamMagic = !dreamMagic;
                        $('.touchadream span').html('Touch me!');
                    }
                    if(partyMagic) {
                        $('.partytehdreamz span').html('leave the party... :(');
                    } else {
                        $('.partytehdreamz span').html('Activate Rainbow Party!!');
                    }
                    if( !dreamMagic && partyMagic ) {
                        var pusher = new Pusher('0b75eb1a823194806706');    
                        var channel = pusher.subscribe(rainbowChannel);

                        channel.bind('click', function(data) {  //listens for 'chirp' events on my channel 'alert'
                            console.log('====post pusher====');
                            console.log('data: ');
                            console.log(data);

                            var noSlash = data.split('\\').join('');
                            console.log('noslash: ');
                            console.log(noSlash);
                            console.log('===================');
                            var crazyIsh = $("'" + data + "'");
                            console.log(crazyIsh);
                            $("" + noSlash + "").toggleClass('catchadream');

                        });
                    }     
                });  
                $('.karmaadream span').click( function() {
                    $('.karmagoodz').toggle();
                    
                });
                $('*').live('click', function(event) {
                    if( dreamMagic && !partyMagic ) {
                        if( !$(this).hasClass('badmofo') ) {
                            $(this).toggleClass('catchadream');
                            return false;
                        }
                        return true;    
                    }
                    if( !dreamMagic && partyMagic ) {

                        if( !$(this).hasClass('badmofo') ) {

                            var attributeS = "";
                            //var contains = $(this).text();
                            var contains = "";
                            var taggyWaggy = this.localName;
                            for(i=0; i < this.attributes.length; i++) {
                                attributeS += '[' + this.attributes[i].nodeName + '="' + this.attributes[i].nodeValue + '"]';
                            }
                            //var safeSelex = taggyWaggy + attributeS + ':contains("' + contains + '")' ;
                            var safeSelex = taggyWaggy + attributeS;
                
                            //some logging
                            console.log('====pre pusher====');
                            console.log(' ');
                            console.dir(this);
                            console.log(safeSelex);
                            console.log(' ');
                            console.log('=================');

                            $.ajax( {
                                type: "POST",
                                dataType: "json",
                                url: "http://www.bossemails.com/pushersound/com.php",
                                data: {'channel': rainbowChannel, 'button': safeSelex},

                            });
                        return false;
                        }
                        return true; 
                    }
                });  



        });
    }
 
});
 
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
