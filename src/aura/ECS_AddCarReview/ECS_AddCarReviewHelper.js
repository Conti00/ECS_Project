/**
 * Created by BRITENET on 07.02.2019.
 */
({
    onInit: function(component){
            component.find("service").getNewRecord(
                "ECS_Review__c", // sObject type (entityAPIName)
                null,      // recordTypeId
                false,     // skip cache?
                $A.getCallback(function() {
                    let error = component.get("v.recordError");
                    let newReview = component.get("v.newReview");
                    let carId = component.get("v.carId").toString();
                    newReview.ECS_Product__c = carId;
                    component.set("v.newReview", newReview);
                    console.log('callback: '+JSON.stringify(component.get("v.newReview")));
                    console.log('service: '+JSON.stringify(component.find("service")));
                    if(error || (newReview === null)) {
                        console.log("Error initializing record template: " + error);
                    }
                })
            );
        },

     deleteReview: function (component, reviewId) {
            		var action = component.get('c.deleteReviewById');
            		action.setParams({
            			"reviewId": reviewId
            		})
            		action.setCallback(this, function (response) {
            			var state = response.getState();
            			if (state === "SUCCESS") {
            				let deleteReviewSuccess = response.getReturnValue();
            				if (deleteReviewSuccess === 'Success') {
            					this.getProductReviews(component);
            					var resultsToast = $A.get("e.force:showToast");
            					if ($A.util.isUndefined(resultsToast)) {

            					} else {

            					}
            				}
            			} else {
            				var resultsToast = $A.get("e.force:showToast");
            				if ($A.util.isUndefined(resultsToast)) {
            					alert('Error when deleting review');
            				} else {
            					resultsToast.setParams({
            						"title": "Error",
            						"message": "Error when deleting review"
            					});
            					resultsToast.fire();
            				}
            			}
            		});
            		$A.enqueueAction(action);
            	},
})