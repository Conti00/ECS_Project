/**
 * Created by BRITENET on 20.12.2018.
 */

public with sharing class ECS_PostToChatterFromProcessBuilder {
        @InvocableMethod
        public static void createNewChatterPost(List<String> leadId){
            List<CollaborationGroup> publicGroups = [SELECT id,name FROM CollaborationGroup WHERE name='SalesRepsChatterGroup'];
            String groupId = publicGroups[0].Id;

            String instanceUrl = System.URL.getSalesforceBaseUrl().toExternalForm();
            List<Lead> givenLeads = [SELECT id,Name,Owner.Name, company,status,CreatedDate,CreatedBy.Name, LeadSource FROM Lead WHERE id IN :leadId];
            List<FeedItem> postsItems = new List<FeedItem>();
            for(Lead eachLead : givenLeads){
                String createDate = String.valueOf(eachLead.CreatedDate.date());
                String postBody = setPostBody(eachLead.Status, eachLead.Name, eachLead.Company, eachLead.Owner.Name, createDate, eachLead.LeadSource,eachLead.CreatedBy.Name);
                String postLinkUrl = instanceUrl+'/one/one.app#/sObject/'+eachLead.Id+'/view';
                postsItems.add(new FeedItem(
                        body=postBody,
                        type='LinkPost',
                        LinkUrl=postLinkUrl,
                        ParentId=groupId,
                        Title = 'Go to Lead ' +eachLead.Name
                ));
            }
            upsert postsItems;
        }

        private static String setPostBody(String leadStatus, String leadName, String leadCompany, String leadOwnerName, String leadCreateDate, String leadSource, String leadCreatedByName){
            String postBody = '';

            if (leadStatus == 'New' && leadSource != 'Web to Lead'){
                postBody = 'New Lead '+leadName+' was created at '+leadCreateDate+' by '+leadCreatedByName;
                return postBody;
            }
            else if (leadStatus == 'New' && leadSource == 'Web to Lead'){
                postBody = 'New Lead '+leadName+' was created at '+leadCreateDate+' by Web-to-Lead';
                return postBody;
            }
            else if (leadStatus == 'Send an offer'){
                postBody = 'An Offer was send to '+leadName+'\r\nCompany: '+leadCompany;
                return postBody;
            }
            else return null;
        }


    }