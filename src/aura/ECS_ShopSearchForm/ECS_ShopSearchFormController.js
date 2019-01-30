/**
 * Created by BRITENET on 19.12.2018.
 */
({
    clickSearchShops: function(component, event, helper) {
            let searchedShop = component.get("v.searchedShop");
            helper.getShops(component, searchedShop);

            },

    clearForm: function(component, event, helper) {
            let searchedShop = component.get("v.searchedShop");
            searchedShop.Name = '';
            component.set("v.searchedShop", searchedShop);
            component.set("v.selectedShops",'');
            helper.showDetails(component, '');
            },

    showSpinner:function(component){
      component.set("v.IsSpinner",true);
    },

     hideSpinner:function(component){
      component.set("v.IsSpinner",false);
    },

})