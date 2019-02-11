/**
 * Created by BRITENET on 11.02.2019.
 */

({
    createNewDiscount: function(component){
        let carId = component.get("v.carId");
        let price = parseInt(component.get("v.carNewPrice"));
        let startDate = component.get("v.discountStartDate");
        let endDate = component.get("v.discountEndDate");
        let discountName = component.get("v.discountName");
        let discountedAmount = component.get("v.amountDiscountValue");
        let percentDiscount = component.get("v.percentDiscountValue");
        console.log('id: '+carId+' price: '+price+' start: '+startDate+' end: '+endDate);

        let action = component.get("c.setSingleCarDiscount");
        action.setParams({
            "carId" : carId,
            "discountedPrice" : price,
            "startDate" : startDate,
            "endDate" : endDate,
            "discountName" : discountName,
            "discountedAmount" : discountedAmount,
            "percentDiscount" : percentDiscount
        });
        action.setCallback(this, function(response){
              let state = response.getState();
              if (state === "SUCCESS")
              {
//                let onCompleteEvent = component.getEvent("onSingleCarDiscountCreated");
//                component.getEvent("onSingleCarDiscountCreated").fire();
            let resultsToast = $A.get("e.force:showToast");
                            if ($A.util.isUndefined(resultsToast)){
                                alert('New Price created');
                            }else{
                                resultsToast.setParams({
                                    "type": "success",
                                    "title": "Success",
                                    "message": "New Price created"
                                });
                                resultsToast.fire();
                            }
                        }else{
                            let resultsToast = $A.get("e.force:showToast");
                            if ($A.util.isUndefined(resultsToast)){
                                alert('Error when creating discount');
                            }else{
                                resultsToast.setParams({
                                    "type": "error",
                                    "title": "Error",
                                    "message": "Error when  creating discount"
                                });
                                resultsToast.fire();
                            }
                        }
                    });

        $A.enqueueAction(action);
    },

    getLowestPrice: function(component, carId){
                  var action = component.get('c.getCarCurrentLowestPrice');
                  action.setParams({
                      'carId' : carId
                  });

                  action.setCallback(this, function(response){
                      let state = response.getState();
                      console.log("response: "+response.getState());
                      if (state === "SUCCESS")
                      {
                          console.log("return lowest price value: "+response.getReturnValue());
                          component.set("v.carCurrentLowestPrice", response.getReturnValue());
                      }else{

                      }
                  });
                  $A.enqueueAction(action);
            },



})