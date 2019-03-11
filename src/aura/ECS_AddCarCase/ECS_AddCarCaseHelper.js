/**
 * Created by BRITENET on 08.02.2019.
 */
({
    onInit: function(component, event, helper){
        console.log(component.get("v.carId"));
            component.find("service").getNewRecord(
                "Case", // sObject type (entityAPIName)
                null,      // recordTypeId
                false,     // skip cache?
                $A.getCallback(function() {
                    let error = component.get("v.recordError");
                    let newCase = component.get("v.newCase");
                    let carId = component.get("v.carId").toString();
                    console.log(carId);
                    newCase.ECS_Car__c = carId;
                    newCase.ECS_Order__c=component.get("v.OrderId");
                    newCase.Origin = 'Web';
                    newCase.ECS_isCarServiceFromCommunity__c = true;
                    component.set("v.newCase", newCase);
                    console.log('callback: '+JSON.stringify(component.get("v.newCase")));
                    console.log('service: '+JSON.stringify(component.find("service")));
                    if(error || (newCase === null)) {
                        console.log("Error initializing record template: " + error);
                    }
                })
            );},



     getOrderId: function (component) {
     		let action = component.get('c.getOrderIdByProductId');
     		let carId = component.get("v.carId");
     		action.setParams({
     			'carId': carId,
     		});

     		action.setCallback(this, function (response) {
     			let state = response.getState();
     			if (state === "SUCCESS") {
     			    component.set("v.OrderId", response.getReturnValue());

     			} else {
     				let resultsToast = $A.get("e.force:showToast");
     				if ($A.util.isUndefined(resultsToast)) {
     					alert($A.get('$Label.c.ECS_Error_when_creating_pricebookentry'));
     				} else {
     					resultsToast.setParams({
     						"type": "error",
     						"title": "Error",
     						"message": $A.get('$Label.c.ECS_Error_when_creating_pricebookentry')
     					});
     					resultsToast.fire();
     				}
     			}
     		});
     		$A.enqueueAction(action);
     	},




})