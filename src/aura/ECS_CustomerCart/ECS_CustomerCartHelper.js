/**
 * Created by BRITENET on 05.02.2019.
 */
({
	loadCustomerCartItems: function (component, event) {
		let action = component.get('c.getCustomerCartItems');

		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let customerCartItems = component.get("v.customerCartItems");
				component.set("v.selectedCarsIds", []);
				let counter = 0;
				customerCartItems = response.getReturnValue();
				component.set("v.customerCartItems", customerCartItems);

				for (let ii = 0; ii < customerCartItems.length; ii++) {
					counter++;
					if (counter == customerCartItems.length) {
						component.set("v.isCheckoutEnabled", true);
					}
				}

			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_while_getting_cart_items'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_while_getting_cart_items')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	removeCartItem: function (component, carId) {
		let action = component.get('c.deleteCustomerCartItem');
		action.setParams({
			"listOfIds": carId
		});

		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				this.loadCustomerCartItems(component);
				component.set("v.carIdToSetMeetingDate", [])
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Item_deleted_from_cart'));
				} else {
					resultsToast.setParams({
						"type": "success",
						"title": "Success",
						"message": $A.get('$Label.c.ECS_Item_deleted_from_cart')
					});
					resultsToast.fire();
				}
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_when_deleting_cart_item'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_when_deleting_cart_item')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	proceedCheckout: function (component) {
		let action = component.get('c.proceedToCheckout');
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				this.loadCustomerCartItems(component);
				component.set("v.isCheckoutEnabled", false);

			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_while_getting_cart_items'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_while_getting_cart_items')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);

	},

	summarizeCartAmount: function (component) {
		let cart = component.get("v.customerCartItems");
		let totalAmount = 0;
		for (var ii = 0; ii < cart.length; ii++) {
			totalAmount += parseInt(cart[ii].carPrice);
		}
		component.set("v.cartTotalAmount", totalAmount);
	},

})