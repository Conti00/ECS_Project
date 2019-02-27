/**
 * Created by BRITENET on 13.02.2019.
 */
({
	doInit: function (component, event, helper) {
		helper.getOrgUrl(component);
		helper.onInit(component);
	},

	onCarAddedToCart: function (component, event, helper) {
		let carObj = component.get("v.car");
		helper.addCarToCart(component, carObj);
	},
})