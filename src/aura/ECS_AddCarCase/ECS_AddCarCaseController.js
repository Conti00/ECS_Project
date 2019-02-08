/**
 * Created by BRITENET on 08.02.2019.
 */
({
    doInit: function(component, event, helper){
            console.log('AddCase Init:');
            helper.onInit(component, event, helper);
        },


        onRecordUpdated: function(component, event, helper){

        },

        onSave: function(component, event, helper){
            let obj = component.get("v.newCase");
            console.log('on rewiev save controller');
            component.find("service").saveRecord(function(saveResult) {
                console.log('save result: '+saveResult.state);

                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    var resultsToast = $A.get("e.force:showToast");
                    if ($A.util.isUndefined(resultsToast)){
                        alert('Case Saved successfully.');
                    }else{
                        resultsToast.setParams({
                            "title": "Saved",
                             "type": "success",
                            "message": "Case Saved successfully."
                        });
                        resultsToast.fire();
                    }
                    helper.onInit(component);
                    let CaseSavedEvent = component.getEvent("CaseAdded");
                    CaseSavedEvent.fire();
                }
                else {
                    console.log(JSON.stringify(saveResult.error));
                }
            });
        },

})