<!DOCTYPE html>
<html lang="en">
<head>
  <title>Search Results</title>
  <meta charset="utf-8">
  <meta name = "format-detection" content = "telephone=no" />
  <link rel="icon" href="images/favicon.ico" type="image/x-icon">

  <link rel="stylesheet" href="css/grid.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/animate.css">

  <link href='http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Roboto:100,300,400,700,900' rel='stylesheet' type='text/css'>
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

  <script src="js/jquery.js"></script>
  <script src="js/jquery-migrate-1.2.1.js"></script>
  <script src="js/jquery.easing.1.3.js"></script> 
  <script src="search/search.js"></script>

  <script src="//maps.googleapis.com/maps/api/js?v=3.exp&amp;sensor=false"></script> 

  <!--[if (gt IE 9)|!(IE)]><!-->
    <script src="js/jquery.mobile.customized.min.js"></script>
  <!--<![endif]-->
  <script>
    $(document).ready(function () {
      var state = 0;
      document.getElementById('icon').onclick = function() {
        if (state == 1) {
          document.getElementById('search').style.display = 'none';
          state = 0;
          return;
        }
        document.getElementById('search').style.display = 'block';
        state = 1;
      };
    });
  </script>
  <!--[if lt IE 8]>
  <div id="ie6-alert" style="width: 100%; text-align:center;">
    <img src="http://beatie6.frontcube.com/images/ie6.jpg" alt="Upgrade IE 6" width="640" height="344" border="0" usemap="#Map" longdesc="http://die6.frontcube.com" />
      <map name="Map" id="Map"><area shape="rect" coords="496,201,604,329" href="http://www.microsoft.com/windows/internet-explorer/default.aspx" target="_blank" alt="Download Interent Explorer" /><area shape="rect" coords="380,201,488,329" href="http://www.apple.com/safari/download/" target="_blank" alt="Download Apple Safari" /><area shape="rect" coords="268,202,376,330" href="http://www.opera.com/download/" target="_blank" alt="Download Opera" /><area shape="rect" coords="155,202,263,330" href="http://www.mozilla.com/" target="_blank" alt="Download Firefox" />
        <area shape="rect" coords="35,201,143,329" href="http://www.google.com/chrome" target="_blank" alt="Download Google Chrome" />
      </map>
  <![endif]-->

  <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <link rel="stylesheet" type="text/css" media="screen" href="css/ie.css">
  <![endif]-->
</head>

<body>
  <!--========================================================
                            HEADER 
  =========================================================-->
  <header id="header">
    <section class="header_top">
      <div id="stuck_container">

        <h1><a href="index.html">Richard <span class="light">Biz.</span></a></h1>

        <div class="search-block" id="search-block">
          <div class="search-block_icon fa fa-search" id="icon"></div>
          <form id="search" style="display: none;" action="search.php" method="GET" accept-charset="utf-8">
            <input type="text" name="s" placeholder="Enter keyword:"/>
            <a onclick="document.getElementById('search').submit()"><div class="search_icon"></div>
            </a>
          </form>
        </div>
    
        <div class="navigation">
          <nav>
            <ul class="menu">
              <li><a href="index.html#about">About</a></li>
              <li><a href="index.html#projects">Projects</a></li>
              <li><a href="index.html#services">Services</a></li>
              <li><a href="index.html#staff">Staff</a></li>
              <li><a href="index.html#clients">Clients</a></li>
              <li><a href="index.html#contact-us">Contact us</a></li>
            </ul>
          </nav>
        </div>

      </div>
    </section>
  </header>

  <!--========================================================
                            CONTENT 
  =========================================================-->
<section id="content">
  <article>
    <div class="container">
      <div class="search_results">
        <div class="row">
          <div class="grid_12">
            <h2>Search results</h2>
            <div id="search-results"></div>
          </div>
        </div>
      </div>
    </div>
  </article>
</section>


 <!--========================================================
                            FOOTER 
  =========================================================-->
  <footer id="footer">
    <div class="footer_copyright text-3">Richard Biz  © <span id="copyright-year"></span> <a href="privacy.html">Privacy Policy. Terms of use</a></div>

  <section class="content_map">
    <div class="google-map-api"> 
      <div id="map-canvas" class="gmap"></div> 
    </div>
  </section>
  </footer>

  <script src="js/script.js"></script>
  <script type="text/javascript"> 
  google_api_map_init(); 
  function google_api_map_init(){ 
    var map; 
    var coordData = new google.maps.LatLng(parseFloat(40.646197), parseFloat(-73.9724068,14)); 
    var marker; 
  
    var styleArray = [
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d3d3d3"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "color": "#808080"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b3b3b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "weight": 1.8
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d7d7d7"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ebebeb"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a7a7a7"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#efefef"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#696969"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#737373"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {},
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    }
]
               
    var markerIcon = { 
        url: "images/gmap_marker.png", 
        size: new google.maps.Size(42, 65), 
        origin: new google.maps.Point(0,0), 
        anchor: new google.maps.Point(21, 70)
    }; 
     
    
    function initialize() { 
      var mapOptions = { 
        zoom: 14, 
        center: coordData, 
        scrollwheel: false, 
        styles: styleArray 
      } 
    
      var contentString = "<div></div>"; 
      var infowindow = new google.maps.InfoWindow({ 
        content: contentString, 
        maxWidth: 200 
      }); 
       
      var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); 
      marker = new google.maps.Marker({ 
        map:map, 
        draggable:true, 
        position: coordData, 
        icon: markerIcon
      }); 
       
       
    } 
    google.maps.event.addDomListener(window, "load", initialize); 
  }            
  </script>
</body>
</html>