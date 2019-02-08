/**
 * Created by BRITENET on 08.02.2019.
 */
({
    loadCustomerPurchasedItems: function (component, event, helper) {
            let action = component.get('c.getCustomerPurchasedItems');

            action.setCallback(this, function(response){
                let state = response.getState();
                if (state === "SUCCESS")
                {
                    let customerPurchasedItems = component.get("v.customerPurchasedItems");
                    let counter = 0;
                    customerPurchasedItems = response.getReturnValue();
                    component.set("v.customerPurchasedItems", customerPurchasedItems);

                    for(let ii=0; ii < customerPurchasedItems.length; ii++){
                            counter++;

                    }

                    console.log('cart items: '+JSON.stringify(component.get("v.customerPurchasedItems")));
                }else{
                    let resultsToast = $A.get("e.force:showToast");
                    if ($A.util.isUndefined(resultsToast)){
                        alert('Error when loading cart items');
                    }else{
                        resultsToast.setParams({
                            "type": "error",
                            "title": "Error",
                            "message": "Error when loading purchased items"
                        });
                        resultsToast.fire();
                    }
                }
            });
            $A.enqueueAction(action);
    },

    setIsCaseed : function(component){
         var action = component.get("c.setCaseAddedById");
               action.setParams({
                   "CaseItemId": component.get("v.selectedCaseItemId")
               })
               action.setCallback(this, function(response){
                   var state = response.getState();
                   if(state === "SUCCESS"){

                   }
               });
               $A.enqueueAction(action);
           },





})