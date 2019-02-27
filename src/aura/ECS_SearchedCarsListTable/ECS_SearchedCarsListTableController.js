/**
 * Created by BRITENET on 26.02.2019.
 */
({
    onCartItemSelect: function(component, event, helper){
        let carId = event.getSource().get("v.value");
        let carsList = component.get("v.cars");
        let listOfSelectedIds = component.get("v.selectedCarsIds");
        let listOfSelectedCars = component.get("v.selectedCarsObjects");
        if(event.getSource().get("v.checked") && !listOfSelectedIds.includes(carId)){
            listOfSelectedIds.push(carId);
            listOfSelectedCars.push(carsList[component.get("v.selectedRowIndex")]);

        }else{
            for(let ii=0; ii<listOfSelectedIds.length; ii++){
                if(carId == listOfSelectedIds[ii]){
                    listOfSelectedIds.splice(ii, 1);
                    listOfSelectedCars.splice(ii, 1);
                }
            }
        }
        component.set("v.selectedCarsIds",listOfSelectedIds);
        console.log("selectedCarsIds       "+JSON.stringify(component.get("v.selectedCarsIds")));
        console.log("selectedCarsObj       "+JSON.stringify(component.get("v.selectedCarsObjects")));

    },
    addSelectedIds: function(component, event, helper){
        let idsList = component.get("v.selectedCarsIds");
        let selectedCarsObjects = component.get("v.selectedCarsObjects");
        component.getEvent("carsIdsListSelected").setParams({
            "carIds":idsList,
            "cars":selectedCarsObjects})
            .fire();

    },
    tableRowClicked: function(component, event, helper){
        component.set("v.selectedRowIndex", event.currentTarget.dataset.index);

    },

})