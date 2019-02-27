/**
 * Created by BRITENET on 05.02.2019.
 */
({

	onInit: function (component) {
		var action = component.get("c.hasCurrentUserAdminProfile");
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				let isAdmin = response.getReturnValue();
				component.set("v.isAdmin", isAdmin);
			} else {}
		})
		$A.enqueueAction(action);

	},

	getOrgUrl: function (component) {
		var orgBaseUrl = component.get("c.getBaseUrlString");
		orgBaseUrl.setParams({

		});
		orgBaseUrl.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				component.set("v.orgUrl", response.getReturnValue());
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert('Error while getting Url');
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": "Error while getting Url"
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(orgBaseUrl);

	},

	loadCarImages: function(component){
            var selectedCarId = component.get("v.car.Id");
            if(selectedCarId != null){
                var action = component.get("c.getImages");
                action.setParams({
                    "carId" : selectedCarId
                });
                action.setCallback(this, function(response){
                    var state = response.getState();
                    if(state === "SUCCESS"){
                        component.set("v.carImages", response.getReturnValue());
                    }else{
                        console.log("Error geting images, ");
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
					alert('Item deleted from cart');
				} else {
					resultsToast.setParams({
						"type": "success",
						"title": "Success",
						"message": "Item deleted from cart"
					});
					resultsToast.fire();
				}
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert('Error when deleting cart item');
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": "Error when deleting cart item"
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	addCarToCart: function (component, carObj) {
		var action = component.get('c.addCarToUserCart');
		action.setParams({
			car: carObj
		});
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let resultsToast = $A.get("e.force:showToast");
				resultsToast.setParams({
					"type": "success",
					"message": "Car added to cart"
				});
				resultsToast.fire();
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert('Error adding to cart');
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": "The product has already been bought or is in a cart"
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	getProductReviews: function (component) {
		var action = component.get('c.getProductReviewsById');
		action.setParams({
			carId: String(component.get("v.car.Id"))
		})

		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				let productReviews = response.getReturnValue();
				component.set('v.productReviews', productReviews);
			} else {
				var resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert('Error when loading reviews');
				} else {
					resultsToast.setParams({
						"title": "Error",
						"message": "Error when loading reviews"
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	deleteReview: function (component, reviewId) {
		var action = component.get('c.deleteReviewById');
		action.setParams({
			"reviewId": reviewId
		})
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				let deleteReviewSuccess = response.getReturnValue();
				if (deleteReviewSuccess === 'Success') {
					this.getProductReviews(component);
					var resultsToast = $A.get("e.force:showToast");
					if ($A.util.isUndefined(resultsToast)) {
						alert('Review was deleted');
					} else {
						resultsToast.setParams({
							"title": "Success",
							"message": "Review was deleted"
						});
						resultsToast.fire();
					}
				}
			} else {
				var resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert('Error when deleting review');
				} else {
					resultsToast.setParams({
						"title": "Error",
						"message": "Error when deleting review"
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},

	getLowestPrice: function (component, carId) {
		var action = component.get('c.getCarCurrentLowestPrice');
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
					alert('Error while getting price');
				} else {
					resultsToast.setParams({
						"type": "error",
						"title": "Error",
						"message": "Error while getting price"
					});
					resultsToast.fire();
				}

			}
		});
		$A.enqueueAction(action);
	},

    editReview: function(component, productReview){

         component.set("v.productReviewToUpdate", productReview);
         component.set('v.editModal',true);

        }


})