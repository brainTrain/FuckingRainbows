$(document).ready( function() {
    $('*').live('click', function(data) {
        var attributeS = "";
        var taggyWaggy = this.localName;
        for(i=0; i < this.attributes.length; i++) {
            attributeS += '[' + this.attributes[i].nodeName + '="' + this.attributes[i].nodeValue + '"]';
        }
        var safeSelex = taggyWaggy + attributeS;
        

        data.stopPropagation();
        console.log('  ');
        console.log(safeSelex);
        console.log('=================');
        console.dir(this);
        console.log('  ');

        if(!$(this).hasClass('badmofo')) {
           //$(this).toggleClass('catchadream'); 
        }
    });

});
