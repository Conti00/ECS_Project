/**
 * Created by BRITENET on 01.02.2019.
 */
({
     doInit: function(component, event, helper){
             helper.onInit(component);

                 setTimeout(function() {
                             $('.carousel').slick({
                                 autoplay: true,
                                 autoplaySpeed: 3000,
                                 arrows: false,
                                 dots: true,
                                 infinite: true,
                                 speed: 2000,
                                 slidesToShow: 1,
                                 adaptiveHeight: true,
                                 draggable: true,

                             });
                         }, 0);


     }



})