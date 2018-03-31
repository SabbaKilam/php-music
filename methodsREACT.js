/*global L*/
/*global m*/
/*global v*/
/*global c*/
//============================//
//////////////////////////////////////////
c.setResize = (m) => {
  m.width = window.innerWidth
  m.height = window.innerHeight
}
c.showResize = ({controlsAssembly, controlsHolder, pictureHolder, player}) => {
  m.busyResizing = true
  const isPortrait = m.height >= m.width;
  if(isPortrait){
    controlsHolder.attribs(`class=portraitBottom`)
    pictureHolder.attribs(`class=portraitTop`)
    controlsAssembly
      .styles
        (`height: 60%`)
        (`top: 47%`)
    const controlsSpecs = controlsHolder.getBoundingClientRect()
    v.player.styles(`bottom: ${controlsSpecs.top/1.2}px`)(`top: auto`)      
  }
  else{
    controlsHolder.attribs(`class=landscapeRight`)
    pictureHolder.attribs(`class=landscapeLeft`)
    controlsAssembly
      .styles
        (`height: 55%`)
        (`top: 20%;`)
    const controlsSpecs = controlsHolder.getBoundingClientRect()
    v.player.styles(`top: ${controlsSpecs.bottom/1.345}px`)(`bottom: auto`)    
  }
  setTimeout(()=>{
    m.busyResizing = false    
  },200)

}
///////////////////////////////////////
c.showInfo = ({info}) => {
  const msg = `${m.id}: ${m.type}, prior event: ${m.priorType[1]}`
  //const msg = `${m.id}: ${m.type}, clicked?: ${m.clicked}`
  
  info.innerText = msg;
}
//////////////////////////////////////////
c.setPlay = (m)=>{
  if(m.busyResizing){return}
  m.playing = true
}
c.showPlay = ({player})=>{
  if(m.busyResizing){return}
  c.playChosenSong()
}
//////////////////////////////////////////