/**
 * Created by BRITENET on 06.02.2019.
 */

({
    doInit: function(component, event, helper){
        component.set("v.newLine", "</br>");
        helper.loadCustomerOrdersItems(component);

    },
    onOrderItemsChange: function(component, event, helper){
        helper.summarizeOrdersAmount(component);
    },
    tableRowClicked: function(component, event, helper){
        let index = event.currentTarget.dataset.index;
        let rows = component.find("tableRow");
        helper.removeHighlightFromAllRows(component, rows);
        $A.util.addClass(rows[index], "slds-is-selected");
//        console.log("transfer obj: "+ JSON.stringify(component.get("v.customerOrdersItems")[index]));
//        component.set("v.selectedRowIndex", event.currentTarget.dataset.index);
        let selectedOrderItemkEvent = component.getEvent("orderItemSelected")
                                    .setParams({"transferredObject": component.get("v.customerOrdersItems")[index]})
                                    .fire();

    },
})