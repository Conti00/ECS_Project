/**
 * Created by BRITENET on 26.02.2019.
 */

({
    createNewDiscount: function(component){
        let carIds = JSON.stringify(component.get("v.carIds"));
//        let price = parseInt(component.get("v.carNewPrice"));
        let startDate = component.get("v.discountStartDate");
        let endDate = component.get("v.discountEndDate");
        let discountName = component.get("v.discountName");
        let percent = component.get("v.percentDiscountValue");
        let amount = component.get("v.amountDiscountValue");
        console.log('CREATE NEW DISC: id: '+carIds+' percnt: '+percent+' start: '+startDate+' end: '+endDate+' name: '+discountName+' amount '+amount);

        let action = component.get("c.createNewDiscount");
        action.setParams({
            "carIds" : carIds,
            "discountedAmount" : amount,
            "percentDiscount" : percent,
            "startDate" : startDate,
            "endDate" : endDate,
            "discountName" : discountName
        });
        action.setCallback(this, function(response){
              let state = response.getState();
              if (state === "SUCCESS")
              {
                component.getEvent("onNewDiscountCreated").fire();
                let carsCovered = response.getReturnValue();
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "type": "success",
                    "message": 'New discount created. Cars covered: '+carsCovered
                });
                resultsToast.fire();

              }else{

              }
        });
        $A.enqueueAction(action);
        component.set("v.selectedCars",null);
        component.set("v.carIds",null);
    },

    loadCarsWithStandardPrice: function(component){
        let selectedCarIds = component.get("v.carIds");
        let action = component.get("c.getCarsWithStandardPrice");
        action.setParams({
            "carIds" : selectedCarIds
        });
        action.setCallback(this, function(response){
              let state = response.getState();
              if (state === "SUCCESS")
              {
                  component.set("v.selectedCarsWithPriceObjects", response.getReturnValue());
                  console.log("helper recived: "+JSON.stringify(component.get("v.selectedCarsWithPriceObjects")));
              }else{

              }
        });
        $A.enqueueAction(action);
    },


})