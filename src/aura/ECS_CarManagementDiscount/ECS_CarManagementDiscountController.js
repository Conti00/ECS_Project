/**
 * Created by BRITENET on 11.02.2019.
 */

({
    doInit: function(component, event, helper){
        component.set("v.carId", component.get("v.car.Id"));
        helper.getLowestPrice(component);
    },

    onDiscountAmountChange: function(component, event, helper){
        let amount = event.getSource().get("v.value");
        let currentPrice = component.get("v.carCurrentLowestPrice");
        let newPrice = currentPrice - amount;
        component.set("v.carNewPrice", newPrice );
    },
    onDiscountPercentChange: function(component, event, helper){
        let percent = event.getSource().get("v.value");
        let currentPrice = component.get("v.carCurrentLowestPrice");
        let newPrice = currentPrice- ((currentPrice * percent)/100);
        component.set("v.carNewPrice", newPrice );

    },
    onNewDiscountSave: function(component, event, helper){
        helper.createNewDiscount(component);
    },
})