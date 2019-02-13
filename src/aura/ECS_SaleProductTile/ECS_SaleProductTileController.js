/**
 * Created by BRITENET on 13.02.2019.
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
                        helper.onInit(component);
//                        helper.getLowestPrice(component, component.get('v.car.Id'));
//                        console.log(component.get("v.car"));
//                        console.log('carID: '+component.get('v.car'));
//                        helper.getLowestPrice(component, component.get('v.car.Id'));


        },

        onCarAddedToCart: function(component, event, helper){
                    var carObj = component.get("v.car");
                    console.log("car obj: "+JSON.stringify(carObj));
                    helper.addCarToCart(component,carObj);
            },
})