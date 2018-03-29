/*global L*/
/*global m*/
/*global v*/
/*global c*/

///////////////////////////////////////////////
c.updateModel = (eventObject) => {
  c.setMetaEvents(eventObject, m);  
  const functionQualifiers = {
    setResize:        [m.resized],
    uploadFiles:      [m.source === v.fileElement, m.type === 'change'],
    playChosenSong:   [m.source === v.documentSelector, m.type === 'change'],
    hideMusicPlayer:  [m.source === v.player, m.type === 'ended'],
    //setXYY:          [],
    //setXYZ:          [],    
  }
  L.runQualifiedFunctions(functionQualifiers, m, v, c)
	c.updateView(v);
};
//-----------------------------//
c.updateView = (v) => {
  c.showInfo(v)
	//-----------------//
	if(!m.resized){
	  window.localStorage.setItem(`model`, JSON.stringify(m));	  
	}
};
/////////////////////////////////////////
c.setMetaEvents = (eventObject, model) => {
  let o = model;//model is "passed by reference"
	o.id = eventObject.target.id;
	o.source = eventObject.target
	o.eventObject = eventObject;
	//add current event object, discard oldest event object:
	o.eventArray.unshift(o.eventObject);
  o.eventArray.pop();
	
  o.type = eventObject.type;
	//add current, discard oldest:  
  o.priorType.unshift(o.type);
  o.priorType.pop();
  
  o.pressed = o.type === 'mousedown' || o.type === 'touchstart';
	//add current, discard oldest: 
  o.priorPressed.unshift(o.pressed);
  o.priorPressed.pop();
  
  o.released = o.type === 'mouseup' || o.type === 'touchend';
	//add current, discard oldest: 
	o.priorReleased.unshift(o.released);
	o.priorReleased.pop();
	
  o.moved = o.type === 'mousemove' || o.type === 'touchmove';
	//add current, discard oldest:
	o.priorMoved.unshift(o.moved);
	o.priorMoved.pop();

  o.startTime = Date.now();
  o.elapsedTime = o.startTime - o.priorStartTime;
  o.elapsedMinSec = L.secToMinSec(60 * o.elapsedTime);
  o.priorStartTime = o.startTime;
  
  o.resized = (
    o.type === 'resize' ||
    o.type === 'load' ||
    o.type === 'DOMContentLoaded' ||
    o.type === 'orientationchange' 
  );
  /*
    m.CLICK_TIME_MIN = 25 //in milliseconds
    m.CLICK_TIME_MAX = 750 //milliseconds
  */
  o.clicked = (
      o.released &&    
      o.elapsedTime >= o.CLICK_TIME_MIN &&
      o.elapsedTime <= o.CLICK_TIME_MAX &&
      (
        o.priorType[1] === `touchstart` ||
        o.priorType[1] ==`mousedown`||
        o.priorType[1] === `touchmove` ||
        o.priorType[1] ==`mousemove`
      )
  );
  /*
  if(!o.moved){
    console.log(o)
  }
  */
};
//======================================//





