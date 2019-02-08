/**
 * Created by BRITENET on 01.02.2019.
 */
({
    doInit: function(component, event, helper){
            helper.getYearOptions(component);
             helper.getCars(component, component.get("v.searchedCar"));
    },

    clearForm: function(component, event, helper){
            var searchedCar = component.get("v.searchedCar");
            searchedCar.Name = '';
            searchedCar.ECS_VinNumber__c = '';
            searchedCar.ECS_Model__c = '';
            searchedCar.ECS_YearProduction__c = '';
            component.set("v.searchedCar", searchedCar);
    },

    searchCars: function(component, event, helper){
            var searchedCar = component.get("v.searchedCar");
            helper.getCars(component, searchedCar);
    },

    onCarsChange: function(component, event, helper){
        var searchedCar = component.get("v.searchedCar");
        console.log(JSON.stringify(searchedCar));
            console.log("recived cars: "+JSON.stringify(component.get("v.cars")));
            var onRecivedCarsEvent = component.getEvent("oncarsrecived");
            onRecivedCarsEvent.setParams({
                "carsToDisplay":component.get("v.cars")
            });
            onRecivedCarsEvent.fire();
    },
})