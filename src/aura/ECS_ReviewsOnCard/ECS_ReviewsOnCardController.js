/**
 * Created by BRITENET on 11.03.2019.
 */
({
    doInit: function (component, event, helper) {
    		helper.getOrgUrl(component);
    		helper.onInit(component);
    		helper.getProductReviews(component);
    		helper.getCurrentUser(component);
    	},

    	displayReviewModal: function (component, event, helper) {
        		component.set("v.displayReviewModal", true);
        		helper.getProductReviews(component);

        	},

        	hideReviewModal: function (component, event, helper) {
        		component.set("v.displayReviewModal", false);
        	},

        deleteMovieReview: function (component, event, helper) {
        		helper.deleteReview(component, event);
        	},
        editReview: function (component, event, helper) {
        		helper.editReview(component, event);
        	},

        	onReviewAdded: function (component, event, helper) {
        		helper.getProductReviews(component);
        		component.set("v.editModal", false);
        	},
})