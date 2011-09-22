/*
 Copyright (c) 2010, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.com/yui/license.html
 version: 3.3.0
 build: 3167
 */
YUI.add('scrollview-paginator',function(Y){var UI=Y.ScrollView.UI_SRC,INDEX="index",SCROLL_X="scrollX",TOTAL="total",BOUNDING_BOX="boundingBox",CONTENT_BOX="contentBox";function PaginatorPlugin(){PaginatorPlugin.superclass.constructor.apply(this,arguments);}
PaginatorPlugin.NAME='pluginScrollViewPaginator';PaginatorPlugin.NS='pages';PaginatorPlugin.ATTRS={selector:{value:null},index:{value:0},total:{value:0}};Y.extend(PaginatorPlugin,Y.Plugin.Base,{initializer:function(){var host,paginator=this;host=paginator._host=paginator.get('host');paginator.beforeHostMethod('_flickFrame',paginator._flickFrame);paginator.afterHostMethod('_uiDimensionsChange',paginator._calcOffsets);paginator.afterHostEvent('scrollEnd',paginator._scrollEnded);paginator.afterHostEvent('render',paginator._afterRender);paginator.after('indexChange',paginator._afterIndexChange);},_calcOffsets:function(){var host=this._host,cb=host.get(CONTENT_BOX),bb=host.get(BOUNDING_BOX),pageSelector=this.get("selector"),pages,offsets;pages=pageSelector?cb.all(pageSelector):cb.get("children");this.set(TOTAL,pages.size());this._pgOff=offsets=pages.get("offsetLeft");offsets.push(host._scrollWidth-bb.get("offsetWidth"));},_flickFrame:function(){var host=this._host,velocity=host._currentVelocity,inc=velocity<0,pageIndex=this.get(INDEX),pageCount=this.get(TOTAL);if(velocity){if(inc&&pageIndex<pageCount-1){this.set(INDEX,pageIndex+1);}else if(!inc&&pageIndex>0){this.set(INDEX,pageIndex-1);}}
return this._prevent;},_afterRender:function(e){var host=this._host;host.get("boundingBox").addClass(host.getClassName("paged"));},_scrollEnded:function(e){var host=this._host,pageIndex=this.get(INDEX),pageCount=this.get(TOTAL);if(e.onGestureMoveEnd&&!host._flicking){if(host._scrolledHalfway){if(host._scrolledForward&&pageIndex<pageCount-1){this.set(INDEX,pageIndex+1);}else if(pageIndex>0){this.set(INDEX,pageIndex-1);}else{this.snapToCurrent();}}else{this.snapToCurrent();}}
host._flicking=false;},_afterIndexChange:function(e){if(e.src!==UI){this._uiIndex(e.newVal);}},_uiIndex:function(index){this.scrollTo(index,350,'ease-out');},next:function(){var index=this.get(INDEX);if(index<this.get(TOTAL)-1){this.set(INDEX,index+1);}},prev:function(){var index=this.get(INDEX);if(index>0){this.set(INDEX,index-1);}},scrollTo:function(index,duration,easing){var host=this._host,x=host.get(SCROLL_X);if(host._scrollsHorizontal){x=this._pgOff[index];host.set(SCROLL_X,x,{duration:duration,easing:easing});}},snapToCurrent:function(){var host=this._host;host._killTimer();host.set(SCROLL_X,this._pgOff[this.get(INDEX)],{duration:300,easing:'ease-out'});},_prevent:new Y.Do.Prevent()});Y.namespace('Plugin').ScrollViewPaginator=PaginatorPlugin;},'3.3.0',{requires:['plugin']});