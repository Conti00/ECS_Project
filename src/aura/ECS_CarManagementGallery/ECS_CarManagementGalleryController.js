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
        let pictureId = event.getSource().get("v.value");
        let carId = component.get("v.carId");
        helper.setMainPicture(component, carId, pictureId);
    },

    deleteImage : function(component, event, helper){
        let imageId = event.getSource().get("v.value");
        helper.deleteCarImage(component, imageId);
    },

    openAllFiles: function(component, event, helper){
        let imagesIds = component.get("v.carImages");
        $A.get('e.lightning:openFiles').fire({
            recordIds: imagesIds,
            selectedRecordId: imagesIds[0]
        });
    },
})