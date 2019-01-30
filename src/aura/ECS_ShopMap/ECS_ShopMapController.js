/**
 * Created by BRITENET on 19.12.2018.
 */
({

   jsLoaded: function(component, event, helper) {
           var map = L.map('map', {zoomControl: true, tap: false, markerZoomAnimation: true})
                     .setView([50.871173, 20.621557], 12);
           L.tileLayer(
           'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
           {
                 attribution: 'Tiles © Esri'
           }).addTo(map);
           component.set("v.map", map);
           var popup = L.popup();
           function onMapClick(e) {
            popup
                   .setLatLng(e.latlng)
                   .setContent("You clicked the map at " + e.latlng.toString())
                   .openOn(map);
           }
           map.on('click', onMapClick);


       },

   shopsLoaded: function(component, event, helper) {
              map = component.get('v.map');
              var shops = event.getParam('shops');
              var markers = [];
              var markersPinned = component.get('v.markers');
              let eventShowDetails = $A.get("e.c:ECS_SelectedShopOnList");


              if(markersPinned.length > 0){
                  markersPinned.forEach(function(marker){
                      console.log(marker);
                      map.removeLayer(marker);
                  })
              }
   
              for (var i=0; i<shops.length; i++) {
                  var shop = shops[i];
                  if(typeof shop.ECS_Location__Latitude__s != 'undefined' && typeof shop.ECS_Location__Longitude__s != 'undefined'){
                      let latLng = [shop.ECS_Location__Latitude__s, shop.ECS_Location__Longitude__s];
                      let marker = L.marker(latLng, {shop: shop});
                      marker.bindPopup(shop.Name);
                      marker.on('click', function(e) {
                          helper.showShopDetails(component, eventShowDetails, marker.options.shop.Id);
                      })
                      markers.push(marker);
                  }
              }

              for(var i=0; i<markers.length; i++){
              console.log(markers[i]);
              }


              if(markers.length > 0){
                  markers.forEach(function(markerToPin){
                      map.addLayer(markerToPin);
                  })
                  map.panTo([shops[0].ECS_Location__Latitude__s, shops[0].ECS_Location__Longitude__s]);
              }

              component.set('v.markers', markers);

          },

   showShopLocalization: function(component, event, helper) {

           map = component.get('v.map');
           var shop = event.getParam('shop');
           var markers = [];
           var markersPinned = component.get('v.markers');
           if(markersPinned.length > 0){
               markersPinned.forEach(function(marker){
                   console.log(marker);
                   map.removeLayer(marker);
               })
           }

           if(typeof shop.ECS_Location__Latitude__s != 'undefined' || typeof shop.ECS_Location__Longitude__s != 'undefined'){
               var latLng = [shop.ECS_Location__Latitude__s, shop.ECS_Location__Longitude__s];
               var marker = L.marker(latLng, {shop: shop});
               marker.bindPopup(shop.Name);
//                marker.on('click', L.bind(helper.showShopDetails, null, component, shop.Id));
                marker.on('click', function(e) {
                                          helper.showShopDetails(component, eventShowDetails, marker.options.shop.Id);
                                      })
               markers.push(marker);
               map.addLayer(marker);
               map.panTo([shop.ECS_Location__Latitude__s, shop.ECS_Location__Longitude__s]);
           }
           component.set('v.markers', markers);
       },


})