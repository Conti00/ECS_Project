/**
 * Created by BRITENET on 19.12.2018.
 */

public with sharing class ECS_ShopSearchController {

    @AuraEnabled
    public static List<Account> getSelectedShops(Account searchedShop) {
        searchedShop.BillingCountry = searchedShop.BillingCountry == null ? '' : searchedShop.BillingCountry;
        return [
                SELECT id,name, BillingCity, Website, BillingCountry, ECS_Location__Latitude__s, ECS_Location__Longitude__s
                FROM Account
                WHERE
                Name LIKE :'%' + searchedShop.Name + '%' AND
                ECS_Location__Latitude__s != null AND
                ECS_Location__Longitude__s != null
        ] ;
    }

    @AuraEnabled
    public static Account getShopDetailsById(String shopId) {
        return [SELECT Id, Name, Phone, Website, BillingCity, BillingCountry FROM Account WHERE Id = :shopId];
    }

    @AuraEnabled
    public static List<Account> getAllAccounts() {
        return [
                SELECT id, name, BillingCity, Website, BillingCountry, ECS_Location__Latitude__s, ECS_Location__Longitude__s
                FROM Account
                WHERE ECS_Location__Latitude__s != null AND
                ECS_Location__Longitude__s != null
                LIMIT 20
        ];
    }

}


