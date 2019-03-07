/**
 * Created by BRITENET on 06.02.2019.
 */

({
    loadCustomerOrdersItems: function(component){
        let action = component.get('c.getCustomerOrdersItems');
        var helper = this;
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                component.set("v.customerOrdersItems", response.getReturnValue());
            }else{
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert( $A.get('$Label.c.ECS_Error_when_loading_orders_items'));
                }else{
                    resultsToast.setParams({
                        "type": "error",
                        "title": "Error",
                        "message": $A.get('$Label.c.ECS_Error_when_loading_orders_items')
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
})