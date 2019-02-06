/**
 * Created by BRITENET on 06.02.2019.
 */

public with sharing class ECS_Utils {
    public static User getCurrentUser() {
        String currentUserId = UserInfo.getUserId();
        return [SELECT id, Name, AccountId, Email, ContactId FROM User WHERE Id = :currentUserId];
    }
}