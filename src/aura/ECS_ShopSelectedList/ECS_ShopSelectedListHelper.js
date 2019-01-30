/**
 * Created by BRITENET on 19.12.2018.
 */
({
    showShopLocalizationOnMap: function(component, index) {
            let eventShowLocalization = $A.get("e.c:ECS_ShowShopLocalizationEvent");
            let shop = component.get("v.selectedShops")[index];
            eventShowLocalization.setParams({"shop": shop});
            eventShowLocalization.fire();
    },

        showShopDetails: function(component, shopId) {
                let eventShowDetails = $A.get("e.c:ECS_SelectedShopOnList");
                eventShowDetails.setParams({"shopId": shopId});
                eventShowDetails.fire();
        },

    removeHighlightFromAllRows: function(component) {
            let rows = component.find("row")
            for(var ii=0; ii< rows.length; ii++){
                $A.util.removeClass(rows[ii], "row-highlighted");
            }
    },
})