/**
 * Created by BRITENET on 11.02.2019.
 */

global with sharing class ECS_SendNotificationToNewsletterGroup implements Schedulable {

    global void execute(SchedulableContext schedulableContext) {
        sendEmailsToNewsletterGroup();
    }

    public static void sendEmailsToNewsletterGroup() {

        List<String> mailToAddresses = new List<String>();
        EmailTemplate emailTemplate = [
                SELECT id, Subject, HtmlValue
                FROM EmailTemplate
                WHERE Name = 'AvailableCarsToNewsletter'
        ];
        List<User> users = [
                SELECT Email
                FROM User
                WHERE Id IN (
                        SELECT UserOrGroupId
                        FROM GroupMember
                        WHERE Group.Name = :'Newsletter Group'
                )
        ];

        for (User u : users) {
            mailToAddresses.add(u.email);
        }

        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        message.setTemplateId(emailTemplate.Id);
        message.toAddresses = mailToAddresses;
        message.setSubject(emailTemplate.Subject);
        message.setHtmlBody(emailTemplate.HtmlValue);
        message.setPlainTextBody(emailTemplate.Body);

        Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage>{
                message
        };
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);

    }
}