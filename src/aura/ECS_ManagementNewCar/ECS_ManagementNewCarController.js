/**
 * Created by BRITENET on 14.02.2019.
 */
({
	doInit: function (component, event, helper) {
		helper.getYearOptions(component);
		helper.onInit(component);
		helper.fetchPickListVal(component, 'ECS_BodyStyle__c', 'v.bodyStyleOptions');
		helper.fetchPickListVal(component, 'ECS_FuelType__c', 'v.fuelTypeOptions');
		helper.fetchPickListVal(component, 'ECS_Transmission__c', 'v.transmissionOptions');
		helper.fetchPickListVal(component, 'ECS_BatteryCapacity__c', 'v.batteryCapacityOptions');
		helper.initializeNewRecord(component);
	},

	handleCreateRecord: function (component, event, helper) {
		let allValid = component.find('newCarFormField').reduce(function (validSoFar, inputCmp) {
			inputCmp.showHelpMessageIfInvalid();
			return validSoFar && inputCmp.get('v.validity').valid;
		}, true);

		if (allValid) {
			helper.createNewCar(component);
		} else {
			let formErrorToast = $A.get("e.force:showToast");
			formErrorToast.setParams({
				"type": "error",
				"message": $A.get('$Label.c.ECS_Provide_values_to_all_fields')
			});
			formErrorToast.fire();
		}

	},
	handleUploadFinished: function (component, event, helper) {
		let rec = component.get("v.carToDelete");
		let uploadedFiles = event.getParam("files");
		let carId = component.get("v.carId");
		rec.fields.ECS_isCreatingCompleted__c.value = true;
		helper.createAcar(component);
		helper.initializeNewRecord(component);
		component.set("v.newCarCreatingStage", 'carDetails');
	},
})