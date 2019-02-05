/**
 * Created by BRITENET on 04.02.2019.
 */

({

    onInit : function(component){
         var action = component.get("c.hasCurrentUserAdminProfile");

              action.setCallback(this, function(response){
                  var state = response.getState();
                  if(state === "SUCCESS"){
                      let isAdmin = response.getReturnValue();
                      console.log("is admin returnValue: "+ isAdmin);
                      component.set("v.isAdmin", isAdmin);
                  }
                  else{
                  }
              })
              $A.enqueueAction(action);
    },

    loadCarImages: function(component){
        var selectedCarId = component.get("v.carId");
        if(selectedCarId != null){
            var action = component.get("c.getImages");
            action.setParams({
                "carId" : selectedCarId
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state === "SUCCESS"){
                    component.set("v.carImages", response.getReturnValue());
                }else{
                    console.log("Error geting images, ");
                }
            });
            $A.enqueueAction(action);
        }
    },

    setMainPicture: function(component, carId, pictureId){
        var action = component.get("c.setCarMainPictureId");
        action.setParams({
            carId : carId,
            pictureId : pictureId
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS")
            {
                component.find('carImages').reloadRecord(true);
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Image set as primary');
                }else{
                    resultsToast.setParams({
                        "title": "Success",
                        "message": "Image set as primary"
                    });
                    resultsToast.fire();
                }
            }else{
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Error when loading car images');
                }else{
                    resultsToast.setParams({
                        "title": "Error",
                        "message": "Image couldn't be set as primary"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);

    },
    deleteCarImage: function(component, imageId){
        var action = component.get("c.removeCarImage");
        action.setParams({
            imageId: imageId,
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS")
            {
                this.loadCarImages(component);
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Image removed');
                }else{
                    resultsToast.setParams({
                        "title": "Success",
                        "message": "Image deleted"
                    });
                    resultsToast.fire();
                }
            }else{
                let resultsToast = $A.get("e.force:showToast");
                if ($A.util.isUndefined(resultsToast)){
                    alert('Error when deleteing image');
                }else{
                    resultsToast.setParams({
                        "title": "Error",
                        "message": "Image couldn't be deleted"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
})