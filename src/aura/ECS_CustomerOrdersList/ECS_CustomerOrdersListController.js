/**
 * Created by BRITENET on 06.02.2019.
 */

({
    doInit: function(component, event, helper){
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
        let selectedOrderItemkEvent = component.getEvent("orderItemSelected")
                                    .setParams({"transferredObject": component.get("v.customerOrdersItems")[index]})
                                    .fire();

    },
})