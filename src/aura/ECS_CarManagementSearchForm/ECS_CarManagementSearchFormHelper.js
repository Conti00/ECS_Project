/**
 * Created by BRITENET on 01.02.2019.
 */
({
    getYearOptions: function(component){
        var yearList = [];
        let beginYear = 2010;
        let endYear = ((new Date()).getFullYear()+1).toString();
        for (let i = beginYear; i <= endYear; i++){
                yearList.push(i);
            }
        yearList.reverse();
        component.set("v.yearOptions", yearList);
    },
    getCars: function(component, searchedCar){
        var action = component.get("c.getCarsList");
        action.setParams({
            "searchedCar": searchedCar
        })
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.cars", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    fetchPickListVal: function(component, fieldName, elementId) {
            var action = component.get("c.getSelectOptions");
            action.setParams({
                "objObject": component.get("v.searchedCar"),
                "fld": fieldName
            });
            var opts = [];
            action.setCallback(this, function(response) {
                if (response.getState() == "SUCCESS") {
                    var allValues = response.getReturnValue();

                    if (allValues != undefined && allValues.length > 0) {
                        opts.push({
                            class: "optionClass",
                            label: "All",
                            value: ""
                        });
                    }
                    for (var i = 0; i < allValues.length; i++) {
                        opts.push({
                            class: "optionClass",
                            label: allValues[i],
                            value: allValues[i]
                        });
                    }
                    component.set(elementId, opts);

                }
            });
            $A.enqueueAction(action);
        },


    clearSearchForm:function(component, event, helper){
        console.log('clear');

         var searchedCar = component.get("v.searchedCar");
                    searchedCar.Name = '';
                    searchedCar.ECS_VinNumber__c = '';
                    searchedCar.ECS_Model__c = '';
                    searchedCar.ECS_ProductionYear__c = null;
                    searchedCar.ECS_BodyStyle__c = null;
                    searchedCar.ECS_FuelType__c = null;
                    searchedCar.ECS_Transmission__c = null;
                    component.set("v.searchedCar", searchedCar);

    },



})