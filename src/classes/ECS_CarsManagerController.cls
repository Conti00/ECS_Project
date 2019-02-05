/**
 * Created by BRITENET on 01.02.2019.
 */

public with sharing class ECS_CarsManagerController {


    @AuraEnabled
    public static List<Product2> getCarsList(Product2 searchedCar) {
        return Database.query(generateQueryStringForSearchedCars(searchedCar));
    }

    @AuraEnabled
    public static String removeCar(Product2 carToDelete) {
        if (carToDelete != null) {
            try {
                delete carToDelete;
                return 'SUCCESS';
            } catch (DmlException e) {
                return 'ERROR';
            }
        } else {
            return 'ERROR';
        }
    }

    private static String generateQueryStringForSearchedCars(Product2 searchedCar) {
        String queryString;
        String conditionsSection = '';
        queryString = 'SELECT Id, Name, ECS_VinNumber__c, ECS_ProductionYear__c, ECS_Model__c, ECS_ImageID__c, ' +
                'ECS_EngineSize__c, ECS_FuelType__c, ECS_BodyStyle__c, ECS_Transmission__c, Description, ' +
                'ECS_BatteryCapacity__c' + ' FROM Product2 ';
        queryString += (String.isBlank(searchedCar.Name) &&
                String.isBlank(searchedCar.ECS_VinNumber__c) &&
                searchedCar.ECS_ProductionYear__c == null &&
                String.isBlank(searchedCar.ECS_Model__c)) ? '' : 'WHERE ';

        conditionsSection += String.isBlank(searchedCar.Name) ? '' : 'Name LIKE \'%' + searchedCar.Name + '%\'';
        conditionsSection += String.isNotBlank(conditionsSection) && String.isNotBlank(searchedCar.ECS_VinNumber__c) ? ' AND ' : '' ;
        conditionsSection += String.isBlank(searchedCar.ECS_VinNumber__c) ? '' : 'ECS_VinNumber__c LIKE \'%' + searchedCar.ECS_VinNumber__c + '%\'';
        conditionsSection += String.isNotBlank(conditionsSection) && searchedCar.ECS_ProductionYear__c != null ? ' AND ' : '' ;
        conditionsSection += searchedCar.ECS_ProductionYear__c == null ? '' : 'ECS_ProductionYear__c LIKE \'%' + searchedCar.ECS_ProductionYear__c + '%\'';
        conditionsSection += String.isNotBlank(conditionsSection) && String.isNotBlank(searchedCar.ECS_Model__c) ? ' AND ' : '' ;
        conditionsSection += String.isBlank(searchedCar.ECS_Model__c) ? '' : 'ECS_Model__c = \'' + searchedCar.ECS_Model__c + '\'';


        queryString += conditionsSection == null ? '' : conditionsSection;
        system.debug('query string: ' + queryString);
        return queryString;
    }

    @AuraEnabled
    public static List<String> getImages(String carId) {
        List<ContentDocumentLink> linksList = [SELECT contentDocumentId FROM ContentDocumentLink WHERE linkedEntityId = :carId];
        List<String> documentsIds = new List<String>();
        for (ContentDocumentLink contentLink : linksList) {
            documentsIds.add(contentLink.contentDocumentId);
        }
        return documentsIds;
    }

    @AuraEnabled
    public static String setCarMainPictureId(String carId, String pictureId) {
        Product2 car = [SELECT id,name, ECS_ImageID__c FROM Product2 WHERE id = :carId];
        car.ECS_ImageID__c = pictureId;
        try {
            update car;
            return 'SUCCESS';
        } catch (DmlException e) {
            system.debug('error');
            return 'ERROR';
        }
    }
    @AuraEnabled
    public static String removeCarImage(String imageId) {
        system.debug('on removeCar Apex: picid to delete: ' + imageId);
        ContentDocument picture = [SELECT id FROM ContentDocument WHERE id = :imageId];
        try {
            delete picture;
            system.debug('on delete!!');
            return 'SUCCESS';
        } catch (DmlException e) {
            return 'ERROR';
        }
    }

    @AuraEnabled
    public static String getBaseUrlString() {
//        return URL.getSalesforceBaseUrl().toExternalForm();
//        return URL.getSalesforceBaseUrl().getHost();
        return ECS_Setting__c.getInstance('ECS_InstanceUrl').ECS_InstanceUrl__c;
    }

    @AuraEnabled
    public static Boolean hasCurrentUserAdminProfile() {
        Profile profile = [SELECT Id FROM Profile WHERE Name = 'System Administrator'];
        return UserInfo.getProfileId() == profile.Id ? true : false;
    }
}