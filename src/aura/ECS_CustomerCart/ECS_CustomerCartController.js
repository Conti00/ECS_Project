/**
 * Created by BRITENET on 05.02.2019.
 */

({
    init: function (component, event, helper) {
            helper.loadCustomerCartItems(component);
            console.log('tosetmee IDS: '+JSON.stringify(component.get("v.carIdToSetMeetingDate")));
            console.log('selected IDS: '+JSON.stringify(component.get("v.selectedCarsIds")));
    },

    deleteCartItem: function (component, event, helper) {
        let listOfSelectedIds = component.get("v.selectedCarsIds");
        let carId = event.getSource().get("v.value");
        if(!listOfSelectedIds.includes(carId)){
            console.log('ten ID nie był zaznaczony, dodam go do listy');
            listOfSelectedIds.push(carId);
            component.set("v.selectedCarsIds", listOfSelectedIds);
            console.log('po dodaniu do listy: '+JSON.stringify(component.get("v.selectedCarsIds")));
        }
        console.log('zmienna przechowuje liste: '+JSON.stringify(listOfSelectedIds));
        helper.removeCartItem(component, listOfSelectedIds);
    },

    openSetMeetingDateModal: function(component, event){
        let listOfIds = component.get("v.selectedCarsIds");
        component.set("v.meetingDatePickerVisible", false);
        component.set("v.meetingDatePickerVisible", true);
        let carId = event.getSource().get("v.value");
        if(!listOfIds.includes(carId)){
            listOfIds.push(carId);
            component.set("v.selectedCarsIds", listOfIds);
        }
        component.find("meetingDatePicker").show();
    },
    closeSetMeetingDateModal: function(component, event){
        component.find("meetingDatePicker").hide();
    },

    saveMeetingDate: function(component, event, helper){
        console.log('before save: '+JSON.stringify(component.get("v.selectedCarsIds")));
        let listOfIds = component.get("v.selectedCarsIds");
        let meetingDate = component.get("v.meetingDate");
        helper.setMeetingDate(component, listOfIds, meetingDate);
    },

    redirectToDetailsPage: function(component, event, helper){
        let carId = event.getSource().get("v.value");
        console.log('button params-----:'+carId);
        let urlEvent = $A.get("e.force:navigateToURL");
           urlEvent.setParams({
             "url": "/search-cars?id="+carId
           });
           urlEvent.fire();
    },

        redirectToSearch: function(component, event, helper){
            let urlEvent = $A.get("e.force:navigateToURL");
               urlEvent.setParams({
                 "url": "/search-cars"
               });
               urlEvent.fire();
        },

                redirectToOrders: function(component, event, helper){
                    let urlEvent = $A.get("e.force:navigateToURL");
                       urlEvent.setParams({
                         "url": "/orders"
                       });
                       urlEvent.fire();
                },

    sendCarItemsToCheckout: function(component, event, helper){
        console.log('items: '+JSON.stringify(component.get("v.customerCartItems")));
        console.log(JSON.stringify(component.get("v.selectedCarsIds")));
        helper.proceedCheckout(component);
    },

    onCartItemSelect: function(component, event, helper){
        let carId = event.getSource().get("v.value");
        let listOfSelectedIds = component.get("v.selectedCarsIds");
        if(event.getSource().get("v.checked") && !listOfSelectedIds.includes(carId)){
            listOfSelectedIds.push(carId);

        }else{
            for(let ii=0; ii<listOfSelectedIds.length; ii++){
                if(carId == listOfSelectedIds[ii]){
                    listOfSelectedIds.splice(ii, 1);
                }
            }
        }
        component.set("v.selectedCarsIds",listOfSelectedIds);
        console.log("selectedCarsIds       "+JSON.stringify(component.get("v.selectedCarsIds")));
    },

})