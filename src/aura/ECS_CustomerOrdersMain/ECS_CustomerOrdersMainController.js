/**
 * Created by BRITENET on 06.02.2019.
 */

({
    doInit: function(component, event, helper){
        console.log('init selectedorderid: '+ component.get("v.selectedOrderId"));
        helper.loadCustomerOrdersItems(component);
    },
    handleOrderItemSelected: function(component, event, helper){
//        console.log("main: transfer object: "+event.getParam("transferredObject"));
        let transfered = event.getParam("transferredObject");
        component.set("v.selectedOrderDetailItem", transfered);
//        console.log('transfered: '+JSON.stringify(component.get("v.selectedOrderDetailItem")));
        component.set("v.selectedOrderId", transfered.Id);
    },
    handleSelectedOrderIdChange: function(component, event, helper){
        console.log('selectedorderid: '+ component.get("v.selectedOrderId"));
        component.set("v.orderItemsVisible", false);
        component.set("v.orderItemsVisible", true);
    },
})