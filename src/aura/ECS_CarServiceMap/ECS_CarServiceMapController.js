/**
 * Created by BRITENET on 13.02.2019.
 */
({
    init: function (component, event, helper) {
        let carBrand = component.get("v.car.ECS_Brand__c");
        let longitude = component.get("v.car.ECS_Service_Location__Longitude__s");
        let latitude = component.get("v.car.ECS_Service_Location__Latitude__s")

        component.set('v.mapMarkers', [
            {
                location: {
                    'Latitude':latitude,
                    'Longitude':longitude
                },

                icon: 'custom:custom20',
                title: carBrand +' Service',
                description: ''
            }

        ]);
        component.set('v.markersTitle', 'City');
    }
})