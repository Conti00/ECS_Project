/**
 * Created by BRITENET on 07.02.2019.
 */
({
    doInit: function(component, event, helper){
            console.log('AddReview Init:');
            helper.onInit(component);

            let originalStringComment = component.get("v.reviewToUpdate.ECS_Comment__c");
            if(originalStringComment!=null){
            let StrippedStringComment = originalStringComment.replace(/(<([^>]+)>)/ig,"");
            component.set("v.reviewToUpdateComment",StrippedStringComment );}
        },
        onRecordUpdated: function(component, event, helper){

        },

        onSave: function(component, event, helper){
            let obj = component.get("v.newReview");
//            console.log(component.get('v.newReview.Id'));
//            let reviewId = component.get("v.reviewId").toString();

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
//                        helper.deleteReview(component,reviewId);
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

       onEdit: function(component, event, helper){
                   let obj = component.get("v.newReview");
       //            console.log(component.get('v.newReview.Id'));
       //            let reviewId = component.get("v.reviewId").toString();

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
                               let reviewId = component.get("v.reviewId");
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