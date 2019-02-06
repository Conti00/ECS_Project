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
                console.log('Main recived orders: '+JSON.stringify(response.getReturnValue()));
//                helper.summarizeOrdersAmount(component);
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
})