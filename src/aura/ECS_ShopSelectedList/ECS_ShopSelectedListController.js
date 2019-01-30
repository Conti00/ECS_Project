/**
 * Created by BRITENET on 19.12.2018.
 */
({
     tableRowClicked: function(component, event, helper) {
             let shopId = event.currentTarget.dataset.id;
             let index = event.currentTarget.dataset.index;
             let selectedRowIndex = component.get("v.selectedRowIndex");
             if(!$A.util.isUndefinedOrNull(selectedRowIndex)){
                 helper.removeHighlightFromAllRows(component);
             }
             let rows = component.find("row");
             $A.util.addClass(rows[index], "row-highlighted");
             component.set("v.selectedRowIndex", index);
             helper.showShopLocalizationOnMap(component, index);
             helper.showShopDetails(component, shopId);
     },

     removeHighlightFromAllRowsEventAction: function(component, event, helper) {
             helper.removeHighlightFromAllRows(component);
     },
})