/**
 * Created by BRITENET on 07.02.2019.
 */
({
	init: function (component, event, helper) {
		helper.loadCustomerPurchasedItems(component);
	},

	displayReviewModal: function (component, event, helper) {
		if (event.getSource().get('v.title') == 'add') {
			component.set("v.displayReviewList", false);
		} else {
			component.set("v.displayReviewList", true);
		}

		let purchasedItems = event.getSource().get("v.value");
		component.set("v.selectedCarId", purchasedItems.Product2.Id);
		component.set("v.selectedCarName", purchasedItems.Product2.Name);
		component.set("v.selectedOrderItemId", purchasedItems.Id);
		component.set("v.displayReviewModal", true);
	},

	hideReviewModal: function (component, event, helper) {
		component.set("v.displayReviewModal", false);
	},

	onReviewAdded: function (component, event, helper) {
		component.set("v.displayReviewModal", false);
		helper.setIsReviewed(component);
		helper.loadCustomerPurchasedItems(component);
	},

	redirectToDetailsPage: function (component, event, helper) {
		let carId = event.getSource().get("v.value");
		let urlEvent = $A.get("e.force:navigateToURL");
		urlEvent.setParams({
			"url": "/search-cars?carId=" + carId
		});
		urlEvent.fire();
	},
})