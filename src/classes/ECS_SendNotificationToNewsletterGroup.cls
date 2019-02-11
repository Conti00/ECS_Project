/**
 * Created by BRITENET on 11.02.2019.
 */

global with sharing class ECS_SendNotificationToNewsletterGroup implements Schedulable{

    global void execute(SchedulableContext schedulableContext){
        sendEmailsToNewsletterGroup();
    }

    public static void sendEmailsToNewsletterGroup(){

        List<String> mailToAddresses = new List<String>();
        EmailTemplate emailTemplate = new EmailTemplate();
        String content ='\n';
        List<User> users = [SELECT Email FROM User WHERE Id IN (
                SELECT UserOrGroupId
                FROM GroupMember
                WHERE Group.Name = :'Newsletter Group'
        )];

        for(User u : users){
            mailToAddresses.add(u.email);
        }


        List<Product2> listOfCars = [SELECT Name FROM Product2 ];
        for(integer i=0;i<listOfCars.size();i++){
            content = content + listOfCars[i].Name +'\n';
        }

        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.toAddresses = mailToAddresses;
        message.optOutPolicy = 'FILTER';
        message.subject = 'List of Available Cars';

        message.plainTextBody = 'Our Available Cars: '+content;
//
        Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);

        if (results[0].success) {
            System.debug('The email was sent successfully.');
        } else {
            System.debug('The email failed to send: ' + results[0].errors[0].message);
        }

    }

}