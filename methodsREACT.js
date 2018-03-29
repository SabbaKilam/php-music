/*global L*/
/*global m*/
/*global v*/
/*global c*/
//============================//
//////////////////////////////////////////
c.setResize = (m) => {
  m.width = window.innerWidth
}
///////////////////////////////////////
c.showInfo = ({info}) => {
  const msg = `${m.id}: ${m.type}, prior event: ${m.priorType[1]}`
  //const msg = `${m.id}: ${m.type}, clicked?: ${m.clicked}`
  
  info.innerText = msg;
}
//////////////////////////////////////////
