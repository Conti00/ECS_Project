/**
 * Created by BRITENET on 07.02.2019.
 */
({
    doInit: function(component, event, helper){
            console.log('AddReview Init:');
            helper.onInit(component);
        },
        onRecordUpdated: function(component, event, helper){

        },

        onSave: function(component, event, helper){
            let obj = component.get("v.newReview");
            let reviewId = component.get("v.reviewId").toString();

            component.find("service").saveRecord(function(saveResult) {
                console.log('save result: '+saveResult.state);

                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    var resultsToast = $A.get("e.force:showToast");
                    if ($A.util.isUndefined(resultsToast)){
                        alert('Review Saved successfully.');
                    }else{
                        resultsToast.setParams({
                            "title": "Saved",
                             "type": "success",
                            "message": "Review Saved successfully."
                        });
                        resultsToast.fire();
                        helper.deleteReview(component,reviewId);
                    }
                    helper.onInit(component);
                    let ReviewSavedEvent = component.getEvent("ReviewAdded");
                    ReviewSavedEvent.fire();
                    console.log('event fire');
                }
                else {
                    console.log(JSON.stringify(saveResult.error));
                }
            });
        },



})