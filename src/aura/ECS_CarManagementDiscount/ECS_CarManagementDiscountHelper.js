/**
 * Created by BRITENET on 11.02.2019.
 */

({
	createNewDiscount: function (component) {
		let carId = component.get("v.carId");
		let price = parseInt(component.get("v.carNewPrice"));
		let startDate = component.get("v.discountStartDate");
		let endDate = component.get("v.discountEndDate");
		let discountName = component.get("v.discountName");
		let discountedAmount = component.get("v.amountDiscountValue");
		let percentDiscount = component.get("v.percentDiscountValue");

		let action = component.get("c.setSingleCarDiscount");
		action.setParams({
			"carId": carId,
			"discountedPrice": price,
			"startDate": startDate,
			"endDate": endDate,
			"discountName": discountName,
			"discountedAmount": discountedAmount,
			"percentDiscount": percentDiscount
		});
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_New_Price_Created'));
				} else {
					resultsToast.setParams({
						"type": "success",
						"title": "Success",
						"message": $A.get('$Label.c.ECS_New_Price_Created')
					});
					resultsToast.fire();
				}
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_when_creating_discount'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_when_creating_discount')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	getLowestPrice: function (component) {
		let carId = component.get('v.car.Id')
		var action = component.get('c.getCarCurrentLowestPrice');
		action.setParams({
			'carId': carId
		});

		action.setCallback(this, function (response) {
			let state = response.getState();
			console.log("response: " + response.getState());
			if (state === "SUCCESS") {
				component.set("v.carCurrentLowestPrice", response.getReturnValue());
			} else {
				resultsToast.setParams({
					"type": "error",
					"title": "Error",
					"message": $A.get('$Label.c.ECS_Error_when_creating_discount')
				});
				resultsToast.fire();

			}
		});
		$A.enqueueAction(action);
	},


})