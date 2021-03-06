//let prefixfree = require('prefixfree');
let   m = {};
const v = {};
const c = {};
/*global L*/

//===================================//
c.initialize = (eventObject) => {
  m.musicFilesUrl = `https://php-music-sabbakilam1.c9users.io/uploads/` 
  
  if(window.localStorage.getItem(`model`)){
	//m = JSON.parse(window.localStorage.getItem(`model`));
  }
  
  c.getFileList()
  window.id = 'window';
	window.document.id = `document`;
	L.attachAllElementsById(v);
  
	const eventTypes = [
		'play',
		'pause',
		'ended',
		'mousedown',
		'touchstart',
		'mouseup',
		'touchend',
		'mousemove',
		'touchmove',
		'input',
		'change',
		'resize',
    	'orientationchange',
		'load',
		'DOMContentLoaded',
		'online',
		'offline',
	];
	
	//Update the model in reponse to events
	for (let eventType of eventTypes) {
		window.addEventListener(eventType, c.updateModel, true);
	}
	
	L.noPinchZoom();
  
	//Update the view continously if needed
	//L.loopCall(c.updateView, 16.666667, v);
	c.setResize(m)
	c.showResize(v)
};
//============================//

// meta events
m.eventArray = [{},{},{}];
m.priorType = ["","","",];
m.priorPressed = [false, false, false];
m.priorReleased = [false, false, false];
m.priorMoved = [false, false, false];

m.eventObject = {target:{id:"none"}, type: "none" };

m.source = m.eventObject.target;
m.id = m.eventObject.target.id;

m.type = m.eventObject.type;

m.pressed = m.type === 'mousedown' || m.type === 'touchstart';

m.released = m.type === 'mouseup' || m.type === 'touchend';

m.moved = m.type === 'mousemove' || m.type === 'touchmove';

m.priorStartTime;
m.startTime = Date.now();
m.elapsedTime = m.startTime - m.priorStartTime;
m.priorStartTime = m.startTime;

m.resized = true;
m.clicked = false;

m.width = window.innerWidth
m.height = window.innerHeight


// app states
m.CLICK_TIME_MIN = 25; //in milliseconds
m.CLICK_TIME_MAX = 750; //milliseconds
m.MAX_WIDTH = 411;//pixels

m.defaultBackground = 'images/twostalks.gif'
m.fractionArray = [];
m.averageUploadFraction = 0;
m.uploadPath = `../uploads/`;
m.musicFilesUrl = `https://php-music-sabbakilam1.c9users.io/uploads/`
m.busyChangingSongs = false
m.busyResizing = false
m.playing = false
//============================//










