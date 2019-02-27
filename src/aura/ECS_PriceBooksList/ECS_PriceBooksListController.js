/**
 * Created by BRITENET on 26.02.2019.
 */

({
    doInit: function(component, event, helper){
        helper.loadPricebooks(component);
    },

    tableRowClicked: function(component, event, helper){
        component.set("v.selectedPricebookId", event.currentTarget.dataset.id);
        component.set("v.selectedRowIndex", event.currentTarget.dataset.index);
        let selectedPricebookEvent = component.getEvent("pricebookSelected")
                                    .setParams({"pricebookId": component.get("v.selectedPricebookId")})
                                    .fire();
    },
    createNewDiscountModalOpen: function(component, event, helper){
//        if(component.get("v.openSearchModal")?component.set("v.openSearchModal",false):component.set("v.openSearchModal",true));
         component.find("newDiscountModal").show();
    },
    handleNewDiscountCreated: function(component, event, helper){
         component.find("newDiscountModal").hide();
         helper.loadPricebooks(component);
    },
    openPricebookDeleteModal: function(component, event, helper){
        let selectedPbIds = component.get("v.selectedPricebooksIds");
        selectedPbIds.push(event.getSource().get("v.value"));
        component.set("v.selectedPricebooksIds", selectedPbIds);
        console.log(component.get("v.selectedPricebooksIds"));
        component.find("deletePricebookModal").show();
    },
    onCancelDeleteClicked: function(component, event, helper){
        helper.closeDeleteDiscountModal(component);
    },
    onCartItemSelect: function(component, event, helper){
        let pbId = event.getSource().get("v.value");
        let listOfSelectedIds = component.get("v.selectedPricebooksIds");
        if(event.getSource().get("v.checked") && !listOfSelectedIds.includes(pbId)){
            listOfSelectedIds.push(pbId);

        }else{
            for(let ii=0; ii<listOfSelectedIds.length; ii++){
                if(pbId == listOfSelectedIds[ii]){
                    listOfSelectedIds.splice(ii, 1);
                }
            }
        }
        component.set("v.selectedPricebooksIds",listOfSelectedIds);
        console.log("selectedIds       "+JSON.stringify(component.get("v.selectedPricebooksIds")));
    },
    onDiscountDelete: function(component, event, helper){
        helper.deleteSelectedDiscounts(component);
    },

})