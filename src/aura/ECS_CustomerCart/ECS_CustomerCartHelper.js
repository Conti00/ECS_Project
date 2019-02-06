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
//                    if(customerCartItems[ii].hasOwnProperty('meetingDate')){
                        counter++;
//                    }
                    if(counter == customerCartItems.length){
                        component.set("v.isCheckoutEnabled", true);
                    }
                }
                console.log('after load: '+JSON.stringify(component.get("v.selectedCarsIds")));
                console.log('cart items: '+JSON.stringify(component.get("v.customerCartItems")));
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

    setMeetingDate: function (component, listOfIds, meetingDate) {
        let action = component.get('c.setCartItemMeetingDate');

        action.setParams({
            "listOfCarsIds": listOfIds,
            "meetingDate": meetingDate
        });

        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS")
            {
                this.loadCustomerCartItems(component);
                component.set("v.meetingDate", null);
//                component.set("v.selectedCarsIds", []);
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Item meeting date was set');
                }else{
                    resultsToast.setParams({
                        "type": "success",
                        "title": "Success",
                        "message": "Item meeting date was set"
                    });
                    resultsToast.fire();
                }
            }else{
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Error when setting meeting date');
                }else{
                    resultsToast.setParams({
                        "type": "error",
                        "title": "Error",
                        "message": "Error when setting meeting date"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
        component.find("meetingDatePicker").hide();
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