/**
 * Created by BRITENET on 08.02.2019.
 */


public with sharing class ECS_CasesController {
    @AuraEnabled
    public static List<Case> loadActiveCases(){
        User currentUser = ECS_Utils.getCurrentUser();
        List<Case> activeCases = [
                SELECT Id, Subject, Description, Status, CreatedDate, CaseNumber, ECS_Car__r.Name
                FROM Case
                WHERE ContactId =: currentUser.ContactId AND Status != 'Closed'
        ];

        return activeCases;
    }

    @AuraEnabled
    public static List<Case> loadSolvedCases(){
        User currentUser = ECS_Utils.getCurrentUser();
        List<Case> activeCases = [
                SELECT Id, Subject, Description, Status, CreatedDate, CaseNumber, ClosedDate, ECS_Car__r.Name
                FROM Case
                WHERE ContactId =: currentUser.ContactId AND Status = 'Closed'
        ];

        return activeCases;
    }

    @AuraEnabled
    public static List<String> getCaseTypePicklistValues(){
        List<String> options = new List<String>();
        Schema.DescribeFieldResult fieldResult = Case.Type.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry pleItem: ple) {
            options.add(pleItem.getLabel());
        }
        return options;
    }

    @AuraEnabled
    public static List<String> getCaseReasonPicklistValues(){
        List<String> options = new List<String>();
        Schema.DescribeFieldResult fieldResult = Case.Reason.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry pleItem: ple) {
            options.add(pleItem.getLabel());
        }
        return options;
    }
}