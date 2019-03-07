/**
 * Created by BRITENET on 04.02.2019.
 */

({
	addCarToCart: function (component, carObj) {
		var action = component.get('c.addCarToUserCart');
		action.setParams({
			car: carObj
		});


		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let resultsToast = $A.get("e.force:showToast");
				resultsToast.setParams({
					"type": "success",
					"message": "Car added to cart"
				});
				resultsToast.fire();
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert('Error adding to cart');
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": "Car already in cart"
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	getOrgUrl: function (component) {
		var orgBaseUrl = component.get("c.getBaseUrlString");
		orgBaseUrl.setParams({

		});
		orgBaseUrl.setCallback(this, function (response) {
			var state = response.getState();
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

	getStandardPrice: function (component, carId) {
		var action = component.get('c.getCarStandardPrice');
		action.setParams({
			'carId': carId
		});

		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.carStandardPrice", response.getReturnValue());
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert('Error while getting price1');
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": "Error while getting price1"
					});
					resultsToast.fire();
				}

			}
		});
		$A.enqueueAction(action);
	},

	getLowestPrice: function (component, carId) {
		var action = component.get('c.getCarCurrentLowestPrice');
		action.setParams({
			'carId': carId
		});

		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.carCurrentLowestPrice", response.getReturnValue());
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert('Error while getting price2');
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": "Error while getting price2"
					});
					resultsToast.fire();
				}

			}
		});
		$A.enqueueAction(action);
	},
})