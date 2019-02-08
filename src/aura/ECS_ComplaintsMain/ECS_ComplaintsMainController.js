/**
 * Created by BRITENET on 08.02.2019.
 */
({
        init: function (component, event, helper) {
                helper.loadCustomerPurchasedItems(component);
        },

        displayCaseModal : function(component, event, helper){
            component.set("v.displayCaseModal",true);
            let purchasedItems = event.getSource().get("v.value");
            component.set("v.selectedCarId",purchasedItems.Product2.Id);
            component.set("v.selectedCaseItemId",purchasedItems.Id);

        },

        hideCaseModal : function(component, event, helper){
            component.set("v.displayCaseModal",false);
        },

        onCaseAdded : function(component, event, helper) {
            component.set("v.displayCaseModal", false);
            helper.setIsCaseed(component);
            helper.loadCustomerPurchasedItems(component);
        },
})