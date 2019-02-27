/**
 * Created by BRITENET on 26.02.2019.
 */
({
        handlePricebookSelected: function(component, event, helper){
            component.set("v.selectedPricebookId", event.getParam("pricebookId"));
        },
})