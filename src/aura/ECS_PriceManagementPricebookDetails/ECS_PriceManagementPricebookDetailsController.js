/**
 * Created by BRITENET on 26.02.2019.
 */
({
    doInit: function(component, event, helper){
        helper.loadPricebookEntries(component, component.get("v.pricebookId"));
    },
    onSelectedPricebookIdChange: function(component, event, helper){
        helper.loadPricebookEntries(component, component.get("v.pricebookId"));
    },
    tableRowClicked: function(component, event, helper){
        let selectedCarId = event.currentTarget.dataset.id;
        helper.redirectToDetailsPage(component, selectedCarId);

    },
    opedCarDetailsModal: function(component, event, helper){
        component.set("v.selectedCarId", event.getSource().get("v.value"));
        component.find("carDetailsModal").show();
    },
    onRemoveCarFromDiscount: function(component, event, helper){
        let pricebookEntryId = event.getSource().get("v.value");
        helper.removePricebookEntry(component, pricebookEntryId);
    },
})