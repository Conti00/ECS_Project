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
        queryString = 'SELECT Id, Name, ECS_VinNumber__c, ECS_ProductionYear__c, ECS_Model__c FROM Product2 ';
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
}