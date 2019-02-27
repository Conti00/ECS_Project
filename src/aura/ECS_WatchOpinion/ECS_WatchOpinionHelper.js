/**
 * Created by BRITENET on 15.02.2019.
 */
({
    getProductReviews: function(component){
                     var action = component.get('c.getProductReviewsByIdAndUser');
                      console.log('carId: '+component.get("v.carId"));
                     action.setParams({
                         carId: String(component.get("v.carId"))
                     })

                     action.setCallback(this, function(response){
                         var state = response.getState();
                         if (state === "SUCCESS")
                         {
                             let productReviews = response.getReturnValue();
                             console.log('Review:' +productReviews)
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

    editReview: function(component, productReview){
        console.log('productReviewId: '+productReview.Id);
//        var editRecordEvent = $A.get("e.force:editRecord");
//                editRecordEvent.setParams({
//                    "recordId": productReviewId
//                });
//                editRecordEvent.fire();

     component.set("v.productReviewToUpdate", productReview);
     component.set('v.openAddReview',true);

    }
})