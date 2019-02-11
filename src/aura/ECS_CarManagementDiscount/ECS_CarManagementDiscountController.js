/**
 * Created by BRITENET on 11.02.2019.
 */

({
    doInit: function(component, event, helper){
//      component.set("v.carNewPrice", component.get("v.carCurrentLowestPrice"));
        component.set("v.carId", component.get("v.car.Id"));
        helper.getLowestPrice(component, component.get('v.car.Id'));
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
        console.log(" % "+percent);
        let newPrice = currentPrice- ((currentPrice * percent)/100);
        component.set("v.carNewPrice", newPrice );

    },
    onNewDiscountSave: function(component, event, helper){
        helper.createNewDiscount(component);

    },
})