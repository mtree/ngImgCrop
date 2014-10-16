'use strict';

crop.directive('imgCrop', ['$timeout', 'cropHost', 'cropPubSub', function($timeout, CropHost, CropPubSub) {
  return {
    restrict: 'E',
    scope: {
      image: '=',
      resultImage: '=',
      resultWidth: '=',
      resultHeight: '=',
      resultX: '=',
      resultY: '=',
      
      originalWidth: '=',
      originalHeight: '=',
      originalCropX: '=',
      originalCropY: '=',
      originalCropWidth: '=',
      originalCropHeight: '=',
      
      
      
      resultImageData: '=',

      changeOnFly: '=',
      areaType: '@',
      areaMinSize: '=',
      resultImageSize: '=',

      onChange: '&',
      onLoadBegin: '&',
      onLoadDone: '&',
      onLoadError: '&'
    },
    template: '<canvas></canvas>',
    controller: function($scope/*, $attrs, $element*/) {
      $scope.events = new CropPubSub();
    },
    link: function(scope, element/*, attrs*/) {
      // Init Events Manager
      var events = scope.events;

      // Init Crop Host
      var cropHost=new CropHost(element.find('canvas'), {}, events);

      // Store Result Image to check if it's changed
      var storedResultImage;

      var updateResultImage=function(scope) {
        var resultImageObj=cropHost.getResultImage();
        var resultImage = resultImageObj.dataURI;
        if(storedResultImage!==resultImage) {
          storedResultImage=resultImage;
          if(angular.isDefined(scope.resultImage)) {
            scope.resultImage=resultImage;
          }
          if(angular.isDefined(scope.resultImageData)) {
            scope.resultImageData=resultImageObj.imageData;
          }

          updateAreaCoords(scope);
          if(angular.isDefined(scope.areaCoords)){
			  //Dimensions of resized cropped image 
			  scope.resultWidth = Math.round(scope.areaCoords.w);
			  scope.resultHeight =Math.round(scope.areaCoords.h);
			  scope.resultX = Math.round(scope.areaCoords.x);
			  scope.resultY =Math.round(scope.areaCoords.y);
		  
		  
          
			  if(angular.isDefined(resultImageObj.imageSize)){
				  //Dimensions of original image
				  scope.originalWidth = resultImageObj.imageSize.w;
				  scope.originalHeight = resultImageObj.imageSize.h;
				  
				  //Position of crop  on original image
				  scope.originalCropX = resultImageObj.imageSize.x;
				  scope.originalCropY = resultImageObj.imageSize.y;
				  
				  if(angular.isDefined(resultImageObj.cropImageSize)){
					  //Dimensions of original cropped image
					  scope.originalCropWidth = Math.round( (scope.resultWidth*scope.originalWidth) / resultImageObj.cropImageSize.w ); 
					  scope.originalCropHeight = Math.round( (scope.resultHeight*scope.originalHeight) / resultImageObj.cropImageSize.h ); 
				  }  
			  }         
		  }
		           
			  
          
          scope.onChange({
            $dataURI: scope.resultImage,
            $imageData: scope.resultImageData
          });

        }
      };

      // Wrapper to safely exec functions within $apply on a running $digest cycle
      var fnSafeApply=function(fn) {
        return function(){
          $timeout(function(){
            scope.$apply(function(scope){
              fn(scope);
            });
          });
        };
      };

      // Setup CropHost Event Handlers
      events
        .on('load-start', fnSafeApply(function(scope){
          scope.onLoadBegin({});
        }))
        .on('load-done', fnSafeApply(function(scope){
          scope.onLoadDone({});
        }))
        .on('load-error', fnSafeApply(function(scope){
          scope.onLoadError({});
        }))
        .on('area-move area-resize', fnSafeApply(function(scope){
          if(!!scope.changeOnFly) {
            updateResultImage(scope);
          }
        }))
        .on('area-move-end area-resize-end image-updated', fnSafeApply(function(scope){
          updateResultImage(scope);
        }));

      // Sync CropHost with Directive's options
      scope.$watch('image',function(){
        cropHost.setNewImageSource(scope.image);
      });
      scope.$watch('areaType',function(){
        cropHost.setAreaType(scope.areaType);
        updateResultImage(scope);
      });
      scope.$watch('aspectRatio',function(){
        cropHost.setAspectRatio(scope.aspectRatio);
        updateResultImage(scope);
      });
      scope.$watch('areaMinSize',function(){
        cropHost.setAreaMinSize(scope.areaMinSize);
        updateResultImage(scope);
      });
      scope.$watch('resultImageSize',function(){
        cropHost.setResultImageSize(scope.resultImageSize);
        updateResultImage(scope);
      });

      // Update CropHost dimensions when the directive element is resized
      scope.$watch(
        function () {
          return [element[0].clientWidth, element[0].clientHeight];
        },
        function (value) {
          cropHost.setMaxDimensions(value[0],value[1]);
          updateResultImage(scope);
        },
        true
      );

      // Destroy CropHost Instance when the directive is destroying
      scope.$on('$destroy', function(){
          cropHost.destroy();
      });
    }
  };
}]);
