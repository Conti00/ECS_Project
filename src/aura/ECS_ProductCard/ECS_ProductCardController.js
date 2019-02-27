/**
 * Created by BRITENET on 04.02.2019.
 */
({

	doInit: function (component, event, helper) {
		helper.getOrgUrl(component);
		helper.onInit(component);
		helper.getProductReviews(component);
		helper.getLowestPrice(component, component.get('v.car.Id'));
		helper.loadCarImages(component);
	},

	onCarAddedToCart: function (component, event, helper) {
		var carObj = component.get("v.car");
		helper.addCarToCart(component, carObj);
		component.set('v.carInCart', true);
	},

	redirectToCart: function (component, event, helper) {
		let urlEvent = $A.get("e.force:navigateToURL");
		urlEvent.setParams({
			"url": "/cart"
		});
		urlEvent.fire();
	},

	displayReviewModal: function (component, event, helper) {
		component.set("v.displayReviewModal", true);
		helper.getProductReviews(component);

	},

	hideReviewModal: function (component, event, helper) {
		component.set("v.displayReviewModal", false);
	},

	displayPresentationModal: function (component, event, helper) {
		component.set("v.displayPresentationModal", true);
	},

	hidePresentationModal: function (component, event, helper) {
		component.set("v.displayPresentationModal", false);
	},

	deleteMovieReview: function (component, event, helper) {
		let reviewId = event.getSource().get("v.value");
		helper.deleteReview(component, reviewId);
	},

	deleteCartItem: function (component, event, helper) {
		let listOfSelectedIds = component.get("v.selectedCarsIds");
		let carId = event.getSource().get("v.value");
		if (!listOfSelectedIds.includes(carId)) {
			listOfSelectedIds.push(carId);
			component.set("v.selectedCarsIds", listOfSelectedIds);
		}

		helper.removeCartItem(component, listOfSelectedIds);
		component.set('v.carInCart', false);

	},

	redirectToDetailsPage: function (component, event, helper) {
		let carId = event.getSource().get("v.value");
		let urlEvent = $A.get("e.force:navigateToURL");
		urlEvent.setParams({
			"url": "/search-cars?carId=" + carId
		});
		urlEvent.fire();
	},

	openAllFiles: function(component, event, helper){
            var imagesIds = component.get("v.carImages");
            $A.get('e.lightning:openFiles').fire({
                recordIds: imagesIds,
                selectedRecordId: imagesIds[0]
            });
        },

    editReview : function(component, event, helper){
            let productReview = event.getSource().get("v.value");
            helper.editReview(component, productReview);
        },

    onReviewAdded : function(component, event, helper) {
               console.log("handle event");
           },

})