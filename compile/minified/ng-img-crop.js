/*! ngImgCrop v0.2.0 License: MIT */!function(){"use strict";var e=angular.module("ngImgCrop",[]);e.factory("cropAreaCircle",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._boxResizeBaseSize=20,this._boxResizeNormalRatio=.9,this._boxResizeHoverRatio=1.2,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._boxResizeNormalSize=this._boxResizeBaseSize*this._boxResizeNormalRatio,this._boxResizeHoverSize=this._boxResizeBaseSize*this._boxResizeHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize={w:0,h:0},this._boxResizeIsHover=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype.getType=function(){return"circle"},t.prototype._calcCirclePerimeterCoords=function(e){var t=this.getCenterPoint(),i=this.getSize(),s=e*(Math.PI/180),r=t.x+i.w/2*Math.cos(s),a=t.y+i.h/2*Math.sin(s);return[r,a]},t.prototype._calcResizeIconCenterCoords=function(){return this._calcCirclePerimeterCoords(-45)},t.prototype._isCoordWithinArea=function(e){var t=this.getCenterPoint();return Math.sqrt((e[0]-t.x)*(e[0]-t.x)+(e[1]-t.y)*(e[1]-t.y))<this._size.h/2},t.prototype._isCoordWithinBoxResize=function(e){var t=this._calcResizeIconCenterCoords(),i=this._boxResizeHoverSize/2;return e[0]>t[0]-i&&e[0]<t[0]+i&&e[1]>t[1]-i&&e[1]<t[1]+i},t.prototype._drawArea=function(e,t,i){e.arc(t.x,t.y,i.h/2,0,2*Math.PI)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments);var t=this.getCenterPoint();this._cropCanvas.drawIconMove([t.x,t.y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio),this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(),this._boxResizeBaseSize,this._boxResizeIsHover?this._boxResizeHoverRatio:this._boxResizeNormalRatio)},t.prototype.processMouseMove=function(e,t){var i="default",s=!1;if(this._boxResizeIsHover=!1,this._areaIsHover=!1,this._areaIsDragging)this.setCenterPoint({x:e-this._posDragStartX,y:t-this._posDragStartY}),this._areaIsHover=!0,i="move",s=!0,this._events.trigger("area-move");else if(this._boxResizeIsDragging){i="nesw-resize";var r,a,o;a=e-this._posResizeStartX,o=this._posResizeStartY-t,r=a>o?this._posResizeStartSize.h+2*o:this._posResizeStartSize.w+2*a;var n=this.getCenterPoint();this.setSize(Math.max(this._minSize.h,r)),this.setCenterPoint(n),this._boxResizeIsHover=!0,s=!0,this._events.trigger("area-resize")}else this._isCoordWithinBoxResize([e,t])?(i="nesw-resize",this._areaIsHover=!1,this._boxResizeIsHover=!0,s=!0):this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,s=!0);return angular.element(this._ctx.canvas).css({cursor:i}),s},t.prototype.processMouseDown=function(e,t){this._isCoordWithinBoxResize([e,t])?(this._areaIsDragging=!1,this._areaIsHover=!1,this._boxResizeIsDragging=!0,this._boxResizeIsHover=!0,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start")):this._isCoordWithinArea([e,t])&&(this._areaIsDragging=!0,this._areaIsHover=!0,this._boxResizeIsDragging=!1,this._boxResizeIsHover=!1,this._posDragStartX=e-this.getCenterPoint().x,this._posDragStartY=t-this.getCenterPoint().y,this._events.trigger("area-move-start"))},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._boxResizeIsDragging&&(this._boxResizeIsDragging=!1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._boxResizeIsHover=!1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropAreaRectangle",["cropArea",function(e){var t=function(){e.apply(this,arguments),this._resizeCtrlBaseRadius=10,this._resizeCtrlNormalRatio=.75,this._resizeCtrlHoverRatio=1,this._iconMoveNormalRatio=.9,this._iconMoveHoverRatio=1.2,this._resizeCtrlNormalRadius=this._resizeCtrlBaseRadius*this._resizeCtrlNormalRatio,this._resizeCtrlHoverRadius=this._resizeCtrlBaseRadius*this._resizeCtrlHoverRatio,this._posDragStartX=0,this._posDragStartY=0,this._posResizeStartX=0,this._posResizeStartY=0,this._posResizeStartSize={w:0,h:0},this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._resizeCtrlIsDragging=-1,this._areaIsDragging=!1};return t.prototype=new e,t.prototype.getType=function(){return"rectangle"},t.prototype._calcRectangleCorners=function(){var e=this.getSize(),t=this.getSouthEastBound();return[[e.x,e.y],[t.x,e.y],[e.x,t.y],[t.x,t.y]]},t.prototype._calcRectangleDimensions=function(){var e=this.getSize(),t=this.getSouthEastBound();return{left:e.x,top:e.y,right:t.x,bottom:t.y}},t.prototype._isCoordWithinArea=function(e){var t=this._calcRectangleDimensions();return e[0]>=t.left&&e[0]<=t.right&&e[1]>=t.top&&e[1]<=t.bottom},t.prototype._isCoordWithinResizeCtrl=function(e){for(var t=this._calcRectangleCorners(),i=-1,s=0,r=t.length;r>s;s++){var a=t[s];if(e[0]>a[0]-this._resizeCtrlHoverRadius&&e[0]<a[0]+this._resizeCtrlHoverRadius&&e[1]>a[1]-this._resizeCtrlHoverRadius&&e[1]<a[1]+this._resizeCtrlHoverRadius){i=s;break}}return i},t.prototype._drawArea=function(e,t,i){e.rect(i.x,i.y,i.w,i.h)},t.prototype.draw=function(){e.prototype.draw.apply(this,arguments);var t=this.getCenterPoint();this._cropCanvas.drawIconMove([t.x,t.y],this._areaIsHover?this._iconMoveHoverRatio:this._iconMoveNormalRatio);for(var i=this._calcRectangleCorners(),s=0,r=i.length;r>s;s++){var a=i[s];this._cropCanvas.drawIconResizeCircle(a,this._resizeCtrlBaseRadius,this._resizeCtrlIsHover===s?this._resizeCtrlHoverRatio:this._resizeCtrlNormalRatio)}},t.prototype.processMouseMove=function(e,t){var i="default",s=!1;if(this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._areaIsDragging)this.setCenterPoint({x:e-this._posDragStartX,y:t-this._posDragStartY}),this._areaIsHover=!0,i="move",s=!0,this._events.trigger("area-move");else if(this._resizeCtrlIsDragging>-1){var r=this.getSize(),a=this.getSouthEastBound();switch(this._resizeCtrlIsDragging){case 0:this.setSizeByCorners({x:e,y:t},{x:a.x,y:a.y}),i="nwse-resize";break;case 1:this.setSizeByCorners({x:r.x,y:t},{x:e,y:a.y}),i="nesw-resize";break;case 2:this.setSizeByCorners({x:e,y:r.y},{x:a.x,y:t}),i="nesw-resize";break;case 3:this.setSizeByCorners({x:r.x,y:r.y},{x:e,y:t}),i="nwse-resize"}this._resizeCtrlIsHover=this._resizeCtrlIsDragging,s=!0,this._events.trigger("area-resize")}else{var o=this._isCoordWithinResizeCtrl([e,t]);if(o>-1){switch(o){case 0:i="nwse-resize";break;case 1:i="nesw-resize";break;case 2:i="nesw-resize";break;case 3:i="nwse-resize"}this._areaIsHover=!1,this._resizeCtrlIsHover=o,s=!0}else this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,s=!0)}return angular.element(this._ctx.canvas).css({cursor:i}),s},t.prototype.processMouseDown=function(e,t){var i=this._isCoordWithinResizeCtrl([e,t]);if(i>-1)this._areaIsDragging=!1,this._areaIsHover=!1,this._resizeCtrlIsDragging=i,this._resizeCtrlIsHover=i,this._posResizeStartX=e,this._posResizeStartY=t,this._posResizeStartSize=this._size,this._events.trigger("area-resize-start");else if(this._isCoordWithinArea([e,t])){this._areaIsDragging=!0,this._areaIsHover=!0,this._resizeCtrlIsDragging=-1,this._resizeCtrlIsHover=-1;var s=this.getCenterPoint();this._posDragStartX=e-s.x,this._posDragStartY=t-s.y,this._events.trigger("area-move-start")}},t.prototype.processMouseUp=function(){this._areaIsDragging&&(this._areaIsDragging=!1,this._events.trigger("area-move-end")),this._resizeCtrlIsDragging>-1&&(this._resizeCtrlIsDragging=-1,this._events.trigger("area-resize-end")),this._areaIsHover=!1,this._resizeCtrlIsHover=-1,this._posDragStartX=0,this._posDragStartY=0},t}]),e.factory("cropAreaSquare",["cropArea","cropAreaRectangle",function(e,t){var i=function(){t.apply(this,arguments)};return i.prototype=new t,i.prototype.getType=function(){return"square"},i.prototype.processMouseMove=function(e,t){var i="default",s=!1;if(this._resizeCtrlIsHover=-1,this._areaIsHover=!1,this._areaIsDragging)this.setCenterPoint({x:e-this._posDragStartX,y:t-this._posDragStartY}),this._areaIsHover=!0,i="move",s=!0,this._events.trigger("area-move");else if(this._resizeCtrlIsDragging>-1){var r,a;switch(this._resizeCtrlIsDragging){case 0:r=-1,a=-1,i="nwse-resize";break;case 1:r=1,a=-1,i="nesw-resize";break;case 2:r=-1,a=1,i="nesw-resize";break;case 3:r=1,a=1,i="nwse-resize"}var o,n=(e-this._posResizeStartX)*r,h=(t-this._posResizeStartY)*a;o=n>h?this._posResizeStartSize.w+h:this._posResizeStartSize.h+n;var c=this.getCenterPoint();this.setSize(Math.max(this._minSize.w,o)),this.setCenterPoint(c),this._resizeCtrlIsHover=this._resizeCtrlIsDragging,s=!0,this._events.trigger("area-resize")}else{var g=this._isCoordWithinResizeCtrl([e,t]);if(g>-1){switch(g){case 0:i="nwse-resize";break;case 1:i="nesw-resize";break;case 2:i="nesw-resize";break;case 3:i="nwse-resize"}this._areaIsHover=!1,this._resizeCtrlIsHover=g,s=!0}else this._isCoordWithinArea([e,t])&&(i="move",this._areaIsHover=!0,s=!0)}return angular.element(this._ctx.canvas).css({cursor:i}),s},i}]),e.factory("cropArea",["cropCanvas",function(e){var t=function(t,i){this._ctx=t,this._events=i,this._aspectRatio=null,this._minSize={x:0,y:0,w:80,h:80},this._cropCanvas=new e(t),this._image=new Image,this._size={x:0,y:0,w:200,h:200}};return t.prototype.getImage=function(){return this._image},t.prototype.setImage=function(e){this._image=e},t.prototype.getSize=function(){return this._size},t.prototype.setSize=function(e){e=this._processSize(e),this._size=this._preventBoundaryCollision(e)},t.prototype.setSizeByCorners=function(e,t){var i={x:e.x,y:e.y,w:t.x-e.x,h:t.y-e.y};this.setSize(i)},t.prototype.getSouthEastBound=function(){return this._southEastBound(this.getSize())},t.prototype.getMinSize=function(){return this._minSize},t.prototype.getCenterPoint=function(){var e=this.getSize();return{x:e.x+e.w/2,y:e.y+e.h/2}},t.prototype.setCenterPoint=function(e){var t=this.getSize();this.setSize({x:e.x-t.w/2,y:e.y-t.h/2,w:t.w,h:t.h})},t.prototype.setAspectRatio=function(e){this._aspectRatio=e,this._minSize=this._processSize(this._minSize),this.setSize(this._minSize)},t.prototype.setMinSize=function(e){this._minSize=this._processSize(e),this.setSize(this._minSize)},t.prototype.getType=function(){return"circle"},t.prototype._preventBoundaryCollision=function(e){var t=this._ctx.canvas.height,i=this._ctx.canvas.width,s={x:e.x,y:e.y},r=this._southEastBound(e);s.x<0&&(s.x=0),s.y<0&&(s.y=0),r.x>i&&(r.x=i),r.y>t&&(r.y=t);var a={x:s.x,y:s.y,w:r.x-s.x,h:r.y-s.y};a.w<this._minSize.w&&(a.w=this._minSize.w,r=this._southEastBound(a),r.x>i&&(r.x=i,s.x=Math.max(r.x-i,r.x-this._minSize.w),a={x:s.x,y:s.y,w:r.x-s.x,h:r.y-s.y})),a.h<this._minSize.h&&(a.h=this._minSize.h,r=this._southEastBound(a),r.y>t&&(r.y=t,s.y=Math.max(r.y-t,r.y-this._minSize.h),a={x:s.x,y:s.y,w:r.x-s.x,h:r.y-s.y}));var o=this.getType();if("circle"===o||"square"===o)a={x:a.x,y:a.y,w:Math.min(a.w,a.h),h:Math.min(a.w,a.h)};else if("rectangle"===o&&null!==this._aspectRatio){var t=this._ctx.canvas.height,n=a.w/this._aspectRatio;t>n&&r.y<t?a.h=a.w/this._aspectRatio:a.w=a.h*this._aspectRatio}return a},t.prototype._drawArea=function(){},t.prototype._processSize=function(e){return"number"==typeof e&&(e={w:e,h:e}),{x:e.x||this._minSize.x,y:e.y||this._minSize.y,w:e.w||this._minSize.w,h:e.h||this._minSize.h}},t.prototype._southEastBound=function(e){return{x:e.x+e.w,y:e.y+e.h}},t.prototype.draw=function(){this._cropCanvas.drawCropArea(this._image,this.getCenterPoint(),this._size,this._drawArea)},t.prototype.processMouseMove=function(){},t.prototype.processMouseDown=function(){},t.prototype.processMouseUp=function(){},t}]),e.factory("cropCanvas",[function(){var e=[[-.5,-2],[-3,-4.5],[-.5,-7],[-7,-7],[-7,-.5],[-4.5,-3],[-2,-.5]],t=[[.5,-2],[3,-4.5],[.5,-7],[7,-7],[7,-.5],[4.5,-3],[2,-.5]],i=[[-.5,2],[-3,4.5],[-.5,7],[-7,7],[-7,.5],[-4.5,3],[-2,.5]],s=[[.5,2],[3,4.5],[.5,7],[7,7],[7,.5],[4.5,3],[2,.5]],r=[[-1.5,-2.5],[-1.5,-6],[-5,-6],[0,-11],[5,-6],[1.5,-6],[1.5,-2.5]],a=[[-2.5,-1.5],[-6,-1.5],[-6,-5],[-11,0],[-6,5],[-6,1.5],[-2.5,1.5]],o=[[-1.5,2.5],[-1.5,6],[-5,6],[0,11],[5,6],[1.5,6],[1.5,2.5]],n=[[2.5,-1.5],[6,-1.5],[6,-5],[11,0],[6,5],[6,1.5],[2.5,1.5]],h={areaOutline:"#fff",resizeBoxStroke:"#fff",resizeBoxFill:"#444",resizeBoxArrowFill:"#fff",resizeCircleStroke:"#fff",resizeCircleFill:"#444",moveIconFill:"#fff"};return function(c){var g=function(e,t,i){return[i*e[0]+t[0],i*e[1]+t[1]]},u=function(e,t,i,s){c.save(),c.fillStyle=t,c.beginPath();var r,a=g(e[0],i,s);c.moveTo(a[0],a[1]);for(var o in e)o>0&&(r=g(e[o],i,s),c.lineTo(r[0],r[1]));c.lineTo(a[0],a[1]),c.fill(),c.closePath(),c.restore()};this.drawIconMove=function(e,t){u(r,h.moveIconFill,e,t),u(a,h.moveIconFill,e,t),u(o,h.moveIconFill,e,t),u(n,h.moveIconFill,e,t)},this.drawIconResizeCircle=function(e,t,i){var s=t*i;c.save(),c.strokeStyle=h.resizeCircleStroke,c.lineWidth=2,c.fillStyle=h.resizeCircleFill,c.beginPath(),c.arc(e[0],e[1],s,0,2*Math.PI),c.fill(),c.stroke(),c.closePath(),c.restore()},this.drawIconResizeBoxBase=function(e,t,i){var s=t*i;c.save(),c.strokeStyle=h.resizeBoxStroke,c.lineWidth=2,c.fillStyle=h.resizeBoxFill,c.fillRect(e[0]-s/2,e[1]-s/2,s,s),c.strokeRect(e[0]-s/2,e[1]-s/2,s,s),c.restore()},this.drawIconResizeBoxNESW=function(e,s,r){this.drawIconResizeBoxBase(e,s,r),u(t,h.resizeBoxArrowFill,e,r),u(i,h.resizeBoxArrowFill,e,r)},this.drawIconResizeBoxNWSE=function(t,i,r){this.drawIconResizeBoxBase(t,i,r),u(e,h.resizeBoxArrowFill,t,r),u(s,h.resizeBoxArrowFill,t,r)},this.drawCropArea=function(e,t,i,s){var r=e.width/c.canvas.width,a=e.height/c.canvas.height,o=i.x,n=i.y;c.save(),c.strokeStyle=h.areaOutline,c.lineWidth=2,c.beginPath(),s(c,t,i),c.stroke(),c.clip(),i.w>0&&i.w>0&&c.drawImage(e,o*r,n*a,i.w*r,i.h*a,o,n,i.w,i.h),c.beginPath(),s(c,t,i),c.stroke(),c.clip(),c.restore()}}}]),e.factory("cropHost",["$document","cropAreaCircle","cropAreaSquare","cropAreaRectangle",function(e,t,i,s){var r=function(e){var t=e.getBoundingClientRect(),i=document.body,s=document.documentElement,r=window.pageYOffset||s.scrollTop||i.scrollTop,a=window.pageXOffset||s.scrollLeft||i.scrollLeft,o=s.clientTop||i.clientTop||0,n=s.clientLeft||i.clientLeft||0,h=t.top+r-o,c=t.left+a-n;return{top:Math.round(h),left:Math.round(c)}};return function(a,o,n){function h(){c.clearRect(0,0,c.canvas.width,c.canvas.height),null!==g&&(c.drawImage(g,0,0,c.canvas.width,c.canvas.height),c.save(),c.fillStyle="rgba(0, 0, 0, 0.65)",c.fillRect(0,0,c.canvas.width,c.canvas.height),c.restore(),u.draw())}var c=null,g=null,u=null,l=this,p=[100,100],_=[300,300],z={w:200,h:200},v=function(){if(null!==g){u.setImage(g);var e=[g.width,g.height],t=g.width/g.height,i=e;i[0]>_[0]?(i[0]=_[0],i[1]=i[0]/t):i[0]<p[0]&&(i[0]=p[0],i[1]=i[0]/t),i[1]>_[1]?(i[1]=_[1],i[0]=i[1]*t):i[1]<p[1]&&(i[1]=p[1],i[0]=i[1]*t),a.prop("width",i[0]).prop("height",i[1]).css({"margin-left":-i[0]/2+"px","margin-top":-i[1]/2+"px"});var s=c.canvas.width,r=c.canvas.height,o=l.getAreaType();"circle"===o||"square"===o?s=r=Math.min(s,r):"rectangle"===o&&null!==u._aspectRatio&&(r=s/u._aspectRatio),u.setSize({w:Math.min(200,s/2),h:Math.min(200,r/2)}),u.setCenterPoint({x:c.canvas.width/2,y:c.canvas.height/2})}else a.prop("width",0).prop("height",0).css({"margin-top":0});h()},f=function(e){if(null!==g){var t,i,s=r(c.canvas);"touchmove"===e.type?(t=e.changedTouches[0].pageX,i=e.changedTouches[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseMove(t-s.left,i-s.top),h()}},d=function(e){if(e.preventDefault(),e.stopPropagation(),null!==g){var t,i,s=r(c.canvas);"touchstart"===e.type?(t=e.changedTouches[0].pageX,i=e.changedTouches[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseDown(t-s.left,i-s.top),h()}},y=function(e){if(null!==g){var t,i,s=r(c.canvas);"touchend"===e.type?(t=e.changedTouches[0].pageX,i=e.changedTouches[0].pageY):(t=e.pageX,i=e.pageY),u.processMouseUp(t-s.left,i-s.top),h()}};this.getResultImage=function(){var e,t;t=angular.element("<canvas></canvas>")[0],e=t.getContext("2d");var i=this.getResultImageSize();t.width=i.w,t.height=i.h;var s=u.getCenterPoint(),r={dataURI:null,imageData:null};return null!==g&&(e.drawImage(g,(s.x-u.getSize().w/2)*(g.width/c.canvas.width),(s.y-u.getSize().h/2)*(g.height/c.canvas.height),u.getSize().w*(g.width/c.canvas.width),u.getSize().h*(g.height/c.canvas.height),0,0,i.w,i.h),r.dataURI=t.toDataURL(),r.imageData=t.getContext("2d").getImageData(0,0,t.width,t.height),r.imageSize={w:g.width,h:g.height,x:Math.round(u.getSize().x*g.width/c.canvas.width),y:Math.round(u.getSize().y*g.height/c.canvas.height)},r.cropImageSize={w:c.canvas.width,h:c.canvas.height,x:Math.round(u.getSize().x),y:Math.round(u.getSize().y)}),r},this.setNewImageSource=function(e){if(g=null,v(),n.trigger("image-updated"),e){var t=new Image;t.onload=function(){n.trigger("load-done"),g=t,v(),n.trigger("image-updated")},t.onerror=function(){n.trigger("load-error")},n.trigger("load-start"),t.src=e}},this.setMaxDimensions=function(e,t){if(_=[e,t],null!==g){var i=c.canvas.width,s=c.canvas.height,r=[g.width,g.height],o=g.width/g.height,n=r;n[0]>_[0]?(n[0]=_[0],n[1]=n[0]/o):n[0]<p[0]&&(n[0]=p[0],n[1]=n[0]/o),n[1]>_[1]?(n[1]=_[1],n[0]=n[1]*o):n[1]<p[1]&&(n[1]=p[1],n[0]=n[1]*o),a.prop("width",n[0]).prop("height",n[1]).css({"margin-left":-n[0]/2+"px","margin-top":-n[1]/2+"px"});var l=c.canvas.width/i,z=c.canvas.height/s,v=Math.min(l,z);u.setSize({w:u.getSize().w*v,h:u.getSize().h*v});var f=u.getCenterPoint();u.setCenterPoint({x:f.x*l,y:f.y*z})}else a.prop("width",0).prop("height",0).css({"margin-top":0});h()},this.setAspectRatio=function(e){angular.isUndefined(e)||(e=parseFloat(e),isNaN(e)||(u.setAspectRatio(e),h()))},this.setAreaMinSize=function(e){angular.isUndefined(e)||(e={w:parseInt(e.w,10),h:parseInt(e.h,10)},isNaN(e.w)||isNaN(e.h)||(u.setMinSize(e),h()))},this.getResultImageSize=function(){return"selection"==z?u.getSize():z},this.setResultImageSize=function(e){if(!angular.isUndefined(e)){if(angular.isString(e)&&isNaN(parseFloat(e)))return z=e,void 0;var t=parseInt(e,10);e=isNaN(t)?{w:parseInt(e.w,10),h:parseInt(e.h,10)}:{w:t,h:t},isNaN(e.w)||isNaN(e.h)||(z=e,h())}},this.getAreaType=function(){return u.getType()},this.setAreaType=function(e){var r=u.getCenterPoint(),a=u.getSize(),o=u.getMinSize(),l=r.x,p=r.y,_=t;"square"===e?_=i:"rectangle"===e&&(_=s),u=new _(c,n),u.setMinSize(o),u.setSize(a),u.setCenterPoint({x:l,y:p}),null!==g&&u.setImage(g),h()},c=a[0].getContext("2d"),u=new t(c,n),e.on("mousemove",f),a.on("mousedown",d),e.on("mouseup",y),e.on("touchmove",f),a.on("touchstart",d),e.on("touchend",y),this.destroy=function(){e.off("mousemove",f),a.off("mousedown",d),e.off("mouseup",f),e.off("touchmove",f),a.off("touchstart",d),e.off("touchend",f),a.remove()}}}]),e.factory("cropPubSub",[function(){return function(){var e={};this.on=function(t,i){return t.split(" ").forEach(function(t){e[t]||(e[t]=[]),e[t].push(i)}),this},this.trigger=function(t,i){return angular.forEach(e[t],function(e){e.call(null,i)}),this}}}]),e.directive("imgCrop",["$timeout","cropHost","cropPubSub",function(e,t,i){return{restrict:"E",scope:{image:"=",resultImage:"=",resultWidth:"=",resultHeight:"=",resultX:"=",resultY:"=",originalWidth:"=",originalHeight:"=",originalCropX:"=",originalCropY:"=",originalCropWidth:"=",originalCropHeight:"=",resultImageData:"=",changeOnFly:"=",areaType:"@",areaMinSize:"=",resultImageSize:"=",onChange:"&",onLoadBegin:"&",onLoadDone:"&",onLoadError:"&"},template:"<canvas></canvas>",controller:["$scope",function(e){e.events=new i}],link:function(i,s){var r,a=i.events,o=new t(s.find("canvas"),{},a),n=function(e){var t=o.getResultImage(),i=t.dataURI;r!==i&&(r=i,angular.isDefined(e.resultImage)&&(e.resultImage=i),angular.isDefined(e.resultImageData)&&(e.resultImageData=t.imageData),updateAreaCoords(e),angular.isDefined(e.areaCoords)&&(e.resultWidth=Math.round(e.areaCoords.w),e.resultHeight=Math.round(e.areaCoords.h),e.resultX=Math.round(e.areaCoords.x),e.resultY=Math.round(e.areaCoords.y),angular.isDefined(t.imageSize)&&(e.originalWidth=t.imageSize.w,e.originalHeight=t.imageSize.h,e.originalCropX=t.imageSize.x,e.originalCropY=t.imageSize.y,angular.isDefined(t.cropImageSize)&&(e.originalCropWidth=Math.round(e.resultWidth*e.originalWidth/t.cropImageSize.w),e.originalCropHeight=Math.round(e.resultHeight*e.originalHeight/t.cropImageSize.h)))),e.onChange({$dataURI:e.resultImage,$imageData:e.resultImageData}))},h=function(t){return function(){e(function(){i.$apply(function(e){t(e)})})}};a.on("load-start",h(function(e){e.onLoadBegin({})})).on("load-done",h(function(e){e.onLoadDone({})})).on("load-error",h(function(e){e.onLoadError({})})).on("area-move area-resize",h(function(e){e.changeOnFly&&n(e)})).on("area-move-end area-resize-end image-updated",h(function(e){n(e)})),i.$watch("image",function(){o.setNewImageSource(i.image)}),i.$watch("areaType",function(){o.setAreaType(i.areaType),n(i)}),i.$watch("aspectRatio",function(){o.setAspectRatio(i.aspectRatio),n(i)}),i.$watch("areaMinSize",function(){o.setAreaMinSize(i.areaMinSize),n(i)}),i.$watch("resultImageSize",function(){o.setResultImageSize(i.resultImageSize),n(i)}),i.$watch(function(){return[s[0].clientWidth,s[0].clientHeight]},function(e){o.setMaxDimensions(e[0],e[1]),n(i)},!0),i.$on("$destroy",function(){o.destroy()})}}}])}();