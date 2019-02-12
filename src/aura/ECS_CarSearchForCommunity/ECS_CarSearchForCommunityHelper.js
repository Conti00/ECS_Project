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

})