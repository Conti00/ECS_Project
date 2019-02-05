/**
 * Created by BRITENET on 04.02.2019.
 */

({
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

    getStandardPrice: function(component, carId){
          var action = component.get('c.getCarStandardPrice');
          action.setParams({
              'carId' : carId
          });

          action.setCallback(this, function(response){
              let state = response.getState();
              console.log("response: "+response.getState());
              if (state === "SUCCESS")
              {
                  console.log("return price value: "+response.getReturnValue());
                  component.set("v.carStandardPrice", response.getReturnValue());
              }else{
//
              }
          });
          $A.enqueueAction(action);
    },

    getLowestPrice: function(component, carId){
          var action = component.get('c.getCarCurrentLowestPrice');
          action.setParams({
              'carId' : carId
          });

          action.setCallback(this, function(response){
              let state = response.getState();
              console.log("response: "+response.getState());
              if (state === "SUCCESS")
              {
                  console.log("return lowest price value: "+response.getReturnValue());
                  component.set("v.carCurrentLowestPrice", response.getReturnValue());
              }else{
    //
              }
          });
          $A.enqueueAction(action);
    },
})