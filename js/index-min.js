new Vue({el:"#app",data:{flgName:["fw","fs","fp","fk"],touchName:["ft","fg"],arData:[{openFlg:!1,tabOptionType:"effect",title:"床 (または球)",checks:[{label:"球体",flg:!1,img:"images/sphere.png"},{label:"回転",flg:!1,img:"images/rotate.gif"},{label:"ぽよ",flg:!1,img:"images/poyo.gif"},{label:"キラ",flg:!1,img:"images/kira.gif"}],touchChecks:[{label:"くるん",flg:!1,img:"images/turn.gif"},{label:"ぷにっ",flg:!1,img:"images/guni.gif"}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],availableSizeX:[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],availableSizeY:[0,1,2,3,4,5,6,7,8,9],size:[2,2],decaFlg:!1,color:"rgb(255, 151, 112)",rgba:"rgba(255, 151, 112, 0.3)",mesh:null},{openFlg:!1,tabOptionType:"effect",title:"奥",checks:[{label:"曲げ",flg:!1,img:"images/warp_bg.png"},{label:"影",flg:!1,img:"images/shadow.png"},{label:"ぽよ",flg:!1,img:"images/poyo.gif"},{label:"キラ",flg:!1,img:"images/kira.gif"}],touchChecks:[{label:"くるん",flg:!1,img:"images/turn.gif"},{label:"ぷにっ",flg:!1,img:"images/guni.gif"}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],availableSizeX:[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],availableSizeY:[1,2,3,4,5,6,7,8,9],size:[2,2],decaFlg:!1,color:"rgb(66, 184, 221)",rgba:"rgba(66, 184, 221, 0.2)",mesh:null},{openFlg:!0,tabOptionType:"effect",title:"真ん中",checks:[{label:"曲げ",flg:!1,img:"images/warp.png"},{label:"影",flg:!1,img:"images/shadow.png"},{label:"ぽよ",flg:!1,img:"images/poyo.gif"},{label:"キラ",flg:!1,img:"images/kira.gif"}],touchChecks:[{label:"くるん",flg:!1,img:"images/turn.gif"},{label:"ぷにっ",flg:!1,img:"images/guni.gif"}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],availableSizeX:[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],availableSizeY:[1,2,3,4,5,6,7,8,9],size:[2,2],decaFlg:!1,color:"rgb(240, 190, 0)",rgba:"rgba(253, 231, 76, 0.4)",mesh:null},{openFlg:!1,tabOptionType:"effect",title:"手前",checks:[{label:"曲げ",flg:!1,img:"images/warp.png"},{label:"影",flg:!1,img:"images/shadow.png"},{label:"ぽよ",flg:!1,img:"images/poyo.gif"},{label:"キラ",flg:!1,img:"images/kira.gif"}],touchChecks:[{label:"くるん",flg:!1,img:"images/turn.gif"},{label:"ぷにっ",flg:!1,img:"images/guni.gif"}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],availableSizeX:[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],availableSizeY:[1,2,3,4,5,6,7,8,9],size:[2,2],decaFlg:!1,color:"rgb(255, 112, 166)",rgba:"rgba(255, 112, 166, 0.2)",mesh:null},{openFlg:!0,tabOptionType:"effect",title:"全天球",checks:[{label:"魚眼",flg:!1,img:"images/lens.png"},{label:"回転",flg:!1,img:"images/rotate_vr.gif"},{label:"青み",flg:!1,img:"images/blue.png"},{label:null,flg:!1,img:null}],touchChecks:[{label:null,flg:!1,img:null},{label:null,flg:!1,img:null}],image:{file:null,url:null},map:{file:null,url:null},touch:{file:null,url:null},chromakey:[25,229,51],size:[9,9],decaFlg:!1,color:"rgb(160, 165, 170)",rgba:"rgba(160, 165, 170, 0.2)",mesh:null}],arImg:new Array(4),qrCanvas:new Array(4),qrCtx:new Array(4),creatingFlg:!1,resultFlg:!1,pRenderer:null,pScene:null,pCamera:null,pGeoPlane:new THREE.PlaneGeometry(1,1),pGeoPlaneFine:new THREE.PlaneGeometry(1,1,64,64),pGeoSphere:new THREE.SphereGeometry(.5,32,16),pGeoSphereFine:new THREE.SphereGeometry(.5,128,64),pMarkerAr0:null,pMultiGroup:null,zoomRange:1,tweetUrl:null,optionType:"normal",vrPos:[0,0,-4],offset:[0,0,0],markerAr0TurnFlg:!1,detailOpenFlg:!1,screenWidth:0},created:function(){var e=this;if(e.screenWidth=window.innerWidth,location.search){for(var a={},t=location.search.substring(1).split("&"),r=0;t[r];r++){var i=t[r].split("=");a[i[0]]=decodeURIComponent(i[1])}var l=new Array(e.arData.length).join("0");a.warpList=a.fw&&(l+parseInt(a.fw,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.shodowList=a.fs&&(l+parseInt(a.fs,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.poyoList=a.fp&&(l+parseInt(a.fp,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.kiraList=a.fk&&(l+parseInt(a.fk,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.turnList=a.ft&&(l+parseInt(a.ft,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.guniList=a.fg&&(l+parseInt(a.fg,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.decaList=a.fd&&(l+parseInt(a.fd,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),a.sizeList=a.wh&&(l+l+parseInt(a.wh,16).toString(10)).slice(-2*e.arData.length).match(/.{2}/g).reverse(),e.arData.forEach((function(t,r){if(e.arData[r].image.url=a["i"+r],e.arData[r].map.url=a["m"+r],e.arData[r].touch.url=a["t"+r],e.arData[r].checks[0].flg=a.warpList&&!!Number(a.warpList[r]),e.arData[r].checks[1].flg=a.shodowList&&!!Number(a.shodowList[r]),e.arData[r].checks[2].flg=a.poyoList&&!!Number(a.poyoList[r]),e.arData[r].checks[3].flg=a.kiraList&&!!Number(a.kiraList[r]),e.arData[r].touchChecks[0].flg=a.turnList&&!!Number(a.turnList[r]),e.arData[r].touchChecks[1].flg=a.guniList&&!!Number(a.guniList[r]),e.arData[r].decaFlg=a.decaList&&!!Number(a.decaList[r]),e.arData[r].size=[Number(a.sizeList[r][0]),Number(a.sizeList[r][1])],e.arData[r].decaFlg&&(e.arData[r].size[0]*=10),a["i"+r]&&(e.arData[r].openFlg=!0),a["kc"+r]){var i=decodeURIComponent(a["kc"+r]).split(" ");e.arData[r].chromakey=i.map((function(e){return Math.round(255*e)}))}})),e.arData[4].image.url?e.optionType="vr":a.multi&&(e.optionType="multi"),a.vrPos&&(e.vrPos=decodeURIComponent(a.vrPos).split(" ")),a.offset&&(e.offset=decodeURIComponent(a.offset).split(" "))}},mounted:function(){for(var e=this,a=0;a<4;a++)e.arImg[a]=new Image,e.arImg[a].src="images/ar"+a+".png",e.qrCanvas[a]=document.createElement("canvas"),e.qrCtx[a]=e.qrCanvas[a].getContext("2d"),e.qrCanvas[a].width=1024,e.qrCanvas[a].height=1024,e.qrCtx[a].fillStyle="#fff";var t=e.$refs.pCanvas.offsetWidth,r=e.$refs.pCanvas.offsetHeight,i=t/r;e.pRenderer=new THREE.WebGLRenderer({canvas:e.$refs.pCanvas,antialias:!0}),e.pRenderer.setPixelRatio(window.devicePixelRatio),e.pRenderer.setSize(t,r),e.pScene=new THREE.Scene,e.pScene.background=new THREE.Color(16777215),e.pCamera=new THREE.PerspectiveCamera(20,i,1,1e3),e.pCamera.position.set(6,10,10),e.pCamera.lookAt(new THREE.Vector3(0,1,0));var l=new THREE.DirectionalLight(16777215,.6);l.position.set(0,100,100),e.pScene.add(l);var n=new THREE.AmbientLight(16777215,.8);e.pScene.add(n),e.drawMarker(0);var s=new THREE.CanvasTexture(e.qrCanvas[0]),o=new THREE.MeshBasicMaterial({map:s});e.pMarkerAr0=new THREE.Mesh(e.pGeoPlane,o),e.pMarkerAr0.scale.set(1.24,1.24,1),e.pMarkerAr0.rotation.set(-Math.PI/2,0,0),e.pMarkerAr0.position.set(0,-.01,0),e.pScene.add(e.pMarkerAr0),e.arData.forEach((function(a,t){var r=new THREE.MeshPhongMaterial({color:a.color,transparent:!0,depthTest:!1,side:THREE.DoubleSide});r.displacementBias=-.5,4===t?(a.mesh=new THREE.Mesh(e.pGeoSphere,r),a.mesh.material.side=THREE.BackSide,a.mesh.scale.set(500,500,500),a.mesh.rotation.set(0,-Math.PI/2,0)):a.mesh=new THREE.Mesh(e.pGeoPlane,r),e.pScene.add(a.mesh)})),e.pUpdate()},watch:{optionType:function(){this.resultFlg=!1,this.pToggleLayout()},viewerUrl:function(){history.replaceState("","",this.queryString),this.pUpdate()},zoomRange:function(){this.pCamera.zoom=this.zoomRange,this.pCamera.updateProjectionMatrix(),this.pRenderer.render(this.pScene,this.pCamera)}},computed:{allOpenFlg:function(){return this.arData.every((function(e){return e.openFlg}))},isSubmitDisabled:function(){return this.creatingFlg||this.arData.every((function(e){return!e.image.url}))||this.arData.some((function(e){return e.image.url&&!e.image.url.match(/^http/)||e.map.url&&!e.map.url.match(/^http/)||e.touch.url&&!e.touch.url.match(/^http/)}))},queryString:function(){var e=this,a="?wh="+e.convert10_16(e.arData.map((function(e){return e.size[0]>9?(e.decaFlg=!0,e.size[0]/10+""+e.size[1]):(e.decaFlg=!1,e.size.join(""))})).reverse().join(""));e.flgName.forEach((function(t,r){var i=e.convert2_16(e.arData.map((function(e){return e.checks[r].flg?1:0})).reverse().join(""));"0"!==i&&(a+="&"+t+"="+i)})),e.touchName.forEach((function(t,r){var i=e.convert2_16(e.arData.map((function(e){return e.touchChecks[r].flg?1:0})).reverse().join(""));"0"!==i&&(a+="&"+t+"="+i)}));var t=e.convert2_16(e.arData.map((function(e){return e.decaFlg?1:0})).reverse().join(""));return"0"!==t&&(a+="&fd="+t),e.arData.forEach((function(t,r){!t.image.url||4===r&&"vr"!==e.optionType||(a+="&i"+r+"="+t.image.url,t.map.url&&(a+="&m"+r+"="+t.map.url),t.touch.url&&(a+="&t"+r+"="+t.touch.url,t.touch.url.match(/\.mp4$/i)&&(a+="&kc"+r+"="+encodeURIComponent(Math.floor(t.chromakey[0]/2.55)/100+" "+Math.floor(t.chromakey[1]/2.55)/100+" "+Math.floor(t.chromakey[2]/2.55)/100))))})),"vr"===e.optionType?a+="&vrPos="+encodeURIComponent(e.vrPos.join(" ")):"multi"===e.optionType?a+="&multi=1":e.offset[0]*e.offset[0]+e.offset[1]*e.offset[1]+e.offset[2]*e.offset[2]&&(a+="&offset="+encodeURIComponent(e.offset.join(" "))),a},viewerUrl:function(){return"https://web-ar-viewer.firebaseapp.com/"+("vr"===this.optionType?"vr/":"")+this.queryString}},methods:{scroll:function(e){scrollTo(0,window.pageYOffset+e.getBoundingClientRect().top)},switchAllOpen:function(e){this.arData.forEach((function(a){a.openFlg=e}))},selectImage:function(e,a,t){var r=this;if(a.target.files.length){var i=a.target.files[0],l=new FileReader;l.onload=function(){if(i.size>1e7)return alert("ファイルサイズが10MBを超えています。\nファイルサイズを抑えるか、他のサービスで事前にアップロードしておいたものを使用してください。"),!1;r.arData[e][t].file=l.result;var a=new THREE.TextureLoader;"image"===t?a.load(l.result,(function(a){a.minFilter=THREE.LinearFilter,r.arData[e].mesh.material.map=a;var t=a.image.width/a.image.height;r.arData[e].size=t<1/9?[1,9]:t<1.2/3?[1,Math.round(1/t)]:t<.6?[2,4]:t<.875?[3,4]:t<4/3.5?[2,2]:t<2/1.2?[4,3]:t<2.5?[4,2]:t<9?[Math.round(t),1]:[9,1],r.arData[e].mesh.material.needsUpdate=!0,r.pUpdate()})):"map"===t&&(0===e&&r.arData[e].checks[0].flg?r.arData[e].mesh.geometry=r.pGeoSphereFine:4!==e&&(r.arData[e].mesh.geometry=r.pGeoPlaneFine),a.load(l.result,(function(a){a.minFilter=THREE.LinearFilter,r.arData[e].mesh.material.displacementMap=a,r.arData[e].mesh.material.needsUpdate=!0,r.pUpdate()})))},l.readAsDataURL(i)}},uploadImage:function(i,target){var self=this;self.arData[i][target].url="アップロード中…";var req=new XMLHttpRequest;req.open("POST","https://api.imgur.com/3/image",!0),req.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=UTF-8"),req.setRequestHeader("Authorization","Client-ID 14834ce07369dac"),req.onload=function(event){4===req.readyState&&(200===req.status?(self.arData[i][target].url=eval("("+req.responseText+")").data.link,self.arData[i][target].file=null):(self.arData[i][target].url="",alert("アップロードに失敗しました。\nError: "+req.status)))},req.onerror=function(e){self.arData[i][target].url="",alert("アップロード中にエラーが発生しました。")},req.send("image="+encodeURIComponent(self.arData[i][target].file.split(",")[1]))},cancelImage:function(e,a){this.arData[e][a].file=null,"image"===a?(this.arData[e].mesh.material.map=null,this.arData[e].mesh.material.needsUpdate=!0):"map"===a&&(this.arData[e].mesh.material.displacementMap=null,this.arData[e].mesh.material.needsUpdate=!0),this.pUpdate()},createAr:function(){var self=this;"vr"===self.optionType&&!self.arData[4].image.url&&window.confirm("VRモードがオンになっていますが、全天球画像が設定されていません。\nVRモードをオフにしてARを作りますか？")&&(self.optionType="normal"),self.tweetUrl=self.viewerUrl+("vr"===self.optionType?"":"&gyro=1"),self.resultFlg=!1,self.creatingFlg=!0;var qrUrl=null,req=new XMLHttpRequest;req.open("POST","https://api-ssl.bitly.com/v4/shorten"),req.setRequestHeader("content-type","application/json"),req.setRequestHeader("authorization","Bearer ab4289dd73e917bbcccb230a710d49d43fc85dcc"),req.onload=function(event){if(4===req.readyState)if(200!==req.status&&201!==req.status||(qrUrl=eval("("+req.responseText+")").link),qrUrl)self.createQrCode(qrUrl);else{var req2=new XMLHttpRequest;req2.open("POST","https://api.tinyurl.com/create"),req2.setRequestHeader("content-type","application/json"),req2.setRequestHeader("authorization","Bearer XjwGycMZiQFPiV5tYV4utiXTwMGY7Gqzev30eYMLEAOxRdADlGaxrfWL3hsy"),req2.onload=function(event){4===req2.readyState&&(200!==req2.status&&201!==req2.status||(qrUrl=eval("("+req2.responseText+")").data.tiny_url),self.createQrCode(qrUrl))},req2.onerror=function(e){alert("QRコード生成中にエラーが発生しました。")},req2.send(JSON.stringify({url:self.viewerUrl}))}},req.onerror=function(e){alert("QRコード生成中にエラーが発生しました。")},req.send(JSON.stringify({long_url:self.viewerUrl}))},createQrCode:function(e){var a=this;e||(e=a.viewerUrl);var t=new Image;if(t.crossOrigin="Anonymous",t.src="https://chart.apis.google.com/chart?chs="+("vr"===a.optionType?"512x512":"364x364")+"&cht=qr&chl="+encodeURIComponent(e),t.onload=function(){a.resultFlg=!0,a.creatingFlg=!1,a.drawMarker(0,t)},"multi"===a.optionType){var r=new Image;r.crossOrigin="Anonymous",r.src="https://chart.apis.google.com/chart?chs=244x244&cht=qr&chl="+encodeURIComponent(e),r.onload=function(){for(var e=1;e<4;e++)a.drawMarker(e,r)}}},convert2_16:function(e){return parseInt(e,2).toString(16)},convert10_16:function(e){return parseInt(e,10).toString(16)},previewViwer:function(){window.open(this.viewerUrl+"&preview=1")},gyroViwer:function(){window.open(this.tweetUrl)},tweet:function(){if("vr"===this.optionType)var e=encodeURIComponent("WebARジェネレータでVRを作ったよ！");else e=encodeURIComponent("WebARジェネレータでARを作ったよ！");window.open("https://twitter.com/intent/tweet?text="+e+"&url="+encodeURIComponent(this.tweetUrl)+"&hashtags=WebARジェネレータ")},drawMarker:function(e,a){if(this.qrCtx[e].fillRect(0,0,1024,1024),"vr"===this.optionType&&a)return this.qrCtx[e].drawImage(a,0,0,512,512,0,0,1024,1024),void(this.$refs.vr_img_0.src=this.qrCanvas[e].toDataURL());a&&this.qrCtx[e].drawImage(a,[372,316,390,464][e],[286,316,316,316][e]),this.qrCtx[e].beginPath(),this.qrCtx[e].lineWidth=206,this.qrCtx[e].strokeRect(205,205,614,614),this.qrCtx[e].drawImage(this.arImg[e],332,626),a&&(this.$refs[this.optionType+"_img_"+e].src=this.qrCanvas[e].toDataURL())},pUpdate:function(){var e=this;e.arData.forEach((function(a,t){var r=a.decaFlg?10*a.size[1]:a.size[1];if(a.mesh.material.opacity=a.image.url?.5:.1,0===t)a.checks[0].flg?(a.mesh.geometry=a.mesh.material.displacementMap?e.pGeoSphereFine:e.pGeoSphere,a.mesh.rotation.set(0,-Math.PI/2,0),a.mesh.position.set(0,a.size[0]/2,0),a.mesh.scale.set(a.size[0],a.size[0],a.size[0])):(e.arData[0].mesh.geometry=e.arData[0].mesh.material.displacementMap?e.pGeoPlaneFine:e.pGeoPlane,e.arData[0].mesh.position.set(0,0,0),e.arData[0].mesh.rotation.set(-Math.PI/2,0,0),e.arData[0].mesh.scale.set(a.size[0],r,1),a.mesh.scale.set(a.size[0],r,1));else if(4!==t){if("multi"===e.optionType)var i=[{x:0,z:0},{x:2,z:-2},{x:0,z:-2},{x:-2,z:-2}];else{var l=e.arData[0].decaFlg?10*e.arData[0].size[1]:e.arData[0].size[1];i=[{x:0,z:0},{x:0,z:-l/2},{x:0,z:0},{x:0,z:l/2}]}a.mesh.position.set(i[t].x,r/2,i[t].z),a.mesh.scale.set(a.size[0],r,1)}})),e.pRenderer.render(e.pScene,e.pCamera)},pToggleLayout:function(){if(!this.pMultiGroup){this.pMultiGroup=new THREE.Group;for(var e=1;e<4;e++){this.drawMarker(e);var a=new THREE.CanvasTexture(this.qrCanvas[e]),t=new THREE.MeshBasicMaterial({map:a}),r=new THREE.Mesh(this.pGeoPlane,t);r.scale.set(1.24,1.24,1),r.rotation.set(-Math.PI/2,0,0),r.position.set([0,2,0,-2][e],-.01,[0,-2,-2,-2][e]),this.pMultiGroup.add(r)}this.pScene.add(this.pMultiGroup)}"multi"===this.optionType?(this.pCamera.position.set(10,15,15),this.pCamera.lookAt(new THREE.Vector3(1,2,0)),this.pMultiGroup.visible=!0):(this.pCamera.position.set(6,10,10),this.pCamera.lookAt(new THREE.Vector3(0,1,0)),this.pMultiGroup.visible=!1),this.pMarkerAr0.visible="vr"!==this.optionType}}});