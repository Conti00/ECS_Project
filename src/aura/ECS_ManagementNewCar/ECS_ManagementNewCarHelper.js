/**
 * Created by BRITENET on 14.02.2019.
 */

({
    onInit : function(component){
                 var action = component.get("c.hasCurrentUserAdminProfile");

                      action.setCallback(this, function(response){
                          var state = response.getState();
                          if(state === "SUCCESS"){
                              let isAdmin = response.getReturnValue();
                              console.log("is admin returnValue: "+ isAdmin);
                              component.set("v.isAdmin", isAdmin);
                          }
                          else{
                          }
                      })
                      $A.enqueueAction(action);
            },

    initializeNewRecord: function(component){
        component.find("newCarData").getNewRecord(
            "Product2", // sObject type (entityAPIName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.car");
                var error = component.get("v.recordError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    console.log("Record template initialized: " + rec.sobjectType);
                }
            })
        );
        component.set("v.newCarListPrice", null);
    },

    getYearOptions: function(component){
        var yearList = [];
        let beginYear = 1995;
        let endYear = ((new Date()).getFullYear()+1).toString();
        console.log("end year: "+endYear);
        for (let i = beginYear; i <= endYear; i++){
                yearList.push(i);
            }
        yearList.reverse();
        component.set("v.yearOptions", yearList);
    },

    createNewCar: function(component){
        var helper=this;
        component.find("newCarData").saveRecord(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                console.log("createNewCar helper!!");
                component.set("v.carId", saveResult.recordId);
                let newCarId = component.get("v.carId");
                let price = component.get("v.newCarListPrice");
                helper.createNewPricebookEntry(component, newCarId, price);
                component.find("carRecordToDelete").reloadRecord(true);
                component.set("v.newCarCreatingStage", 'carPictures');
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving new car, error: ' +
                             JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state +
                            ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    },

    createNewPricebookEntry: function(component, newCarId, newCarPrice){
        let action = component.get('c.setNewCarStandardPrice');
        action.setParams({
            'carId': newCarId,
            'carPrice': newCarPrice
        });

        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS")
            {
                console.log("Pricebookentry saved");

            }else{
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Error when creating pricebookentry');
                }else{
                    resultsToast.setParams({
                        "type": "error",
                        "title": "Error",
                        "message": "Error when creating pricebookentry"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },

     createAcar: function(component){
         component.find("carRecordToDelete").saveRecord(function(saveResult){
             if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                 console.log("createACar helper!!");
                 var resultsToast = $A.get("e.force:showToast");
                     resultsToast.setParams({
                         "title": "Saved",
                         "message": "The record was saved."
                     });
                     resultsToast.fire();

                  } else if (saveResult.state === "INCOMPLETE") {
                      console.log("User is offline, device doesn't support drafts.");
                  } else if (saveResult.state === "ERROR") {
                      console.log('Problem saving new car, error: ' +JSON.stringify(saveResult.error));
                  } else {
                      console.log('Unknown problem, state: ' + saveResult.state +', error: ' + JSON.stringify(saveResult.error));
                  }
         });

     },

     fetchPickListVal: function(component, fieldName, elementId) {
                 var action = component.get("c.getSelectOptions");
                 action.setParams({
                     "objObject": component.get("v.newCar"),
                     "fld": fieldName
                 });
                 var opts = [];
                 action.setCallback(this, function(response) {
                     if (response.getState() == "SUCCESS") {
                         var allValues = response.getReturnValue();

                         if (allValues != undefined && allValues.length > 0) {
                             opts.push({
                                 class: "optionClass",
                                 label: "Choose one option",
                                 value: ""
                             });
                         }
                         for (var i = 0; i < allValues.length; i++) {
                             opts.push({
                                 class: "optionClass",
                                 label: allValues[i],
                                 value: allValues[i]
                             });
                         }
                         component.set(elementId, opts);

                     }
                 });
                 $A.enqueueAction(action);
             },
})