/**
 * Created by BRITENET on 13.02.2019.
 */
({

	onInit: function (component) {
		let action = component.get("c.getCar");

		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let car = response.getReturnValue();
				component.set("v.car", car);
				var action = component.get('c.getCarCurrentLowestPrice');
				action.setParams({
					'carId': car.Product2.Id
				});

				action.setCallback(this, function (response) {
					let state = response.getState();
					if (state === "SUCCESS") {
						component.set("v.carCurrentLowestPrice", response.getReturnValue());
					} else {

					}
				});
				$A.enqueueAction(action);
				var action = component.get('c.getCarStandardPrice');
				action.setParams({
					'carId': car.Product2.Id
				});

				action.setCallback(this, function (response) {
					let state = response.getState();
					if (state === "SUCCESS") {
						component.set("v.carStandardPrice", response.getReturnValue());
					} else {
						let resultsToast = $A.get("e.force:showToast");
						if ($A.util.isUndefined(resultsToast)) {
							alert($A.get('$Label.c.ECS_Error_while_getting_price'));
						} else {
							resultsToast.setParams({
								"type": "error",
								"title": "Error",
								"message": $A.get('$Label.c.ECS_Error_while_getting_price')
							});
							resultsToast.fire();
						}
					}
				});
				$A.enqueueAction(action);

			} else {}
		})
		$A.enqueueAction(action);
	},

	getOrgUrl: function (component) {
		let orgBaseUrl = component.get("c.getBaseUrlString");
		orgBaseUrl.setParams({});

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
})