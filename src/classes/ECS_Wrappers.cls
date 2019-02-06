/**
 * Created by BRITENET on 05.02.2019.
 */

    global with sharing class ECS_Wrappers {
        global class ECS_CartItem{
            @AuraEnabled
            global Datetime meetingDate {get; set;}
            @AuraEnabled
            global Product2 car {get; set;}
            @AuraEnabled
            global String carPrice {get; set;}

            global ECS_CartItem(Product2 car, Date meetingDate, String carPrice){
                this.car = car;
                this.meetingDate = meetingDate;
                this.carPrice = carPrice;
            }

            global ECS_CartItem(Product2 car, Date meetingDate){
                this.car = car;
                this.meetingDate = meetingDate;
            }
            global ECS_CartItem(Product2 car, String carPrice){
                this.car = car;
                this.carPrice = carPrice;
            }

            global ECS_CartItem(Product2 car){
                this.car = car;
            }
        }

        global class ECS_ProductMeeting{
            @AuraEnabled
            global Event event {get; set;}
            @AuraEnabled
            global Product2 car {get; set;}
            @AuraEnabled
            global User salesRep {get; set;}


            global ECS_ProductMeeting(Event event, Product2 car){
                this.car = car;
                this.event = event;
            }

            global ECS_ProductMeeting(Event event, Product2 car, User salesRep){
                this.car = car;
                this.event = event;
                this.salesRep = salesRep;
            }
        }

        global class ECS_PriceManagerItem{
            @AuraEnabled
            global Pricebook2 pricebook {get; set;}
            @AuraEnabled
            global List<PricebookEntry> priceEntries {get; set;}

            global ECS_PriceManagerItem(Pricebook2 pricebook, List<PricebookEntry> priceEntries){
                this.pricebook = pricebook;
                this.priceEntries = priceEntries;
            }
        }

        public class ECS_EventQueryResult{
            @AuraEnabled
            public Decimal totalSize {get; set;}
            @AuraEnabled
            public Boolean done {get; set;}
            @AuraEnabled
            public List<Event> records {get; set;}
        }



    }