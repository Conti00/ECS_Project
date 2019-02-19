/**
 * Created by BRITENET on 12.02.2019.
 */
({

    onInit : function(component){
            var action = component.get("c.hasCurrentUserAdminProfile");

                 action.setCallback(this, function(response){
                     var state = response.getState();
                     if(state === "SUCCESS"){
                         let isAdmin = response.getReturnValue();
                         console.log("is admin returnValue: "+ isAdmin);
                         component.set("v.isAdmin", isAdmin);
                     }
                     else{
                     }
                 })
                 $A.enqueueAction(action);
       },

       getCarById : function(component){
            var action = component.get('c.getCarById');
            let carId = component.get("v.selectedCarId");
                     action.setParams({
                         'carId' : carId
                     });

                     action.setCallback(this, function(response){
                         let state = response.getState();
                         console.log("response: "+response.getState());
                         if (state === "SUCCESS")
                         {
                             console.log("return car: "+response.getReturnValue());
                             component.set("v.selectedCar", response.getReturnValue());
                             component.set("v.productCardShown", true);
                             component.set("v.selectedCarId", component.get("v.selectedCar.Id"));
                         }else{
           //
                         }
                     });
                     $A.enqueueAction(action);
               },


})