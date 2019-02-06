/**
 * Created by BRITENET on 04.02.2019.
 */
({

    doInit : function(component, event, helper){
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
                },

    onCarAddedToCart: function(component, event, helper){
            var carObj = component.get("v.car");
            console.log("car obj: "+JSON.stringify(carObj));
            helper.addCarToCart(component,carObj);
        },

        redirectToCart: function(component, event, helper){
                let urlEvent = $A.get("e.force:navigateToURL");
                   urlEvent.setParams({
                     "url": "/cart"
                   });
                   urlEvent.fire();
            },


})