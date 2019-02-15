/**
 * Created by BRITENET on 13.02.2019.
 */
({
    init: function (cmp, event, helper) {
        cmp.set('v.mapMarkers', [
            {
                location: {
                    City: 'Kielce',
                    Country: 'Poland',
                    Street: 'IX wieków Kielc'
                },

                icon: 'custom:custom20',
                title: 'Kielce'
            },
            {
                            location: {
                                City: 'Ostrowiec Swietokrzyski',
                                Country: 'Poland'

                            },

                            icon: 'custom:custom22',
                            title: 'Ostrowiec Swietokrzyski'
                        },
            {
                            location: {
                                City: 'Radom',
                                Country: 'Poland'

                            },

                            icon: 'custom:custom23',
                            title: 'Radom'
                        },
            {
                            location: {
                                City: 'Lublin',
                                Country: 'Poland',
                            },

                            icon: 'custom:custom28',
                            title: 'Lublin'
                        },



        ]);
        cmp.set('v.markersTitle', 'City');
    }
})