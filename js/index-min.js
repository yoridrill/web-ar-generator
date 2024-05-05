new Vue({el:"#app",data:{flgName:["fw","fs","fp","fk"],touchName:["ft","fg"],arData:[{openFlg:!1,tabOptionType:"effect",title:"床 (または球)",checks:[{label:"球体",flg:!1,img:"images/sphere.png"},{label:"回転",flg:!1,img:"images/rotate.gif"},{label:"ぽよ",flg:!1,img:"images/poyo.gif"},{label:"キラ",flg:!1,img:"images/kira.gif"}],touchChecks:[{label:"くるん",flg:!1,img:"images/turn.gif"},{label:"ぷにっ",flg:!1,img:"images/guni.gif"}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],availableSizeX:[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],availableSizeY:[0,1,2,3,4,5,6,7,8,9],size:[2,2],decaFlg:!1,color:"rgb(255, 151, 112)",rgba:"rgba(255, 151, 112, 0.3)",mesh:null},{openFlg:!1,tabOptionType:"effect",title:"奥",checks:[{label:"曲げ",flg:!1,img:"images/warp_bg.png"},{label:"影",flg:!1,img:"images/shadow.png"},{label:"ぽよ",flg:!1,img:"images/poyo.gif"},{label:"キラ",flg:!1,img:"images/kira.gif"}],touchChecks:[{label:"くるん",flg:!1,img:"images/turn.gif"},{label:"ぷにっ",flg:!1,img:"images/guni.gif"}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],availableSizeX:[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],availableSizeY:[1,2,3,4,5,6,7,8,9],size:[2,2],decaFlg:!1,color:"rgb(66, 184, 221)",rgba:"rgba(66, 184, 221, 0.2)",mesh:null},{openFlg:!0,tabOptionType:"effect",title:"真ん中",checks:[{label:"曲げ",flg:!1,img:"images/warp.png"},{label:"影",flg:!1,img:"images/shadow.png"},{label:"ぽよ",flg:!1,img:"images/poyo.gif"},{label:"キラ",flg:!1,img:"images/kira.gif"}],touchChecks:[{label:"くるん",flg:!1,img:"images/turn.gif"},{label:"ぷにっ",flg:!1,img:"images/guni.gif"}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],availableSizeX:[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],availableSizeY:[1,2,3,4,5,6,7,8,9],size:[2,2],decaFlg:!1,color:"rgb(240, 190, 0)",rgba:"rgba(253, 231, 76, 0.4)",mesh:null},{openFlg:!1,tabOptionType:"effect",title:"手前",checks:[{label:"曲げ",flg:!1,img:"images/warp.png"},{label:"影",flg:!1,img:"images/shadow.png"},{label:"ぽよ",flg:!1,img:"images/poyo.gif"},{label:"キラ",flg:!1,img:"images/kira.gif"}],touchChecks:[{label:"くるん",flg:!1,img:"images/turn.gif"},{label:"ぷにっ",flg:!1,img:"images/guni.gif"}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],availableSizeX:[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],availableSizeY:[1,2,3,4,5,6,7,8,9],size:[2,2],decaFlg:!1,color:"rgb(255, 112, 166)",rgba:"rgba(255, 112, 166, 0.2)",mesh:null},{openFlg:!0,tabOptionType:"effect",title:"全天球",checks:[{label:"魚眼",flg:!1,img:"images/lens.png"},{label:"回転",flg:!1,img:"images/rotate_vr.gif"},{label:"青み",flg:!1,img:"images/blue.png"},{label:null,flg:!1,img:null}],touchChecks:[{label:null,flg:!1,img:null},{label:null,flg:!1,img:null}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],size:[9,9],decaFlg:!1,color:"rgb(160, 165, 170)",rgba:"rgba(160, 165, 170, 0.2)",mesh:null}],arImg:new Array(4),qrCanvas:new Array(4),qrCtx:new Array(4),creatingFlg:!1,resultFlg:!1,pRenderer:null,pScene:null,pCamera:null,pGeoPlane:new THREE.PlaneGeometry(1,1),pGeoPlaneFine:new THREE.PlaneGeometry(1,1,64,64),pGeoSphere:new THREE.SphereGeometry(.5,32,16),pGeoSphereFine:new THREE.SphereGeometry(.5,128,64),pMarkerAr0:null,pMultiGroup:null,zoomRange:1,tweetUrl:null,optionType:"normal",vrPos:[0,0,-4],offset:[0,0,0],markerAr0TurnFlg:!1,detailOpenFlg:!1,screenWidth:0},created:function(){var e=this;if(e.screenWidth=window.innerWidth,location.search){for(var a={},r=location.search.substring(1).split("&"),t=0;r[t];t++){var i=r[t].split("=");a[i[0]]=decodeURIComponent(i[1])}var l=new Array(e.arData.length).join("0");a.warpList=a.fw&&(l+parseInt(a.fw,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.shodowList=a.fs&&(l+parseInt(a.fs,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.poyoList=a.fp&&(l+parseInt(a.fp,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.kiraList=a.fk&&(l+parseInt(a.fk,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.turnList=a.ft&&(l+parseInt(a.ft,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.guniList=a.fg&&(l+parseInt(a.fg,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.decaList=a.fd&&(l+parseInt(a.fd,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.sizeList=a.wh&&(l+l+parseInt(a.wh,16).toString(10)).slice(-2*e.arData.length).match(/.{2}/g).reverse(),e.arData.forEach(function(r,t){if(e.arData[t].image.url=a["i"+t],e.arData[t].map.url=a["m"+t],e.arData[t].touch.url=a["t"+t],e.arData[t].checks[0].flg=a.warpList&&!!Number(a.warpList[t]),e.arData[t].checks[1].flg=a.shodowList&&!!Number(a.shodowList[t]),e.arData[t].checks[2].flg=a.poyoList&&!!Number(a.poyoList[t]),e.arData[t].checks[3].flg=a.kiraList&&!!Number(a.kiraList[t]),e.arData[t].touchChecks[0].flg=a.turnList&&!!Number(a.turnList[t]),e.arData[t].touchChecks[1].flg=a.guniList&&!!Number(a.guniList[t]),e.arData[t].decaFlg=a.decaList&&!!Number(a.decaList[t]),e.arData[t].size=[Number(a.sizeList[t][0]),Number(a.sizeList[t][1])],e.arData[t].decaFlg&&(e.arData[t].size[0]*=10),a["i"+t]&&(e.arData[t].openFlg=!0),a["kc"+t]){var i=decodeURIComponent(a["kc"+t]).split(" ");e.arData[t].chromakey=i.map(function(e){return Math.round(255*e)})}}),e.arData[4].image.url?e.optionType="vr":a.multi&&(e.optionType="multi"),a.vrPos&&(e.vrPos=decodeURIComponent(a.vrPos).split(" ")),a.offset&&(e.offset=decodeURIComponent(a.offset).split(" "))}},mounted:function(){for(var e=this,a=0;a<4;a++)e.arImg[a]=new Image,e.arImg[a].src="images/ar"+a+".png",e.qrCanvas[a]=document.createElement("canvas"),e.qrCtx[a]=e.qrCanvas[a].getContext("2d"),e.qrCanvas[a].width=1024,e.qrCanvas[a].height=1024,e.qrCtx[a].fillStyle="#fff";var r=e.$refs.pCanvas.offsetWidth,t=e.$refs.pCanvas.offsetHeight,i=r/t;e.pRenderer=new THREE.WebGLRenderer({canvas:e.$refs.pCanvas,antialias:!0}),e.pRenderer.setPixelRatio(window.devicePixelRatio),e.pRenderer.setSize(r,t),e.pScene=new THREE.Scene,e.pScene.background=new THREE.Color(16777215),e.pCamera=new THREE.PerspectiveCamera(20,i,1,1e3),e.pCamera.position.set(6,10,10),e.pCamera.lookAt(new THREE.Vector3(0,1,0));var l=new THREE.DirectionalLight(16777215,.6);l.position.set(0,100,100),e.pScene.add(l);var n=new THREE.AmbientLight(16777215,.8);e.pScene.add(n),e.drawMarker(0);var o=new THREE.CanvasTexture(e.qrCanvas[0]),s=new THREE.MeshBasicMaterial({map:o});e.pMarkerAr0=new THREE.Mesh(e.pGeoPlane,s),e.pMarkerAr0.scale.set(1.24,1.24,1),e.pMarkerAr0.rotation.set(-Math.PI/2,0,0),e.pMarkerAr0.position.set(0,-.01,0),e.pScene.add(e.pMarkerAr0),e.arData.forEach(function(a,r){var t=new THREE.MeshPhongMaterial({color:a.color,transparent:!0,depthTest:!1,side:THREE.DoubleSide});t.displacementBias=-.5,4===r?(a.mesh=new THREE.Mesh(e.pGeoSphere,t),a.mesh.material.side=THREE.BackSide,a.mesh.scale.set(500,500,500),a.mesh.rotation.set(0,-Math.PI/2,0)):a.mesh=new THREE.Mesh(e.pGeoPlane,t),e.pScene.add(a.mesh)}),e.pUpdate()},watch:{optionType:function(){var e=this;e.resultFlg=!1,e.pToggleLayout()},viewerUrl:function(){var e=this;history.replaceState("","",e.queryString),e.pUpdate()},zoomRange:function(){var e=this;e.pCamera.zoom=e.zoomRange,e.pCamera.updateProjectionMatrix(),e.pRenderer.render(e.pScene,e.pCamera)}},computed:{allOpenFlg:function(){var e=this;return e.arData.every(function(e){return e.openFlg})},isSubmitDisabled:function(){var e=this;return e.creatingFlg||e.arData.every(function(e){return!e.image.url})||e.arData.some(function(e){return e.image.url&&!e.image.url.match(/^http/)||e.map.url&&!e.map.url.match(/^http/)||e.touch.url&&!e.touch.url.match(/^http/)})},queryString:function(){var e=this,a="?wh="+e.convert10_16(e.arData.map(function(e){return e.size[0]>9?(e.decaFlg=!0,e.size[0]/10+""+e.size[1]):(e.decaFlg=!1,e.size.join(""))}).reverse().join(""));e.flgName.forEach(function(r,t){var i=e.convert2_16(e.arData.map(function(e){return e.checks[t].flg?1:0}).reverse().join(""));"0"!==i&&(a+="&"+r+"="+i)}),e.touchName.forEach(function(r,t){var i=e.convert2_16(e.arData.map(function(e){return e.touchChecks[t].flg?1:0}).reverse().join(""));"0"!==i&&(a+="&"+r+"="+i)});var r=e.convert2_16(e.arData.map(function(e){return e.decaFlg?1:0}).reverse().join(""));return"0"!==r&&(a+="&fd="+r),e.arData.forEach(function(r,t){!r.image.url||4===t&&"vr"!==e.optionType||(a+="&i"+t+"="+r.image.url,r.map.url&&(a+="&m"+t+"="+r.map.url),r.touch.url&&(a+="&t"+t+"="+r.touch.url,r.touch.url.match(/\.mp4$/i)&&(a+="&kc"+t+"="+encodeURIComponent(Math.floor(r.chromakey[0]/2.55)/100+" "+Math.floor(r.chromakey[1]/2.55)/100+" "+Math.floor(r.chromakey[2]/2.55)/100))))}),"vr"===e.optionType?a+="&vrPos="+encodeURIComponent(e.vrPos.join(" ")):"multi"===e.optionType?a+="&multi=1":e.offset[0]*e.offset[0]+e.offset[1]*e.offset[1]+e.offset[2]*e.offset[2]&&(a+="&offset="+encodeURIComponent(e.offset.join(" "))),a},viewerUrl:function(){var e=this;return"https://web-ar-viewer.firebaseapp.com/"+("vr"===e.optionType?"vr/":"")+e.queryString}},methods:{scroll:function(e){scrollTo(0,window.pageYOffset+e.getBoundingClientRect().top)},switchAllOpen:function(e){var a=this;a.arData.forEach(function(a){a.openFlg=e})},selectImage:function(e,a,r){var t=this;if(a.target.files.length){var i=a.target.files[0],l=new FileReader;l.onload=function(){if(i.size>1e7)return alert("ファイルサイズが10MBを超えています。\nファイルサイズを抑えるか、他のサービスで事前にアップロードしておいたものを使用してください。"),!1;t.arData[e][r].file=l.result;var a=new THREE.TextureLoader;"image"===r?a.load(l.result,function(a){a.minFilter=THREE.LinearFilter,t.arData[e].mesh.material.map=a;var r=a.image.width/a.image.height;t.arData[e].size=r<1/9?[1,9]:r<1.2/3?[1,Math.round(1/r)]:r<.6?[2,4]:r<.875?[3,4]:r<4/3.5?[2,2]:r<2/1.2?[4,3]:r<2.5?[4,2]:r<9?[Math.round(r),1]:[9,1],t.arData[e].mesh.material.needsUpdate=!0,t.pUpdate()}):"map"===r&&(0===e&&t.arData[e].checks[0].flg?t.arData[e].mesh.geometry=t.pGeoSphereFine:4!==e&&(t.arData[e].mesh.geometry=t.pGeoPlaneFine),a.load(l.result,function(a){a.minFilter=THREE.LinearFilter,t.arData[e].mesh.material.displacementMap=a,t.arData[e].mesh.material.needsUpdate=!0,t.pUpdate()}))},l.readAsDataURL(i)}},uploadImage:function(i,target){var self=this;self.arData[i][target].url="アップロード中…";var req=new XMLHttpRequest;req.open("POST","https://api.imgur.com/3/image",!0),req.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=UTF-8"),req.setRequestHeader("Authorization","Client-ID 14834ce07369dac"),req.onload=function(event){4===req.readyState&&(200===req.status?(self.arData[i][target].url=eval("("+req.responseText+")").data.link,self.arData[i][target].file=null):(self.arData[i][target].url="",alert("アップロードに失敗しました。\nError: "+req.status)))},req.onerror=function(e){self.arData[i][target].url="",alert("アップロード中にエラーが発生しました。")},req.send("image="+encodeURIComponent(self.arData[i][target].file.split(",")[1]))},cancelImage:function(e,a){var r=this;r.arData[e][a].file=null,"image"===a?(r.arData[e].mesh.material.map=null,r.arData[e].mesh.material.needsUpdate=!0):"map"===a&&(r.arData[e].mesh.material.displacementMap=null,r.arData[e].mesh.material.needsUpdate=!0),r.pUpdate()},createAr:function(){var self=this;"vr"===self.optionType&&!self.arData[4].image.url&&window.confirm("VRモードがオンになっていますが、全天球画像が設定されていません。\nVRモードをオフにしてARを作りますか？")&&(self.optionType="normal"),self.tweetUrl=self.viewerUrl+("vr"===self.optionType?"":"&gyro=1"),self.resultFlg=!1,self.creatingFlg=!0;var qrUrl=null,req=new XMLHttpRequest;req.open("POST","https://api-ssl.bitly.com/v4/shorten"),req.setRequestHeader("content-type","application/json"),req.setRequestHeader("authorization","Bearer ab4289dd73e917bbcccb230a710d49d43fc85dcc"),req.onload=function(event){if(4===req.readyState)if(200!==req.status&&201!==req.status||(qrUrl=eval("("+req.responseText+")").link),qrUrl)self.createQrCode(qrUrl);else{var req2=new XMLHttpRequest;req2.open("POST","https://api.tinyurl.com/create"),req2.setRequestHeader("content-type","application/json"),req2.setRequestHeader("authorization","Bearer XjwGycMZiQFPiV5tYV4utiXTwMGY7Gqzev30eYMLEAOxRdADlGaxrfWL3hsy"),req2.onload=function(event){4===req2.readyState&&(200!==req2.status&&201!==req2.status||(qrUrl=eval("("+req2.responseText+")").data.tiny_url),self.createQrCode(qrUrl))},req2.onerror=function(e){alert("QRコード生成中にエラーが発生しました。")},req2.send(JSON.stringify({url:self.viewerUrl}))}},req.onerror=function(e){alert("QRコード生成中にエラーが発生しました。")},req.send(JSON.stringify({long_url:self.viewerUrl}))},createQrCode:function(e){var a=this;e||(e=a.viewerUrl);var r=new Image;if(r.crossOrigin="Anonymous",r.src="https://api.qrserver.com/v1/create-qr-code/?size="+("vr"===a.optionType?"512x512":"364x364")+"&data="+encodeURIComponent(e),r.onload=function(){a.resultFlg=!0,a.creatingFlg=!1,a.drawMarker(0,r)},"multi"===a.optionType){var t=new Image;t.crossOrigin="Anonymous",t.src="https://api.qrserver.com/v1/create-qr-code/?size=244x244&data="+encodeURIComponent(e),t.onload=function(){for(var e=1;e<4;e++)a.drawMarker(e,t)}}},convert2_16:function(e){return parseInt(e,2).toString(16)},convert10_16:function(e){return parseInt(e,10).toString(16)},previewViwer:function(){var e=this;window.open(e.viewerUrl+"&preview=1")},gyroViwer:function(){var e=this;window.open(e.tweetUrl)},tweet:function(){var e=this;if("vr"===e.optionType)var a=encodeURIComponent("WebARジェネレータでVRを作ったよ！");else a=encodeURIComponent("WebARジェネレータでARを作ったよ！");window.open("https://twitter.com/intent/tweet?text="+a+"&url="+encodeURIComponent(e.tweetUrl)+"&hashtags=WebARジェネレータ")},drawMarker:function(e,a){var r=this;if(r.qrCtx[e].fillRect(0,0,1024,1024),"vr"===r.optionType&&a)return r.qrCtx[e].drawImage(a,0,0,512,512,0,0,1024,1024),void(r.$refs.vr_img_0.src=r.qrCanvas[e].toDataURL());a&&r.qrCtx[e].drawImage(a,[372,316,390,464][e],[286,316,316,316][e]),r.qrCtx[e].beginPath(),r.qrCtx[e].lineWidth=206,r.qrCtx[e].strokeRect(205,205,614,614),r.qrCtx[e].drawImage(r.arImg[e],332,626),a&&(r.$refs[r.optionType+"_img_"+e].src=r.qrCanvas[e].toDataURL())},pUpdate:function(){var e=this;e.arData.forEach(function(a,r){var t=a.decaFlg?10*a.size[1]:a.size[1];if(a.mesh.material.opacity=a.image.url?.5:.1,0===r)a.checks[0].flg?(a.mesh.geometry=a.mesh.material.displacementMap?e.pGeoSphereFine:e.pGeoSphere,a.mesh.rotation.set(0,-Math.PI/2,0),a.mesh.position.set(0,a.size[0]/2,0),a.mesh.scale.set(a.size[0],a.size[0],a.size[0])):(e.arData[0].mesh.geometry=e.arData[0].mesh.material.displacementMap?e.pGeoPlaneFine:e.pGeoPlane,e.arData[0].mesh.position.set(0,0,0),e.arData[0].mesh.rotation.set(-Math.PI/2,0,0),e.arData[0].mesh.scale.set(a.size[0],t,1),a.mesh.scale.set(a.size[0],t,1));else if(4!==r){if("multi"===e.optionType)var i=[{x:0,z:0},{x:2,z:-2},{x:0,z:-2},{x:-2,z:-2}];else{var l=e.arData[0].decaFlg?10*e.arData[0].size[1]:e.arData[0].size[1];i=[{x:0,z:0},{x:0,z:-l/2},{x:0,z:0},{x:0,z:l/2}]}a.mesh.position.set(i[r].x,t/2,i[r].z),a.mesh.scale.set(a.size[0],t,1)}}),e.pRenderer.render(e.pScene,e.pCamera)},pToggleLayout:function(){var e=this;if(!e.pMultiGroup){e.pMultiGroup=new THREE.Group;for(var a=1;a<4;a++){e.drawMarker(a);var r=new THREE.CanvasTexture(e.qrCanvas[a]),t=new THREE.MeshBasicMaterial({map:r}),i=new THREE.Mesh(e.pGeoPlane,t);i.scale.set(1.24,1.24,1),i.rotation.set(-Math.PI/2,0,0),i.position.set([0,2,0,-2][a],-.01,[0,-2,-2,-2][a]),e.pMultiGroup.add(i)}e.pScene.add(e.pMultiGroup)}"multi"===e.optionType?(e.pCamera.position.set(10,15,15),e.pCamera.lookAt(new THREE.Vector3(1,2,0)),e.pMultiGroup.visible=!0):(e.pCamera.position.set(6,10,10),e.pCamera.lookAt(new THREE.Vector3(0,1,0)),e.pMultiGroup.visible=!1),e.pMarkerAr0.visible="vr"!==e.optionType}}});
