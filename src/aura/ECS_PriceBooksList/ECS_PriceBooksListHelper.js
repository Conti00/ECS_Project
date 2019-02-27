/**
 * Created by BRITENET on 26.02.2019.
 */

({
//    loadPricebooks: function(component){
//          var action = component.get('c.getCarsPricebooks');
//
//          action.setCallback(this, function(response){
//              let state = response.getState();
//              if (state === "SUCCESS")
//              {
//                  console.log(JSON.stringify(response.getReturnValue()));
//                  component.set("v.pricebooksItems", response.getReturnValue());
//              }else{
//                  console.log("error loading pricebooks");
//              }
//          });
//          $A.enqueueAction(action);
//    },
    loadPricebooks: function(component){
          var action = component.get('c.getDiscountsWithCoveredProducts');

          action.setCallback(this, function(response){
              let state = response.getState();
              if (state === "SUCCESS")
              {
                  console.log(JSON.stringify(response.getReturnValue()));
                  component.set("v.pricebooksItems", response.getReturnValue());
              }else{
                  console.log("error loading pricebooks");
              }
          });
          $A.enqueueAction(action);
    },
    deleteSelectedDiscounts: function(component){
          var helper = this;
          var action = component.get('c.deleteDiscounts');
          action.setParams({
              "discountsIds" : component.get("v.selectedPricebooksIds")
          })

          action.setCallback(this, function(response){
              let state = response.getState();
              if (state === "SUCCESS")
              {
                  console.log(JSON.stringify(response.getReturnValue()));
                  helper.closeDeleteDiscountModal(component);
                  helper.loadPricebooks(component);
                  component.set("v.selectedPricebookId", null);
                  let resultsToast = $A.get("e.force:showToast");
                  resultsToast.setParams({
                      "type": "success",
                      "message": 'Succesfully deleted discounts: '+response.getReturnValue()
                  });
                  resultsToast.fire();
              }else{
                  console.log("error deleting discounts");
              }
          });
          $A.enqueueAction(action);
    },
    closeDeleteDiscountModal: function(component){
        component.set("v.selectedPricebooksIds",[]);
        component.find('deletePricebookModal').hide();
    },
})