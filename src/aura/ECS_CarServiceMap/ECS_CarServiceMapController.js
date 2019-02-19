/**
 * Created by BRITENET on 13.02.2019.
 */
({
    init: function (cmp, event, helper) {
        let carBrand = cmp.get("v.car.ECS_Brand__c");

        cmp.set('v.mapMarkers', [
            {
                location: {
                    City: carBrand,
                    Country: 'Poland',
                },

                icon: 'custom:custom20',
                title: carBrand
            }

        ]);
        cmp.set('v.markersTitle', 'City');
    }
})