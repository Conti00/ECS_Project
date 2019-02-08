/**
 * Created by BRITENET on 08.02.2019.
 */
({
    doInit: function(component, event, helper){
        helper.loadSolvedCases(component);
    },
    goToCaseDetailPage: function(component, event, helper){
        let caseId = event.currentTarget.dataset.caseid;
        let navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": caseId,
          "slideDevName": "related"
        });
        navEvt.fire();
    },
})