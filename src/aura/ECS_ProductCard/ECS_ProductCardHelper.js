/**
 * Created by BRITENET on 05.02.2019.
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
        
         getProductReviews: function(component){
                 var action = component.get('c.getProductReviewsById');
                  console.log('carId: '+component.get("v.car.Id"));
                 action.setParams({
                     carId: String(component.get("v.car.Id"))
                 })

                 action.setCallback(this, function(response){
                     var state = response.getState();
                     if (state === "SUCCESS")
                     {
                         let productReviews = response.getReturnValue();
                         console.log(productReviews)
                         component.set('v.productReviews', productReviews);
                     }else{
                         var resultsToast = $A.get("e.force:showToast");
                         if ($A.util.isUndefined(resultsToast)){
                             alert('Error when loading reviews');
                         }else{
                             resultsToast.setParams({
                                 "title": "Error",
                                 "message": "Error when loading reviews"
                             });
                             resultsToast.fire();
                         }
                     }
                 });
                 $A.enqueueAction(action);
             },

          deleteReview: function(component, reviewId){
                     var action = component.get('c.deleteReviewById');
                     console.log('id: '+reviewId);

                     action.setParams({
                         "reviewId": reviewId
                     })
                     action.setCallback(this, function(response){
                         var state = response.getState();
                         if (state === "SUCCESS")
                         {
                             let deleteReviewSuccess = response.getReturnValue();
                             if(deleteReviewSuccess === 'Success'){
                                 this.getProductReviews(component);
                                 var resultsToast = $A.get("e.force:showToast");
                                 if ($A.util.isUndefined(resultsToast)){
                                     alert('Review was deleted');
                                 }else{
                                     resultsToast.setParams({
                                         "title": "Success",
                                         "message": "Review was deleted"
                                     });
                                     resultsToast.fire();
                                 }
                             }
                         }else{
                             var resultsToast = $A.get("e.force:showToast");
                             if ($A.util.isUndefined(resultsToast)){
                                 alert('Error when deleting review');
                             }else{
                                 resultsToast.setParams({
                                     "title": "Error",
                                     "message": "Error when deleting review"
                                 });
                                 resultsToast.fire();
                             }
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

                  }
              });
              $A.enqueueAction(action);
        },


})