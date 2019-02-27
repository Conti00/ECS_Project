/**
 * Created by BRITENET on 26.02.2019.
 */
({
    loadPricebookEntries: function(component, pricebookId){
          var action = component.get('c.getPricebookEntriesByPricebookId');
          action.setParams({
              "pricebookId": pricebookId
          });

          action.setCallback(this, function(response){
              let state = response.getState();
              if (state === "SUCCESS")
              {
                  component.set("v.pricebookEntrys", response.getReturnValue());
                  console.log("recived: "+JSON.stringify(component.get("v.pricebookEntrys")));
              }else{
                  console.log("error loading pricebooksentries");
              }
          });
          $A.enqueueAction(action);
    },
    redirectToDetailsPage: function(component, carId){
//        let carId = event.getSource().get("v.value");
        console.log('button params-----:'+carId);
        let urlEvent = $A.get("e.force:navigateToURL");
           urlEvent.setParams({
             "url": "/lightning/n/car_details?id="+carId
           });
           urlEvent.fire();
    },
    redirectToCarDetailsComponent: function(component, carId){
           var evt = $A.get("e.force:navigateToComponent");
           evt.setParams({
               componentDef : "c:CD_CarDetails",
               componentAttributes: {
                   "carId" : carId
               }
           });
           evt.fire();
    },
    removePricebookEntry: function(component, pricebookEntryId){
          let priceEntriesList = [pricebookEntryId];
          var helper = this;
          var action = component.get('c.deletePricebookEntryByIds');
          action.setParams({
              "pbEntryId": priceEntriesList
          });

          action.setCallback(this, function(response){
              let state = response.getState();
              if (state === "SUCCESS")
              {
                  helper.loadPricebookEntries(component, component.get("v.pricebookId"));
                  var resultsToast = $A.get("e.force:showToast");
                  resultsToast.setParams({
                      "type": "success",
                      "message": 'Car removed from discount'
                  });
                  resultsToast.fire();
              }else{
                  console.log("error deleting pricebooksentries");
              }
          });
          $A.enqueueAction(action);

    },
})