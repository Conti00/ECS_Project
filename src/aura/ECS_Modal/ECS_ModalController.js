/**
 * Created by BRITENET on 05.02.2019.
 */
({
	show : function(component, event, helper) {
		component.set("v.visible", true);
	},

	hide : function(component, event, helper) {
		component.set("v.visible", false);
//		$A.get("e.force:closeQuickAction").fire();
	},
	closeModal : function(component, event, helper) {
		component.set("v.visible", false);
//		$A.get("e.force:closeQuickAction").fire();
//		var closeModalEvent = component.getEvent("closeModalEvent");
//		closeModalEvent.fire();
	}
})