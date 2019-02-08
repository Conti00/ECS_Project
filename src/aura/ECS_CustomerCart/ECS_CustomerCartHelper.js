/**
 * Created by BRITENET on 05.02.2019.
*/
({
    loadCustomerCartItems: function (component, event, helper) {
        let action = component.get('c.getCustomerCartItems');

        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS")
            {
                let customerCartItems = component.get("v.customerCartItems");
                component.set("v.selectedCarsIds", []);
                let counter = 0;
                customerCartItems = response.getReturnValue();
                component.set("v.customerCartItems", customerCartItems);

                for(let ii=0; ii < customerCartItems.length; ii++){
                        counter++;
                    if(counter == customerCartItems.length){
                        component.set("v.isCheckoutEnabled", true);
                    }
                }

            }else{
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Error when loading cart items');
                }else{
                    resultsToast.setParams({
                        "type": "error",
                        "title": "Error",
                        "message": "Error when loading cart items"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },

    removeCartItem: function (component, carId) {
        console.log('items: '+JSON.stringify(component.get("v.selectedCarsIds")));
        console.log('items to delete: '+component.get("v.selectedCarsIds").length);
        let action = component.get('c.deleteCustomerCartItem');

        action.setParams({
            "listOfIds": carId
        });

        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS")
            {
                this.loadCustomerCartItems(component);
                component.set("v.carIdToSetMeetingDate", [])
                console.log('IDS after delete: '+JSON.stringify(component.get("v.carIdToSetMeetingDate")));

                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Item deleted from cart');
                }else{
                    resultsToast.setParams({
                        "type": "success",
                        "title": "Success",
                        "message": "Item deleted from cart"
                    });
                    resultsToast.fire();
                }
            }else{
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Error when deleting cart item');
                }else{
                    resultsToast.setParams({
                        "type": "error",
                        "title": "Error",
                        "message": "Error when deleting cart item"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },

    proceedCheckout: function(component){
        console.log('checkout');
        let action = component.get('c.proceedToCheckout');

        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS")
            {
                console.log("success");
                this.loadCustomerCartItems(component);
                component.set("v.isCheckoutEnabled",false);

            }else{
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Error');
                }else{
                    resultsToast.setParams({
                        "type": "error",
                        "title": "Error",
                        "message": "Error when loading cart items"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);

    },

})