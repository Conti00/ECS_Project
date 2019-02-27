/**
 * Created by BRITENET on 01.02.2019.
 */
({
	onInit: function (component, event, helper) {
		helper.onInit(component);
		let sPageURL = decodeURIComponent(window.location.search.substring(1));
		let carId = sPageURL.substring(6);
		component.set("v.selectedCarId", carId);
		if (carId != null) {
			helper.getCarById(component);
		}
	},

	onSearchedCarsRecived: function (component, event, helper) {
		component.find("carList").set("v.cars", event.getParams().carsToDisplay);
	},

	onCarSelected: function (component, event, helper) {
		component.set("v.selectedCarId", event.getParam("carId"));
		component.set("v.productCardShown", event.getParam("carSelected"));
		component.set("v.selectedCar", event.getParam("car"));
	},

	backToSearch: function (component, event, helper) {
		component.set("v.productCardShown", false);
	},

	hideDiscountModal: function (component, event, helper) {
	    if(component.get('v.displayModal')?component.set('v.displayModal',false):component.set('v.displayModal', true));
		component.set("v.typeOfAction", 'Discount');
	},

	hideGalleryModal: function (component, event, helper) {
        if(component.get('v.displayModal')?component.set('v.displayModal',false):component.set('v.displayModal', true));
		component.set("v.typeOfAction", 'Gallery');
	}
})