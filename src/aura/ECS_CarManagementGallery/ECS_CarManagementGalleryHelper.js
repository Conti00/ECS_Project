/**
 * Created by BRITENET on 04.02.2019.
 */

({

	onInit: function (component) {
		let action = component.get("c.hasCurrentUserAdminProfile");
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				let isAdmin = response.getReturnValue();
				component.set("v.isAdmin", isAdmin);
			} else {
				resultsToast.setParams({
					"title": "Error",
					"message": $A.get('$Label.c.ECS_Error_while_getting_user_info')
				});
				resultsToast.fire();
			}
		})
		$A.enqueueAction(action);
	},

	loadCarImages: function (component) {
		let selectedCarId = component.get("v.carId");
		if (selectedCarId != null) {
			let action = component.get("c.getImages");
			action.setParams({
				"carId": selectedCarId
			});
			action.setCallback(this, function (response) {
				let state = response.getState();
				if (state === "SUCCESS") {
					component.set("v.carImages", response.getReturnValue());
					let resultsToast = $A.get("e.force:showToast");
				} else {
					resultsToast.setParams({
						"title": "Error",
						"message": $A.get('$Label.c.ECS_No_Images_Found')
					});
					resultsToast.fire();
				}
			});
			$A.enqueueAction(action);
		}
	},

	setMainPicture: function (component, event) {
		let pictureId = event.getSource().get("v.value");
		let carId = component.get("v.carId");
		let action = component.get("c.setCarMainPictureId");
		action.setParams({
			carId: carId,
			pictureId: pictureId
		});
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				component.find('carImages').reloadRecord(true);
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Image_set_as_primary'));
				} else {
					resultsToast.setParams({
						"title": "Success",
						"message": $A.get('$Label.c.ECS_Image_set_as_primary')
					});
					resultsToast.fire();
				}
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Image_could_be_set_as_primary'));
				} else {
					resultsToast.setParams({
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Image_could_be_set_as_primary')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);

	},
	deleteCarImage: function (component, event) {
		let imageId = event.getSource().get("v.value");
		let action = component.get("c.removeCarImage");
		action.setParams({
			imageId: imageId,
		});
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === "SUCCESS") {
				this.loadCarImages(component);
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Image_deleted'));
				} else {
					resultsToast.setParams({
						"title": "Success",
						"message": $A.get('$Label.c.ECS_Image_deleted')
					});
					resultsToast.fire();
				}
			} else {
				let resultsToast = $A.get("e.force:showToast");
				if ($A.util.isUndefined(resultsToast)) {
					alert($A.get('$Label.c.ECS_Image_could_not_be_deleted'));
				} else {
					resultsToast.setParams({
						"title": "Error",
						"message": $A.get('$Label.c.ECS_Image_could_not_be_deleted')
					});
					resultsToast.fire();
				}
			}
		});
		$A.enqueueAction(action);
	},
})