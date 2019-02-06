/**
 * Created by BRITENET on 06.02.2019.
 */
({
    loadCustomerOrdersItems: function(component){
        let action = component.get('c.getCustomerOrdersItems');
        var helper = this;
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS")
            {
                component.set("v.customerOrdersItems", response.getReturnValue());
                console.log('recived orders: '+JSON.stringify(response.getReturnValue()));
                helper.summarizeOrdersAmount(component);
            }else{
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Error when loading orders items');
                }else{
                    resultsToast.setParams({
                        "type": "error",
                        "title": "Error",
                        "message": "Error when loading orders items"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    summarizeOrdersAmount: function(component){
        let orders = component.get("v.customerOrdersItems");
        let totalAmount = 0;
        for(var ii=0; ii<orders.length; ii++){
            totalAmount += orders[ii].TotalAmount;
        }
        component.set("v.ordersTotalAmount", totalAmount);
    },

    removeHighlightFromAllRows: function(component, rows) {
        for(let ii=0; ii< rows.length; ii++){
            $A.util.removeClass(rows[ii], "slds-is-selected");
        }
    },
})