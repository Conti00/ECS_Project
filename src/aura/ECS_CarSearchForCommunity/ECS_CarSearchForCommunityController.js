/**
 * Created by BRITENET on 01.02.2019.
 */
({
    onSearchedCarsRecived: function(component, event, helper){
        component.find("carList").set("v.cars", event.getParams().carsToDisplay);
    },
    onCarSelected: function(component, event, helper){
        component.set("v.selectedCarId", event.getParam("carId"));
        component.set("v.selectedCar", event.getParam("car"));
        component.set("v.productCardShown", event.getParam("carSelected"));
    },

    backToSearch : function(component, event, helper){
        component.set("v.productCardShown",false);
    },

    hideDiscountModal : function(component, event, helper){
        if(component.get('v.displayModal')){
        component.set('v.displayModal',false);
        }
        else{
            component.set('v.displayModal', true);

        }
        component.set("v.typeOfAction",'Discount');

    },
    
     hideGalleryModal : function(component, event, helper){
            if(component.get('v.displayModal')){
            component.set('v.displayModal',false);
            }
            else{
                component.set('v.displayModal', true);
    
            }
            component.set("v.typeOfAction",'Gallery');
    
        }
})