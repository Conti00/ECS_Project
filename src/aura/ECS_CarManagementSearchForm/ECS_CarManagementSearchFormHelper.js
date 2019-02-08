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
})