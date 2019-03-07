/**
 * Created by BRITENET on 07.02.2019.
 */
({
	loadCustomerPurchasedItems: function (component, event, helper) {
		let action = component.get('c.getCustomerPurchasedItems');

		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let customerPurchasedItems = component.get("v.customerPurchasedItems");
				let counter = 0;
				customerPurchasedItems = response.getReturnValue();
				component.set("v.customerPurchasedItems", customerPurchasedItems);

				for (let ii = 0; ii < customerPurchasedItems.length; ii++) {
					counter++;

				}

			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_while_loading_purchased_items'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_while_loading_purchased_items')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	setIsReviewed: function (component) {
		let action = component.get("c.setReviewAddedById");
		action.setParams({
			"orderItemId": component.get("v.selectedOrderItemId")
		})
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {

			}
		});
		$A.enqueueAction(action);
	},


})