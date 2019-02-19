/**
   * Created by BRITENET on 04.02.2019.
   */

 ({
        doInit: function(component, event, helper){
            helper.getOrgUrl(component);
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