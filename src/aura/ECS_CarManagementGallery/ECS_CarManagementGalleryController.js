/**
 * Created by BRITENET on 04.02.2019.
 */

({
    onInit: function(component, event, helper){
       helper.loadCarImages(component);
       helper.onInit(component);
    },

    handleUploadFinished: function (component, event, helper) {
        var uploadedFiles = event.getParam("files");
        helper.loadCarImages(component);
    },

    onCarIdChange: function(component,event,helper){
        helper.loadCarImages(component);
    },

    setAsMainPicture: function(component, event, helper){
        var pictureId = event.getSource().get("v.value");
        var carId = component.get("v.carId");
        console.log("car id: "+carId);
        console.log("id kliknietego zdjecia: "+event.getSource().get("v.value"));
        helper.setMainPicture(component, carId, pictureId);
    },

    deleteImage : function(component, event, helper){
        var imageId = event.getSource().get("v.value");
        console.log("delete pressed, picId: "+imageId);
        helper.deleteCarImage(component, imageId);
    },

    openAllFiles: function(component, event, helper){
        var imagesIds = component.get("v.carImages");
        $A.get('e.lightning:openFiles').fire({
            recordIds: imagesIds,
            selectedRecordId: imagesIds[0]
        });
    },
})