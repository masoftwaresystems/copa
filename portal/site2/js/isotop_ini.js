 jQuery(window).load(function() {  
    var jQuerycontainer = jQuery('#container');
    //Run to initialise column sizes
    updateSize();

    //Load masonry when images all loaded
    jQuerycontainer.imagesLoaded( function(){

        jQuerycontainer.isotope({
            // options
            itemSelector : '.element',  
            layoutMode : 'masonry',
            transformsEnabled: false,
            columnWidth: function( containerWidth ) {
                containerWidth = jQuerybrowserWidth;
                return Math.floor(containerWidth / jQuerycols);
              }
        });
    });
    
      // update columnWidth on window resize
    jQuery(window).smartresize(function(){  
        updateSize();
        jQuerycontainer.isotope( 'reLayout' );
    });

  
    //Set item size
    function updateSize() {
        jQuerybrowserWidth = jQuerycontainer.width();
        jQuerycols = 5;


        if (jQuerybrowserWidth >= 767 && jQuerybrowserWidth < 995) {
            jQuerycols = 5;
        }
        else if (jQuerybrowserWidth >= 479 && jQuerybrowserWidth < 767) {
            jQuerycols = 2;
        }
        else if (jQuerybrowserWidth < 479) {
            jQuerycols = 1;
        }

        //console.log("Browser width is:" + jQuerybrowserWidth);
        //console.log("Cols is:" + jQuerycols);

        // jQuerygutterTotal = jQuerycols * 20;
    jQuerybrowserWidth = jQuerybrowserWidth; // - jQuerygutterTotal;
        jQueryitemWidth = jQuerybrowserWidth / jQuerycols;
        jQueryitemWidth = Math.floor(jQueryitemWidth);

        jQuery(".element").each(function(index){
            jQuery(this).css({"width":jQueryitemWidth+"px"});             
        });
         
  var jQueryoptionSets = jQuery('#options .option-set'),
    jQueryoptionLinks = jQueryoptionSets.find('a');

  jQueryoptionLinks.click(function(){
  var jQuerythis = jQuery(this);
  // don't proceed if already selected
  if ( jQuerythis.hasClass('selected') ) {
    return false;
  }
  var jQueryoptionSet = jQuerythis.parents('.option-set');
  jQueryoptionSet.find('.selected').removeClass('selected');
  jQuerythis.addClass('selected');

  // make option object dynamically, i.e. { filter: '.my-filter-class' }
  var options = {},
    key = jQueryoptionSet.attr('data-option-key'),
    value = jQuerythis.attr('data-option-value');
  // parse 'false' as false boolean
  value = value === 'false' ? false : value;
  options[ key ] = value;
  if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
    // changes in layout modes need extra logic
    changeLayoutMode( jQuerythis, options )
  } else {
    // otherwise, apply new options
    jQuerycontainer.isotope( options );
  }
  
  return false;
  });   
    
    };
      
    });