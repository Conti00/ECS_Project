/**
 * Created by BRITENET on 04.02.2019.
 */

({
    onInit: function(component, event, helper){
       helper.loadCarImages(component);
       helper.onInit(component);
    },

    handleUploadFinished: function (component, event, helper) {
        let uploadedFiles = event.getParam("files");
        helper.loadCarImages(component);
    },

    onCarIdChange: function(component,event,helper){
        helper.loadCarImages(component);
    },

    setAsMainPicture: function(component, event, helper){
        helper.setMainPicture(component, event);
    },

    deleteImage : function(component, event, helper){
        helper.deleteCarImage(component, event);
    },

    openAllFiles: function(component, event, helper){
        let imagesIds = component.get("v.carImages");
        $A.get('e.lightning:openFiles').fire({
            recordIds: imagesIds,
            selectedRecordId: imagesIds[0]
        });
    },
})