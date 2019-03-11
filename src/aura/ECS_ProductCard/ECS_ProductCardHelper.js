/**
 * Created by BRITENET on 05.02.2019.
 */
({

	onInit: function (component) {
		let action = component.get("c.hasCurrentUserAdminProfile");
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let isAdmin = response.getReturnValue();
				component.set("v.isAdmin", isAdmin);
			}
		})
		$A.enqueueAction(action);
	},

	getOrgUrl: function (component) {
		let orgBaseUrl = component.get("c.getBaseUrlString");
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

	loadCarImages: function (component) {
		let selectedCarId = component.get("v.car.Id");
		if (selectedCarId != null) {
			let action = component.get("c.getImages");
			action.setParams({
				"carId": selectedCarId
			});
			action.setCallback(this, function (response) {
				let state = response.getState();
				if (state === "SUCCESS") {
					component.set("v.carImages", response.getReturnValue());
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_while_getting_images')
					});
					resultsToast.fire();
				}
			});
			$A.enqueueAction(action);
		}
	},


	removeCartItem: function (component, carId) {
		let action = component.get('c.deleteCustomerCartItem');
		action.setParams({
			"listOfIds": carId
		});

		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {


				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Item_deleted_from_cart'));
				} else {
					resultsToast.setParams({
						"type": "success",
						"title": "Success",
						"message": $A.get('$Label.c.ECS_Item_deleted_from_cart')
					});
					resultsToast.fire();
				}
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_when_deleting_cart_item'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_when_deleting_cart_item')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	addCarToCart: function (component) {
		let carObj = component.get("v.car");
		let action = component.get('c.addCarToUserCart');
		action.setParams({
			car: carObj
		});
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let resultsToast = $A.get("e.force:showToast");
				resultsToast.setParams({
					"type": "success",
					"title": "Success",
					"message": $A.get('$Label.c.ECS_Car_added_to_cart')
				});
				resultsToast.fire();
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_The_product_has_already_been_bought_or_is_in_a_cart'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_The_product_has_already_been_bought_or_is_in_a_cart')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	getProductReviews: function (component) {
		let action = component.get('c.getProductReviewsById');
		action.setParams({
			carId: String(component.get("v.car.Id"))
		})

		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let productReviews = response.getReturnValue();
				component.set('v.productReviews', productReviews);
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_while_loading_reviews'));
				} else {
					resultsToast.setParams({
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_while_loading_reviews')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	deleteReview: function (component, event) {
		let reviewId = event.getSource().get("v.value");
		let action = component.get('c.deleteReviewById');
		action.setParams({
			"reviewId": reviewId
		})
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let deleteReviewSuccess = response.getReturnValue();
				if (deleteReviewSuccess === 'Success') {
					this.getProductReviews(component);
					let resultsToast = $A.get("e.force:showToast");
					if ($A.util.isUndefined(resultsToast)) {
						alert($A.get('$Label.c.ECS_Review_was_deleted'));
					} else {
						resultsToast.setParams({
							"title": "Success",
							"message": $A.get('$Label.c.ECS_Review_was_deleted')
						});
						resultsToast.fire();
					}
				}
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_while_deleting_review'));
				} else {
					resultsToast.setParams({
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_while_deleting_review')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	editReview: function (component, event) {
		let productReview = event.getSource().get("v.value");
		component.set("v.productReviewToUpdate", productReview);
		if (component.get("v.editModal") == true ? component.set('v.editModal', false) : component.set('v.editModal', true));

	},

	getLowestPrice: function (component) {
		let carId = component.get("v.car.Id");
		let action = component.get('c.getCarCurrentLowestPrice');
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
	},

	getStandardPrice: function (component) {
		let carId = component.get("v.car.Id");
		let action = component.get('c.getCarStandardPrice');
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
					alert($A.get('$Label.c.ECS_Error_while_getting_price'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_while_getting_price')
					});
				}
			}
		});
		$A.enqueueAction(action);
	},

	getCurrentUser: function (component) {
		let action = component.get("c.getCurrentUser");
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.currentUser", response.getReturnValue());
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Error_while_getting_user_info'));
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Error_while_getting_user_info')
					});
				}
			}
		});
		$A.enqueueAction(action);

	},
})