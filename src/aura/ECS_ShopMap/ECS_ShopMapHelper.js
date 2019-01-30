/**
 * Created by BRITENET on 03.01.2019.
 */
({
    showShopDetails: function(component, event, shopId) {
                    let eventShowDetails = event;
                    eventShowDetails.setParams({"shopId": shopId});
                    eventShowDetails.fire();
                    console.log('test1');
            },
})