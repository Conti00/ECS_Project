/**
 * Created by BRITENET on 13.02.2019.
 */
({

        onInit : function(component){
                 var action = component.get("c.getCar");

                      action.setCallback(this, function(response){
                          var state = response.getState();
                          if(state === "SUCCESS"){
                              let car = response.getReturnValue();

                              component.set("v.car", car);
                              console.log(component.get("v.car.Product2.Id"));

                              var action = component.get('c.getCarCurrentLowestPrice');
                                                    console.log(component.get('v.car.Product2.Id'));
                                                    action.setParams({
                                                        'carId' : car.Product2.Id
                                                    });

                                                    action.setCallback(this, function(response){
                                                        let state = response.getState();
                                                        console.log("response: "+response.getState());
                                                        if (state === "SUCCESS")
                                                        {
                                                            console.log("return lowest price value: "+response.getReturnValue());
                                                            component.set("v.carCurrentLowestPrice", response.getReturnValue());
                                                        }else{

                                                        }
                                                    });
                                                    $A.enqueueAction(action);
                                                            var action = component.get('c.getCarStandardPrice');
                                                                                  console.log(component.get('v.car.Product2.Id'));
                                                                                  action.setParams({
                                                                                      'carId' : car.Product2.Id
                                                                                  });

                                                                                  action.setCallback(this, function(response){
                                                                                      let state = response.getState();
                                                                                      console.log("response: "+response.getState());
                                                                                      if (state === "SUCCESS")
                                                                                      {
                                                                                          console.log("return lowest price value: "+response.getReturnValue());
                                                                                          component.set("v.carStandardPrice", response.getReturnValue());
                                                                                      }else{

                                                                                      }
                                                                                  });
                                                                                  $A.enqueueAction(action);

                              }

                          else{
                          }
                      })
                      $A.enqueueAction(action);
            },


        getLowestPrice:function(component){

        },


        addCarToCart: function(component,carObj){
                  var action = component.get('c.addCarToUserCart');
                  action.setParams({
                      car : carObj
                  });
                  console.log("action: "+action);
                  console.log("car click: "+carObj);

                  action.setCallback(this, function(response){
                      let state = response.getState();
                      console.log("response: "+response.getState());
                      if (state === "SUCCESS")
                      {
                          let resultsToast = $A.get("e.force:showToast");
                          resultsToast.setParams({
                              "type": "success",
                              "message": "Car added to cart"
                          });
                          resultsToast.fire();
                      }else{
                          let resultsToast = $A.get("e.force:showToast");
                          if ($A.util.isUndefined(resultsToast)){
                              alert('Error adding to cart');
                          }else{
                              resultsToast.setParams({
                                  "type": "error",
                                  "title": "Error",
                                  "message": "Car already in cart"
                              });
                              resultsToast.fire();
                          }
                      }
                  });
                  $A.enqueueAction(action);
                },
})