/**
 * Created by BRITENET on 18.12.2018.
 */

public with sharing class ECS_PublicSiteController {

    public String siteURL {get; set;}

    public ECS_PublicSiteController(ApexPages.standardController controller){
    siteURL = Site.getBaseUrl();

}}