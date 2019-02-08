/**
 * Created by BRITENET on 08.02.2019.
 */
({
    onInit: function(component, event, helper){
            component.find("service").getNewRecord(
                "Case", // sObject type (entityAPIName)
                null,      // recordTypeId
                false,     // skip cache?
                $A.getCallback(function() {
                    let error = component.get("v.recordError");
                    let newCase = component.get("v.newCase");
                    let carId = component.get("v.carId").toString();
                    newCase.ECS_Car__c = carId;
                    newCase.Origin = 'Web';
                    newCase.ECS_isCarServiceFromCommunity__c = true;

                    component.set("v.newCase", newCase);
                    console.log('callback: '+JSON.stringify(component.get("v.newCase")));
                    console.log('service: '+JSON.stringify(component.find("service")));
                    if(error || (newCase === null)) {
                        console.log("Error initializing record template: " + error);
                    }
                })
            );}
})