/**
 * Created by BRITENET on 26.02.2019.
 */

({
    doInit: function(component, event, helper){
//        component.find("searchForCarsModal").show();

    },
    openSearchForCarsModal: function(component, event, helper){
        component.find("searchForCarsModal").show();
    },
    onSearchedCarsRecived: function(component, event, helper){
        component.find("carList").set("v.cars", event.getParams().carsToDisplay);
    },
    onCarsIdsListRecived: function(component, event, helper){
        component.set("v.carIds", event.getParam("carIds"));
        component.set("v.selectedCars", event.getParam("cars"));
        component.find("searchForCarsModal").hide();
    },
    onNewDiscountSave: function(component, event, helper){
        helper.createNewDiscount(component);
    },
    onSelectedCarsChange: function(component, event, helper){
        helper.loadCarsWithStandardPrice(component);
    },
    onPercentInputValueChange: function(component, event, helper){
        component.set("v.amountDiscountValue", 0);
        let listSize = component.get("v.selectedCarsWithPriceObjects").length;
        let percentValue = event.getSource().get("v.value");
        for(let ii=0; ii<listSize; ii++){
            let newPrice = component.find("newCarPrice")[ii];
            let standardPrice = component.find("carPrice")[ii];
            newPrice.set("v.value", (standardPrice.get("v.value") - ((standardPrice.get("v.value")*percentValue)/100)));
//            component.find("newCarPrice")[ii].set("v.value", (component.find("carPrice")[ii].get("v.value") - ((component.find("carPrice")[ii].get("v.value")*percentValue)/100)));

        }
//        let maxIndex = component.get("v.selectedCarsWithPriceObjects").length;
//        console.log('auraid: '+component.find("newCarPrice")[1].get("v.value"));
//        let prizze = component.find("newCarPrice")[1];
//        prizze.set("v.value" , 10);

//        console.log(component.find("tableRow").get("v.body")[4].get("v.body")[0].get("v.value"));
//        currentTarget.dataset.index
    },
    onAmountInputValueChange: function(component, event, helper){
            component.set("v.percentDiscountValue", 0);
            var saveButton = component.find("createDiscountButton");
            let listSize = component.get("v.selectedCarsWithPriceObjects").length;
            let amountValue = event.getSource().get("v.value");

            for(var ii=0; ii<listSize; ii++){
                let newPrice = component.find("newCarPrice")[ii];
                let standardPrice = component.find("carPrice")[ii];
                newPrice.set("v.value", (standardPrice.get("v.value") - amountValue));
                if(newPrice.get("v.value") <= 0){
                    saveButton.set("v.disabled", true);
//                    component.find("createDiscountButton").set("v.disabled", true);
                    newPrice.set("v.value", 0);

                    component.find("discountAmountInput").set('v.validity',{valid:false, badInput:true});
                    let colorDiv = component.find("discountedPriceContainer")[ii];
                    $A.util.addClass(colorDiv , 'toggleColor');
//                    component.find("discountAmountInput").showHelpMessageIfInvalid();
//                    component.find("newPriceContainer")[ii].get("v.body")[0].set("v.style", "color:red" );
//                    console.log(JSON.stringify(component.find("newPriceContainer")[ii].get("v.body")[0].get("v.class")));
                }else{
                    component.find("createDiscountButton").set("v.disabled", false);
                    let colorDiv = component.find("discountedPriceContainer")[ii];
                    $A.util.removeClass(colorDiv , 'toggleColor');
//                    component.find("discountAmountInput").set('v.validity',{valid:true, badInput:false});
                }

            }
        },

        clearDiscountData: function(component){
            component.set("v.carIds",null);
            component.set("v.selectedCars",null);
        }
})