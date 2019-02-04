/**
 * Created by BRITENET on 01.02.2019.
 */
({
    onSearchedCarsRecived: function(component, event, helper){
        component.find("carList").set("v.cars", event.getParams().carsToDisplay);
    },
    onCarSelected: function(component, event, helper){
        component.set("v.selectedCarId", event.getParam("carId"));
    },
})