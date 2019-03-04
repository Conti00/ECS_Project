/**
 * Created by BRITENET on 28.02.2019.
 */

public with sharing class ECS_findCarToNewsletter {
    private final List<Product2> cars;

    public ECS_findCarToNewsletter() {
        cars = [select Name, ECS_ProductionYear__c, ECS_VinNumber__c, ECS_MainImageURL__c,
        (SELECT UnitPrice FROM PricebookEntries LIMIT 1) FROM Product2 where IsActive=true];

    }
    public List<Product2> getCars() {
        return cars;
    }
}