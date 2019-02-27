/**
 * Created by BRITENET on 15.02.2019.
 */
({
    doInit : function(component, event, helper){
           helper.getProductReviews(component);
        },

    editReview : function(component, event, helper){
        let productReview = event.getSource().get("v.value");
        helper.editReview(component, productReview);
    }
})