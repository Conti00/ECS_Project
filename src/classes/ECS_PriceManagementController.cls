/**
 * Created by BRITENET on 26.02.2019.
 */


public with sharing class ECS_PriceManagementController {

    @AuraEnabled
    public static Pricebook2[] getCarsPricebooks() {
        return [
                SELECT Id, ECS_BeginDate__c, ECS_EndDate__c, ECS_CurrentlyActive__c, Name, ECS_DiscountType__c, ECS_DiscountValue__c
                FROM Pricebook2
                WHERE IsActive = true AND IsStandard = false ORDER By ECS_BeginDate__c
        ];

    }

    @AuraEnabled
    public static PricebookEntry[] getPricebookEntriesByPricebookId(String pricebookId){
        return [
                SELECT Id, Name, UnitPrice, Product2.Name,Product2.ECS_Model__c, Pricebook2.Name, Pricebook2Id
                FROM PricebookEntry
                WHERE Pricebook2Id = :pricebookId
        ];
    }

    @AuraEnabled
    public static void setSingleCarDiscount(String carId, Decimal discountedPrice, String startDate, String endDate, String discountName, Decimal discountedAmount, Decimal percentDiscount) {
        String discountValue;
        String discountType;
        if(discountedAmount == 0 ){
            discountedAmount = null;
        }
        if(percentDiscount == 0 ){
            percentDiscount = null;
        }
        system.debug('given params: ' + carId + ' ' + discountedPrice + ' ' + startDate + ' ' + endDate+ ' ' +discountName+ ' ' +discountedAmount+ ' ' +percentDiscount);
        if (discountName == null || discountName.length() == 0) {
            discountName = 'Discount: ' + String.valueOf(startDate) + ' - ' + String.valueOf(endDate);
        }
        if (discountedAmount == null && percentDiscount == null){
            discountValue = 'Custom Price '+String.valueOf(discountedPrice)+' '+UserInfo.getDefaultCurrency();
            discountType = 'Custom Discount';
        }
        else if (discountedAmount == null && percentDiscount != null){
            discountType = 'Percentage';
            discountValue = '-'+String.valueOf(percentDiscount)+'%';
        }else{
            discountType = 'Amount';
            discountValue = '-'+String.valueOf(discountedAmount)+' '+UserInfo.getDefaultCurrency();
        }
        Pricebook2 discountPricebook = new Pricebook2();
        discountPricebook.IsActive = true;
        discountPricebook.Name = discountName;
        discountPricebook.ECS_BeginDate__c = Date.valueOf(startDate);
        discountPricebook.ECS_EndDate__c = Date.valueOf(endDate);
        discountPricebook.ECS_DiscountValue__c = discountValue;
        discountPricebook.ECS_DiscountType__c = discountType;
        system.debug(discountPricebook);

        try {
            insert discountPricebook;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating discount Pricebook');
        }

        PricebookEntry carDiscountedPricebookEntry = new PricebookEntry();
        carDiscountedPricebookEntry.Pricebook2Id = discountPricebook.Id;
        carDiscountedPricebookEntry.Product2Id = carId;
        carDiscountedPricebookEntry.UnitPrice = Integer.valueOf(discountedPrice);
        carDiscountedPricebookEntry.IsActive = true;
        system.debug(carDiscountedPricebookEntry);

        try {
            insert carDiscountedPricebookEntry;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating PriceEntry');
        }
    }

    @AuraEnabled
    public static String createNewDiscount(String carIds, Decimal discountedAmount, Decimal percentDiscount, String startDate, String endDate, String discountName) {
        List<String> carIdsList = (List<String>)JSON.deserialize(carIds, List<String>.class);
        if(discountedAmount == 0 ){
            discountedAmount = null;
        }
        if(percentDiscount == 0 ){
            percentDiscount = null;
        }
        String discountType;
        String discountValue;
        if (discountName == null || discountName.length() == 0) {
            discountName = 'Discount: ' + String.valueOf(startDate) + ' - ' + String.valueOf(endDate);
        }
        if (discountedAmount == null && percentDiscount != null){
            discountType = 'Percentage';
            discountValue = '-'+String.valueOf(percentDiscount)+'%';
        }else{
            discountType = 'Amount';
            discountValue = '-'+String.valueOf(discountedAmount)+' '+UserInfo.getDefaultCurrency();
        }
        Pricebook2 discountPricebook = new Pricebook2();
        discountPricebook.IsActive = true;
        discountPricebook.Name = discountName;
        discountPricebook.ECS_BeginDate__c = Date.valueOf(startDate);
        discountPricebook.ECS_EndDate__c = Date.valueOf(endDate);
        discountPricebook.ECS_DiscountType__c = discountType;
        discountPricebook.ECS_DiscountValue__c = discountValue;

        try {
            insert discountPricebook;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating discount Pricebook');
        }

        List<PricebookEntry> carsPricebookEntrys = new List<PricebookEntry>();
        for (String carId : carIdsList) {
            PricebookEntry carDiscountedPricebookEntry = new PricebookEntry();
            carDiscountedPricebookEntry.Pricebook2Id = discountPricebook.Id;
            carDiscountedPricebookEntry.Product2Id = carId;
            carDiscountedPricebookEntry.UnitPrice = getDiscountedCarPrice(carId, discountedAmount, percentDiscount);
            carDiscountedPricebookEntry.IsActive = true;
            carsPricebookEntrys.add(carDiscountedPricebookEntry);
        }
        try {
            insert carsPricebookEntrys;
        } catch (DmlException e) {
            throw new AuraHandledException('Error creating PriceEntry');
        }
        return String.valueOf(carsPricebookEntrys.size());

    }

    @AuraEnabled
    public static List<ECS_Wrappers.ECS_PriceManagerItem> getDiscountsWithCoveredProducts(){
        List<ECS_Wrappers.ECS_PriceManagerItem> priceManagerItems = new List<ECS_Wrappers.ECS_PriceManagerItem>();
        List<Pricebook2> pricebooks = getCarsPricebooks();
        List<String> pricebookIds = new List<String>();
        for (Pricebook2 pb : pricebooks) {
            pricebookIds.add(pb.Id);
        }
        List<PricebookEntry> entries = [SELECT Id, Name, UnitPrice, Product2.Name,Product2.ECS_Model__c, Product2.ECS_ImageID__c, Pricebook2.Name,Pricebook2.ECS_CurrentlyActive__c, Pricebook2Id
        FROM PricebookEntry
        WHERE Pricebook2Id IN :pricebookIds];

        for (Pricebook2 pricebook : pricebooks) {
            List<PricebookEntry> pricebookPriceEntries = new List<PricebookEntry>();
            for (PricebookEntry ent : entries) {
                if (ent.Pricebook2Id == pricebook.Id) {
                    pricebookPriceEntries.add(ent);
                }
            }
            ECS_Wrappers.ECS_PriceManagerItem priceBookItem = new ECS_Wrappers.ECS_PriceManagerItem(pricebook, pricebookPriceEntries);
            priceManagerItems.add(priceBookItem);
        }
        return priceManagerItems;
    }

    @AuraEnabled
    public static String deleteDiscounts(List<String> discountsIds){
        system.debug('given list: '+discountsIds);
        List<Pricebook2> pricebooks = [SELECT id FROM Pricebook2 WHERE id IN :discountsIds];

        try {
            delete pricebooks;
            return String.valueOf(pricebooks.size());
        } catch (DmlException e) {
            return 'ERROR';
        }
    }

    @AuraEnabled
    public static List<ECS_Wrappers.ECS_CartItem> getCarsWithStandardPrice(List<String> carIds){
        List<Product2> cars = [SELECT Id,Name,ECS_Model__c,ECS_ProductionYear__c,ECS_VinNumber__c,ECS_ImageID__c
        FROM Product2
        WHERE Id IN :carIds];
        List<ECS_Wrappers.ECS_CartItem> carItems = new List<ECS_Wrappers.ECS_CartItem>();
        for (Product2 car : cars) {
            String carStandardPrice = ECS_CarsManagerController.getCarStandardPrice(car.Id);
            carItems.add(new ECS_Wrappers.ECS_CartItem(car, carStandardPrice));
        }
        return carItems;
    }

    @AuraEnabled
    public static String deletePricebookEntryByIds(List<String> pbEntryId){

        List<PricebookEntry> entriesToDelete = [SELECT Id FROM PricebookEntry WHERE Id IN :pbEntryId];

        try{
            delete entriesToDelete;
            return String.valueOf(entriesToDelete.size());
        }catch (DmlException e){
            throw new AuraHandledException('Error deleting PricebookEntries');
        }


    }

    private static Decimal getDiscountedCarPrice(String carId, Decimal discountedAmount, Decimal percentDiscount) {

        Decimal currentPrice = Decimal.valueOf(ECS_CarsManagerController.getCarStandardPrice(carId));
        system.debug('carId: '+carId+' discountedAmount: '+discountedAmount+' percent: '+percentDiscount);
        if (discountedAmount == null && percentDiscount != null) {
            system.debug('get Price: PERCENT');
            return currentPrice - ((currentPrice * percentDiscount) / 100);
        }
        if (discountedAmount != null && percentDiscount == null) {
            system.debug('get Price: Amount');
            return currentPrice - discountedAmount;
        }
        return 0;
    }
}