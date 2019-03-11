/**
 * Created by BRITENET on 14.02.2019.
 */

({

	initializeNewRecord: function (component) {
		component.find("newCarData").getNewRecord(
			"Product2",
			null,
			false,
			$A.getCallback(function () {
				let rec = component.get("v.car");
				let error = component.get("v.recordError");
			})
		);
		component.set("v.newCarListPrice", null);
	},

	getYearOptions: function (component) {
		let yearList = [];
		let beginYear = 1995;
		let endYear = ((new Date()).getFullYear() + 1).toString();
		for (let i = beginYear; i <= endYear; i++) {
			yearList.push(i);
		}
		yearList.reverse();
		component.set("v.yearOptions", yearList);
	},

	createNewCar: function (component) {
		let helper = this;
		component.find("newCarData").saveRecord(function (saveResult) {
			if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
				component.set("v.carId", saveResult.recordId);
				let newCarId = component.get("v.carId");
				let price = component.get("v.newCarListPrice");
				helper.createNewPricebookEntry(component, newCarId, price);
				component.set("v.newCarCreatingStage", 'carPictures');
			}
		});
	},

	createNewPricebookEntry: function (component, newCarId, newCarPrice) {
		let action = component.get('c.setNewCarStandardPrice');
		action.setParams({
			'carId': newCarId,
			'carPrice': newCarPrice
		});

		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {

			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_when_creating_pricebookentry'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_when_creating_pricebookentry')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	fetchPickListVal: function (component, fieldName, elementId) {
		let action = component.get("c.getSelectOptions");
		action.setParams({
			"objObject": component.get("v.newCar"),
			"fld": fieldName
		});
		let opts = [];
		action.setCallback(this, function (response) {
			if (response.getState() == "SUCCESS") {
				let allValues = response.getReturnValue();

				if (allValues != undefined && allValues.length > 0) {
					opts.push({
						class: "optionClass",
						label: $A.get('$Label.c.ECS_Choose_one_option'),
						value: ""
					});
				}
				for (let i = 0; i < allValues.length; i++) {
					opts.push({
						class: "optionClass",
						label: allValues[i],
						value: allValues[i]
					});
				}
				component.set(elementId, opts);
			}
		});
		$A.enqueueAction(action);
	},
})