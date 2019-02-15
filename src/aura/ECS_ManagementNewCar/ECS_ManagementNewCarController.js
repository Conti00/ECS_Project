/**
 * Created by BRITENET on 14.02.2019.
 */
({
    doInit: function(component, event, helper){
        helper.getYearOptions(component);
        helper.onInit(component);
        helper.fetchPickListVal(component, 'ECS_BodyStyle__c', 'v.bodyStyleOptions');
        helper.fetchPickListVal(component, 'ECS_FuelType__c', 'v.fuelTypeOptions');
        helper.fetchPickListVal(component, 'ECS_Transmission__c', 'v.transmissionOptions');
        helper.fetchPickListVal(component, 'ECS_BatteryCapacity__c', 'v.batteryCapacityOptions');
        helper.initializeNewRecord(component);

    },

    handleCreateRecord: function(component, event, helper) {
        var allValid = component.find('newCarFormField').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if (allValid) {
             helper.createNewCar(component);
        } else {
             let formErrorToast = $A.get("e.force:showToast");
             formErrorToast.setParams({
                  "type" : "error",
                  "message": "Provide values to all fields"
             });
             formErrorToast.fire();
        }

    },
    handleUploadFinished: function(component, event, helper){
        let rec = component.get("v.carToDelete");
        let uploadedFiles = event.getParam("files");
        let carId = component.get("v.carId");
        rec.fields.ECS_isCreatingCompleted__c.value = true;
        helper.createAcar(component);
        helper.initializeNewRecord(component);
        component.set("v.newCarCreatingStage", 'carDetails');
    },

    cancelNewCarCreation: function(component, event, helper){
        component.find("carRecordToDelete").deleteRecord($A.getCallback(function(deleteResult) {
             if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                 var resultsToast = $A.get("e.force:showToast");
                 resultsToast.setParams({
                      "title": "Canceled",
                      "type" : "info",
                      "message": "New Car Creation Canceled"
                 });
                helper.initializeNewRecord(component);
                component.set("v.newCarCreatingStage", 'carDetails');
                resultsToast.fire();
                console.log("Record is deleted.");
             } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
             } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
             } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
             }
        }));
    },

    redirectToHome: function(component, event, helper){
            let urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                  "url": "/"
                });
                urlEvent.fire();
        },

})