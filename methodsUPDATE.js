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
    setPlay:          [m.source === v.btnPlay, m.clicked],     
    playChosenSong:   [m.source === v.documentSelector, m.type === 'change'],
    respondToEnded:   [m.source === v.player, m.type === 'ended'],
    respondToPause:   [m.source === v.player, m.type === 'pause'],
    respondToPlay:    [m.source === v.player, m.type === 'play'],
    deleteFile:       [m.source === v.btnDelete, m.clicked],     
    //setXYZ:          [], 
    //setXYZ:          [], 
    //setXYZ:          [], 
    //setXYZ:          [], 
    
  }
  L.runQualifiedFunctions(functionQualifiers, m, v, c)
	//-----------------//
	if(!m.resized){
	  window.localStorage.setItem(`model`, JSON.stringify(m));	  
	}  
	c.updateView(v);
};
//-----------------------------//
c.updateView = (v) => {
  c.showInfo(v)
};
/////////////////////////////////////////
c.setMetaEvents = (eventObject, model) => {
  let m = model;//model is "passed by reference"
	m.id = eventObject.target.id;
	m.source = eventObject.target
	m.eventObject = eventObject;
	//add current event object, discard oldest event object:
	m.eventArray.unshift(m.eventObject);
  m.eventArray.pop();
	
  m.type = eventObject.type;
	//add current, discard oldest:  
  m.priorType.unshift(m.type);
  m.priorType.pop();
  
  m.pressed = m.type === 'mousedown' || m.type === 'touchstart';
	//add current, discard oldest: 
  m.priorPressed.unshift(m.pressed);
  m.priorPressed.pop();
  
  m.released = m.type === 'mouseup' || m.type === 'touchend';
	//add current, discard oldest: 
	m.priorReleased.unshift(m.released);
	m.priorReleased.pop();
	
  m.moved = m.type === 'mousemove' || m.type === 'touchmove';
	//add current, discard oldest:
	m.priorMoved.unshift(m.moved);
	m.priorMoved.pop();

  m.startTime = Date.now();
  m.elapsedTime = m.startTime - m.priorStartTime;
  m.elapsedMinSec = L.secToMinSec(60 * m.elapsedTime);
  m.priorStartTime = m.startTime;
  
  m.resized = (
    m.type === 'resize' ||
    m.type === 'load' ||
    m.type === 'DOMContentLoaded' ||
    m.type === 'orientationchange' 
  );
  /*
    m.CLICK_TIME_MIN = 25 //in milliseconds
    m.CLICK_TIME_MAX = 750 //milliseconds
  */
  m.clicked = (
      m.released &&    
      m.elapsedTime >= m.CLICK_TIME_MIN &&
      m.elapsedTime <= m.CLICK_TIME_MAX &&
      (
        m.priorType[1] === `touchstart` ||
        m.priorType[1] ==`mousedown`||
        m.priorType[1] === `touchmove` ||
        m.priorType[1] ==`mousemove`
      )
  );
  /*
  if(!m.moved){
    console.log(o)
  }
  */
};
//======================================//





