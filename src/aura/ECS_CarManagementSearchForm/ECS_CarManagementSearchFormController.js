/**
 * Created by BRITENET on 01.02.2019.
 */
({
	doInit: function (component, event, helper) {
		helper.getYearOptions(component);
		helper.getCars(component);
		helper.fetchPickListVal(component, 'ECS_BodyStyle__c', 'v.bodyStyleOptions');
		helper.fetchPickListVal(component, 'ECS_FuelType__c', 'v.fuelTypeOptions');
		helper.fetchPickListVal(component, 'ECS_Transmission__c', 'v.transmissionOptions');
	},

	clearForm: function (component, event, helper) {
		helper.clearSearchForm(component);
		helper.getCars(component);
	},

	searchCars: function (component, event, helper) {
		let searchedCar = component.get("v.searchedCar");
		helper.getCars(component);
	},

	onCarSelected: function (component, event, helper) {
		component.set("v.selectedCarId", event.getParam("carId"));
		component.set("v.selectedCar", event.getParam("car"));
		component.set("v.productCardShown", event.getParam("carSelected"));
	},

	onCarsChange: function (component, event, helper) {
		let searchedCar = component.get("v.searchedCar");
		let onRecivedCarsEvent = component.getEvent("oncarsrecived");
		onRecivedCarsEvent.setParams({
			"carsToDisplay": component.get("v.cars")
		});
		onRecivedCarsEvent.fire();
	},

	changeSearch: function (component, event, helper) {
		if (component.get('v.isAdvancedSearch')) {
			component.set('v.isAdvancedSearch', false);
			helper.clearSearchForm(component);
		} else {
			component.set('v.isAdvancedSearch', true);
		}
	},
})