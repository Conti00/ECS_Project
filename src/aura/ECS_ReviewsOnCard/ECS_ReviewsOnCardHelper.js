/**
 * Created by BRITENET on 11.03.2019.
 */
({
    onInit: function (component) {
    		let action = component.get("c.hasCurrentUserAdminProfile");
    		action.setCallback(this, function (response) {
    			let state = response.getState();
    			if (state === "SUCCESS") {
    				let isAdmin = response.getReturnValue();
    				component.set("v.isAdmin", isAdmin);
    			}
    		})
    		$A.enqueueAction(action);
    	},

    	getOrgUrl: function (component) {
    		let orgBaseUrl = component.get("c.getBaseUrlString");
    		orgBaseUrl.setCallback(this, function (response) {
    			let state = response.getState();
    			if (state === "SUCCESS") {
    				component.set("v.orgUrl", response.getReturnValue());
    			} else {
    				let resultsToast = $A.get("e.force:showToast");
    				if ($A.util.isUndefined(resultsToast)) {
    					alert($A.get('$Label.c.ECS_Error_while_getting_url'));
    				} else {
    					resultsToast.setParams({
    						"type": "error",
    						"title": "Error",
    						"message": $A.get('$Label.c.ECS_Error_while_getting_url')
    					});
    					resultsToast.fire();
    				}
    			}
    		});
    		$A.enqueueAction(orgBaseUrl);
    	},

    	getProductReviews: function (component) {
        		let action = component.get('c.getProductReviewsById');
        		action.setParams({
        			carId: String(component.get("v.car.Id"))
        		})

        		action.setCallback(this, function (response) {
        			let state = response.getState();
        			if (state === "SUCCESS") {
        				let productReviews = response.getReturnValue();
        				component.set('v.productReviews', productReviews);
        			} else {
        				let resultsToast = $A.get("e.force:showToast");
        				if ($A.util.isUndefined(resultsToast)) {
        					alert($A.get('$Label.c.ECS_Error_while_loading_reviews'));
        				} else {
        					resultsToast.setParams({
        						"title": "Error",
        						"message": $A.get('$Label.c.ECS_Error_while_loading_reviews')
        					});
        					resultsToast.fire();
        				}
        			}
        		});
        		$A.enqueueAction(action);
        	},

        	deleteReview: function (component, event) {
        		let reviewId = event.getSource().get("v.value");
        		let action = component.get('c.deleteReviewById');
        		action.setParams({
        			"reviewId": reviewId
        		})
        		action.setCallback(this, function (response) {
        			let state = response.getState();
        			if (state === "SUCCESS") {
        				let deleteReviewSuccess = response.getReturnValue();
        				if (deleteReviewSuccess === 'Success') {
        					this.getProductReviews(component);
        					let resultsToast = $A.get("e.force:showToast");
        					if ($A.util.isUndefined(resultsToast)) {
        						alert($A.get('$Label.c.ECS_Review_was_deleted'));
        					} else {
        						resultsToast.setParams({
        							"title": "Success",
        							"message": $A.get('$Label.c.ECS_Review_was_deleted')
        						});
        						resultsToast.fire();
        					}
        				}
        			} else {
        				let resultsToast = $A.get("e.force:showToast");
        				if ($A.util.isUndefined(resultsToast)) {
        					alert($A.get('$Label.c.ECS_Error_while_deleting_review'));
        				} else {
        					resultsToast.setParams({
        						"title": "Error",
        						"message": $A.get('$Label.c.ECS_Error_while_deleting_review')
        					});
        					resultsToast.fire();
        				}
        			}
        		});
        		$A.enqueueAction(action);
        	},

        	editReview: function (component, event) {
        		let productReview = event.getSource().get("v.value");
        		component.set("v.productReviewToUpdate", productReview);
        		if (component.get("v.editModal") == true ? component.set('v.editModal', false) : component.set('v.editModal', true));

        	},

    getCurrentUser: function (component) {
    		let action = component.get("c.getCurrentUser");
    		action.setCallback(this, function (response) {
    			let state = response.getState();
    			if (state === "SUCCESS") {
    				component.set("v.currentUser", response.getReturnValue());
    			} else {
    				let resultsToast = $A.get("e.force:showToast");
    				if ($A.util.isUndefined(resultsToast)) {
    					alert($A.get('$Label.c.ECS_Error_while_getting_user_info'));
    				} else {
    					resultsToast.setParams({
    						"type": "error",
    						"title": "Error",
    						"message": $A.get('$Label.c.ECS_Error_while_getting_user_info')
    					});
    				}

    			}
    		});
    		$A.enqueueAction(action);

    	},
})