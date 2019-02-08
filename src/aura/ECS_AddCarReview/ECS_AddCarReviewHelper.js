/**
 * Created by BRITENET on 07.02.2019.
 */
({
    onInit: function(component){
            component.find("service").getNewRecord(
                "ECS_Review__c", // sObject type (entityAPIName)
                null,      // recordTypeId
                false,     // skip cache?
                $A.getCallback(function() {
                    let error = component.get("v.recordError");
                    let newReview = component.get("v.newReview");
                    let carId = component.get("v.carId").toString();
                    newReview.ECS_Product__c = carId;
                    component.set("v.newReview", newReview);
                    console.log('callback: '+JSON.stringify(component.get("v.newReview")));
                    console.log('service: '+JSON.stringify(component.find("service")));
                    if(error || (newReview === null)) {
                        console.log("Error initializing record template: " + error);
                    }
                })
            );
        }
})