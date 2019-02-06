/**
 * Created by BRITENET on 05.02.2019.
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


})