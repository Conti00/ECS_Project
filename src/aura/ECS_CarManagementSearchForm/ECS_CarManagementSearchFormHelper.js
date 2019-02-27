/**
 * Created by BRITENET on 01.02.2019.
 */
({
	getYearOptions: function (component) {
		let yearList = [];
		let beginYear = 2010;
		let endYear = ((new Date()).getFullYear() + 1).toString();
		for (let i = beginYear; i <= endYear; i++) {
			yearList.push(i);
		}
		yearList.reverse();
		component.set("v.yearOptions", yearList);
	},

	getCars: function (component) {
	    let searchedCar = component.get("v.searchedCar");
		let action = component.get("c.getCarsList");
		action.setParams({
			"searchedCar": searchedCar
		})
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.cars", response.getReturnValue());
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_while_getting_cars'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message":  $A.get('$Label.c.ECS_Error_while_getting_cars')
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
			"objObject": component.get("v.searchedCar"),
			"fld": fieldName
		});
		let opts = [];
		action.setCallback(this, function (response) {
			if (response.getState() == "SUCCESS") {
				let allValues = response.getReturnValue();

				if (allValues != undefined && allValues.length > 0) {
					opts.push({
						class: "optionClass",
						value: $A.get('$Label.c.ECS_All')
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
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_while_picklist_values'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_while_picklist_values')
					});
					resultsToast.fire();
				}
			}

		});
		$A.enqueueAction(action);
	},

	clearSearchForm: function (component) {
		let searchedCar = component.get("v.searchedCar");
		searchedCar.Name = '';
		searchedCar.ECS_VinNumber__c = '';
		searchedCar.ECS_Model__c = '';
		searchedCar.ECS_ProductionYear__c = '';
		searchedCar.ECS_BodyStyle__c = null;
		searchedCar.ECS_FuelType__c = null;
		searchedCar.ECS_Transmission__c = null;
		component.set("v.searchedCar", searchedCar);
	},
})