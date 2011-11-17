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
            $('<div class="karmagoodz badmofo"><h2>Fight for Human Rights!<h2><p></p><br/><p>Why not help <a class="donate_rb_site"> ' + document.location.href + '</a> support gay marriage?! <br/> <br/> ...because sometimes rainbows just aren\'t enough.  <a class="hrc_donate white_rb_button badmofo" href="" target="blank"><span>Click here to donate!</span></a> </p></div>').appendTo('body');

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

                        channel.bind('click', function(data) { 

                            var noSlash = ajaxSelect(data);
                            console.log('noslash: ');
                            console.log(noSlash);
                            $(noSlash).toggleClass('catchadream');

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

                            safeSelex = ajaxThis(this);

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
 
function ajaxSelect(ajarx){
    //remove escape character so quotes can be used
    return ajarx.split('\\').join('');
}

function ajaxThis(ajaxyz){
            
            var safeSelex = [];
            //set selectLevel equal to object
            var selectLevel = ajaxyz;
            //counter to map DOM
            var j = 0;
            //while loop traces map from object to html, and builds a 
            //selector string that traces the path.
            while(selectLevel.localName != 'html') {
                var attrTree = "";
                var tagTerm = "";
                //grab html tag type to handle custom tags
                tagTerm = selectLevel.localName;
                //grabs all attributes of the object, handles custom attributes 
                if(selectLevel.attributes.length == 0) {
                    //if the object you click on has no attributes, we need to give it
                    //a blank one in order for the click to register
                    var attributeS = '[class=""]';
                } else {
                    var attributeS = "";
                }
                for(i=0; i < selectLevel.attributes.length; i++) {
                    attributeS += '[' + selectLevel.attributes[i].nodeName + '="' + selectLevel.attributes[i].nodeValue + '"]';
                }

                //attribute tree puts tag and attributes together to form a selector 
                //eg a[class="whatevz"][id="thing229"][lolzwhatever="thiswillworkforwhatever"] 
                attrTree += tagTerm + attributeS;
                //build array of selectors leading to the object clicked on 
                safeSelex[j] = attrTree;
                //set select level to parent of current level, to crawl up the DOM
                selectLevel = selectLevel.parentNode;
                j ++;

            }
            
            //grab text of attribute to select on contents as well as attributes of object
            var contains = ajaxyz.textContent;

            //build the safe selector going from bodly, down to the object.. 
            if(ajaxyz.localName == 'img' || ajaxyz.localName == 'body' ) {
                safeSelex = "'" + safeSelex.reverse().join(' ') + "'"; 
            } else {
                safeSelex = "'" + safeSelex.reverse().join(' ') +  ":contains(" + '"' + contains + '"' + ")'"; 
            }

            return safeSelex;

}


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
