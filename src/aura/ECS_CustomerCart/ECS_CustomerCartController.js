/**
 * Created by BRITENET on 05.02.2019.
 */

({
    init: function (component, event, helper) {
            helper.loadCustomerCartItems(component);

    },

    deleteCartItem: function (component, event, helper) {
        let listOfSelectedIds = component.get("v.selectedCarsIds");
        let carId = event.getSource().get("v.value");
        if(!listOfSelectedIds.includes(carId)){
            listOfSelectedIds.push(carId);
            component.set("v.selectedCarsIds", listOfSelectedIds);
        }

        helper.removeCartItem(component, listOfSelectedIds);
    },

    redirectToDetailsPage: function(component, event, helper){
        let carId = event.getSource().get("v.value");
        let urlEvent = $A.get("e.force:navigateToURL");
           urlEvent.setParams({
             "url": "/search-cars?id="+carId
           });
           urlEvent.fire();
    },

    redirectToSearch: function(component, event, helper){
        let urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
              "url": "/search-cars"
            });
            urlEvent.fire();
    },

    redirectToOrders: function(component, event, helper){
        let urlEvent = $A.get("e.force:navigateToURL");
             urlEvent.setParams({
               "url": "/orders"
             });
             urlEvent.fire();
    },

    sendCarItemsToCheckout: function(component, event, helper){
        helper.proceedCheckout(component);
    },

})