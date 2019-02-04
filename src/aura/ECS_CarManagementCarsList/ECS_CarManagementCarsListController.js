/**
 * Created by BRITENET on 01.02.2019.
 */
({
    onCarsChange: function(component, event, helper){
        console.log("CarList złapał samochody: "+JSON.stringify(component.get("v.cars")));

    },
})