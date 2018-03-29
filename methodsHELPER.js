/*global L*/
/*global m*/
/*global v*/
/*global c*/

//=========================================================================//
c.getFileList = function (){
    const getter = new XMLHttpRequest()
    getter.open('POST', 'php/getFileList.php')
    getter.send()
    getter.onload = function(){
        if(getter.status === 200){
          c.fillDocumentSelector(getter.responseText)
          console.log(getter.responseText)          
        }
        else{
            alert('Trouble getting file list.')                  
        }
    }
}
//======================================================================//
c.fillDocumentSelector = function (filesString){
    const currentFilename = v.documentSelector.options[v.documentSelector.selectedIndex] && v.documentSelector.options[v.documentSelector.selectedIndex].innerText
    v.documentSelector.innerHTML = ''
    const filenameArray = filesString.split('\n')
    filenameArray.pop() // get rid of the blank last entry

    if(filenameArray.length === 0){
          const option = document.createElement('option')
          option.innerText = "(No Music Files)"
          v.documentSelector.appendChild(option) 
          v.player.styles(`visibility: hidden`)
    }
    else{
      filenameArray.forEach( filename =>{
          const option = document.createElement('option')
          option.innerText = filename
          v.documentSelector.appendChild(option)
      })    
    }

    v.documentSelector.selectedIndex = filenameArray.indexOf(currentFilename)
    v.documentSelector.selectedIndex === -1 ? v.documentSelector.selectedIndex = 0 : null

}

//=====================================================================//
c.uploadFiles =(eventObject)=>{
  if(  !(v.fileElement.files && v.fileElement.files[0]) ){return}
  let allFilesMp3 = Array.from(v.fileElement.files).every( file=> getExtention(file) === `mp3` )
  if(!allFilesMp3){
    alert(`Only .mp3 files allowed.`)
    return
  }
  //----| helper |------//
  function getExtention(file){
    let name = file.name
    let maxIndex = name.length -1
    let extLength = maxIndex - name.lastIndexOf(`.`)
    return name.slice(-extLength)
  }
  L.uploadFiles(c.showUploadProgress, v.fileElement, "php/uploadFile.php")
}
//===========================================//
c.showUploadProgress = (loaded, total, index)=>{
  const numberOfFiles = v.fileElement.files.length
  if(numberOfFiles === 0){return}
  const pct = Math.round(100 * m.averageUploadFraction)
  m.fractionArray[index] = loaded/total
  m.averageUploadFraction = m.fractionArray.reduce(function(sum, value){
      return sum + value/numberOfFiles
  }, 0)
  
  v.progressBar.styles(`width: ${pct}%`)
  
  console.log(`loaded: ${(100 * m.averageUploadFraction).toFixed(0)}`)
  if(  (loaded === 1 && total === 1) || pct === 100 ){// && index === (numberOfFiles-1)
    c.getFileList()     
    setTimeout(()=>{
      c.clearUploadData()
      v.progressBar.styles(`width: 0`)
    }, 1000) 
  }
}
//=============================================//
c.playChosenSong = () => {
  //
  const base = m.musicFilesUrl
  const index = v.documentSelector.selectedIndex
  const src = `${base}${v.documentSelector.options[index].innerText}`
  v.player.pause()
  setTimeout(()=>{//this delay improves performance
    v.player.src = src
    v.player.styles(`visibility: visible`)
    v.player.play()
  },25)
  
  v.background
    .styles
      (`background-image: url(${m.defaultBackground})`)
      (`background-size: cover`)    
  
  //attempt to show image
  var jsmediatags = window.jsmediatags  ;
  if(!jsmediatags){
    console.log("Can't find the 'jsmediatags' object.");
    console.log("Try https://github.com/aadsm/jsmediatags/tree/master/dist");
    return;
  }
  // url from local host
  const url = `${base}${v.documentSelector.options[index].innerText}`
  jsmediatags.read(url, {
    onSuccess: (tag) => {
      console.log(tag);
      let tags = tag.tags;
      //========================//
      var image = tags.picture;
      if (image) {
        const base64String = image.data.reduce((string, datum) => string += String.fromCharCode(datum), '');
        const pictureData = "data:" + image.format + ";base64," + window.btoa(base64String);
        v.background
          .styles
            (`background-image: url(${pictureData})`)
            (`background-size: contain`)
      }
      else{//no image
        console.log("No image found :(")
        v.background
          .styles
            (`background-image: url(${m.defaultBackground})`)
            (`background-size: cover`)
      }       
      //=========================//
    },
    onError: (error) => {
      console.log(error);
      return;
    }
  });  
  
}
//==========================================================//
c.clearUploadData = ()=>{
  m.fractionArray = [];
  m.averageUploadFraction = 0;
}
//================================================//
c.hideMusicPlayer = ()=>{
  v.player.styles(`visibility: hidden`)
  //clear out the image
  v.background
    .styles
      (`background-image: url(${m.defaultBackground})`)
      (`background-size: cover`)
}