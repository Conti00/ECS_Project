/**
   * Created by BRITENET on 04.02.2019.
   */

 ({
        doInit: function(component, event, helper){
            var orgBaseUrl = component.get("c.getBaseUrlString");
            orgBaseUrl.setParams({

            });
            orgBaseUrl.setCallback(this, function(response){
                var state = response.getState();
                if(state === "SUCCESS"){
                    component.set("v.orgUrl", response.getReturnValue());
                    console.log("org url: "+component.get("v.orgUrl"));
                }else{
                    console.log("Error geting images, ");
                }
            });
            $A.enqueueAction(orgBaseUrl);
            let carId = component.get("v.car.Id");
            helper.getLowestPrice(component, carId);
            helper.getStandardPrice(component, carId);
        },


     onCarClicked: function(component, event, helper){
         var car = component.get("v.car");
         var selectedCarEvent = component.getEvent("carSelectedEvent");
         component.set("v.selected", true);
         selectedCarEvent.setParams({
             "carId" : car.Id,
             "car" : car,
             "carSelected" : true
         });
         selectedCarEvent.fire();
     },


 })