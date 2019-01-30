/**
 * Created by BRITENET on 20.12.2018.
 */
({
       showShopDetail: function(component, event) {
        let shopId = event.getParam("shopId");
        component.set("v.selectedShopId", shopId);
        console.log(shopId);
        var action = component.get("c.getShopDetailsById");
        action.setParams({
            "shopId": shopId
        });

       action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().Id);
                component.set("v.shop", response.getReturnValue());
                component.set("v.isRendered", true);
            }
            else{
                 var clearDetails = component.get("v.shop");
                 clearDetails.Name = '';
                 clearDetails.Website = '';
                 clearDetails.Phone = '';
                 clearDetails.BillingCity = '';
                 clearDetails.Id = '';
                 component.set("v.shop", clearDetails);
                 component.set("v.isRendered", false);
                 }
        });
        $A.enqueueAction(action);
    },

       navigationToViewRecord : function(component, event, helper) {

           let shopId = component.get("v.selectedShopId");
//           console.log(shopId);
//           window.open('/'+shopId,'_blank');


           component.find("navId").navigate({
               type: 'standard__recordPage',
               attributes: {
                   recordId : shopId,
                   actionName: 'view',
                   objectApiName: 'Account',
               }}, true);
},


       navigationToEditRecord : function(component, event, helper) {

           let shopId = component.get("v.selectedShopId");
                      console.log(shopId);

           component.find("navId").navigate({
               type: 'standard__recordPage',
               attributes: {
                   recordId : shopId,
                   actionName: 'edit',
                   objectApiName: 'Account'
               }}, true);}
})