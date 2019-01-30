/**
 * Created by BRITENET on 19.12.2018.
 */
({
    getShops: function(component, searchedShop) {
            var action = component.get("c.getSelectedShops");

            // Set parameters to search Shops in Controller.class.
            action.setParams(
                {
                "searchedShop": searchedShop
                });
            action.setCallback(this, function(response){
                var state = response.getState();
                if (state === "SUCCESS") {

                    // Set value on Component atributte.
                    component.set("v.selectedShops", response.getReturnValue());

                    window.setTimeout($A.getCallback(function() {
                                        var event = $A.get("e.c:ECS_ShopsLoaded");

                                        // Set parameter on Event.
                                        event.setParams({"shops": response.getReturnValue()});
                                        event.fire();
                                    }), 500);
                }
            });
            $A.enqueueAction(action);
        },
        showDetails: function(component, shopId) {
                  let eventShowDetails = $A.get("e.c:ECS_SelectedShopOnList");
                  console.log('eventDetails object______'+eventShowDetails);
                  eventShowDetails.setParams({"shopId": shopId});
                  eventShowDetails.fire();
              },
})