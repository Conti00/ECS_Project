/**
 * Created by BRITENET on 06.02.2019.
 */

({
    doInit: function(component, event, helper){
        helper.loadCustomerOrdersItems(component);
    },
    handleOrderItemSelected: function(component, event, helper){
        let transfered = event.getParam("transferredObject");
        component.set("v.selectedOrderDetailItem", transfered);
        component.set("v.selectedOrderId", transfered.Id);
    },
    handleSelectedOrderIdChange: function(component, event, helper){
        component.set("v.orderItemsVisible", false);
        component.set("v.orderItemsVisible", true);
    },
})