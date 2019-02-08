/**
 * Created by BRITENET on 07.02.2019.
 */
({
        init: function (component, event, helper) {
                helper.loadCustomerPurchasedItems(component);
        },

        displayReviewModal : function(component, event, helper){
            component.set("v.displayReviewModal",true);
            let purchasedItems = event.getSource().get("v.value");
            component.set("v.selectedCarId",purchasedItems.Product2.Id);
            component.set("v.selectedOrderItemId",purchasedItems.Id);

        },

        hideReviewModal : function(component, event, helper){
            component.set("v.displayReviewModal",false);
        },

        onReviewAdded : function(component, event, helper) {
            component.set("v.displayReviewModal", false);
            helper.setIsReviewed(component);
            helper.loadCustomerPurchasedItems(component);
        },
})