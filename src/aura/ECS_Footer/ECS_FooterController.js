/**
 * Created by BRITENET on 11.02.2019.
 */
({

    init: function(component){

        var action = component.get("c.isUserInNewsletterGroup");

                                        action.setCallback(this, function(response){
                                            var state = response.getState();
                                            if(state === "SUCCESS"){

                                              component.set("v.isSubscriber",response.getReturnValue());
                                            }
                                            else{
                                            }
                                        })
                                        $A.enqueueAction(action);
                              },


    subscribe : function(component, helper){

       var action = component.get("c.setUserAsMemberNewsletterGroup");

                                action.setCallback(this, function(response){
                                    var state = response.getState();
                                    if(state === "SUCCESS"){
                                         let resultsToast = $A.get("e.force:showToast");
                                                                    if ($A.util.isUndefined(resultsToast)){
                                                                        alert('You are a subscriber now');
                                                                    }else{
                                                                        resultsToast.setParams({
                                                                            "type": "success",
                                                                            "title": "Success",
                                                                            "message": "You are a subscriber now"
                                                                        });
                                                                        resultsToast.fire();
                                                                        component.set("v.isSubscriber",true);
                                    }}
                                    else{
                                    }
                                })
                                $A.enqueueAction(action);

                      },

    unsubscribe : function(component, helper){

       var action = component.get("c.unsetUserAsMemberNewsletterGroup");

                                action.setCallback(this, function(response){
                                    var state = response.getState();
                                    if(state === "SUCCESS"){
                                         let resultsToast = $A.get("e.force:showToast");
                                                                    if ($A.util.isUndefined(resultsToast)){
                                                                        alert('You are not subscribed now');
                                                                    }else{
                                                                        resultsToast.setParams({
                                                                            "type": "success",
                                                                            "title": "Success",
                                                                            "message": "You are not subscribed now"
                                                                        });
                                                                        resultsToast.fire();
                                                                        component.set("v.isSubscriber",false);
                                    }}
                                    else{
                                    }
                                })
                                $A.enqueueAction(action);
                      },

    redirectToAddCar: function(component, event, helper){
            let urlEvent = $A.get("e.force:navigateToURL");
               urlEvent.setParams({
                 "url": "/add-car"
               });
               urlEvent.fire();
        },




})