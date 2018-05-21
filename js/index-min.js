new Vue({el:"#app",data:{flgName:["fs","fw","fp"],arData:[{title:"床",checks:[{label:"回転",flg:!1},{label:"球体",flg:!1},{label:"ぽよ",flg:!1}],imageFile:null,imageUrl:null,size:[2,2],color:"rgb(255, 0, 255)",mesh:null},{title:"奥",checks:[{label:"床影",flg:!1},{label:"曲げ",flg:!1},{label:"ぽよ",flg:!1}],imageFile:null,imageUrl:null,size:[2,2],color:"rgb(0, 0, 255)",mesh:null},{title:"真ん中",checks:[{label:"床影",flg:!1},{label:"曲げ",flg:!1},{label:"ぽよ",flg:!1}],imageFile:null,imageUrl:null,size:[2,2],color:"rgb(0, 255, 255)",mesh:null},{title:"手前",checks:[{label:"床影",flg:!1},{label:"曲げ",flg:!1},{label:"ぽよ",flg:!1}],imageFile:null,imageUrl:null,size:[2,2],color:"rgb(255, 255, 0)",mesh:null}],arImg:null,qrCtx:null,createAreaVisibleFlg:!1,creatingFlg:!1,pRenderer:null,pScene:null,pCamera:null,gyroUrl:null},created:function(){var e=this;if(location.search){for(var t={},a=location.search.substring(1).split("&"),r=0;a[r];r++){var n=a[r].split("=");t[n[0]]=decodeURIComponent(n[1])}var i=new Array(e.arData.length).join("0");t.warpList=t.fw&&(i+parseInt(t.fw,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),t.shodowList=t.fs&&(i+parseInt(t.fs,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),t.poyoList=t.fp&&(i+parseInt(t.fp,16).toString(2)).slice(-1*e.arData.length).split("").reverse(),t.sizeList=t.wh&&(i+i+parseInt(t.wh,16).toString(10)).slice(-2*e.arData.length).match(/.{2}/g).reverse(),e.arData.forEach(function(a,r){e.arData[r].imageUrl=t["i"+r],e.arData[r].checks[0].flg=t.shodowList&&!!Number(t.shodowList[r]),e.arData[r].checks[1].flg=t.warpList&&!!Number(t.warpList[r]),e.arData[r].checks[2].flg=t.poyoList&&!!Number(t.poyoList[r]),e.arData[r].size=[Number(t.sizeList[r][0]),Number(t.sizeList[r][1])]})}},mounted:function(){var e=this,t=e.$refs.pCanvas.offsetWidth,a=e.$refs.pCanvas.offsetHeight,r=t/a;e.pRenderer=new THREE.WebGLRenderer({canvas:e.$refs.pCanvas,antialias:!0}),e.pRenderer.setPixelRatio(window.devicePixelRatio),e.pRenderer.setSize(t,a),e.pScene=new THREE.Scene,e.pScene.background=new THREE.Color(16777215),e.pCamera=new THREE.PerspectiveCamera(20,r,1,1e3),e.pCamera.position.set(6,10,10),e.pCamera.lookAt(new THREE.Vector3(0,1,0));var n=new THREE.DirectionalLight(16777215);n.position.set(0,100,100),e.pScene.add(n);var i=new THREE.AmbientLight(16777215,.5);e.pScene.add(i);var l=new THREE.PlaneGeometry(1,1),s=new THREE.MeshLambertMaterial({color:0});(o=new THREE.Mesh(l,s)).rotation.set(-Math.PI/2,0,0),o.position.set(0,-.015,0),e.pScene.add(o);var o;l=new THREE.PlaneGeometry(.5,.5),s=new THREE.MeshLambertMaterial({color:16777215});(o=new THREE.Mesh(l,s)).rotation.set(-Math.PI/2,0,0),o.position.set(0,-.01,0),e.pScene.add(o),e.arData.forEach(function(t,a){var r=new THREE.PlaneGeometry(1,1),n=new THREE.MeshLambertMaterial({color:t.color,transparent:!0,depthTest:!1});t.mesh=new THREE.Mesh(r,n),e.pScene.add(t.mesh)}),e.pUpdate()},watch:{viewerUrl:function(){history.replaceState("","",this.queryString),this.pUpdate()}},computed:{isSubmitDisabled:function(){return this.arData.every(function(e){return!e.imageUrl||!e.imageUrl.match(/^http/)})},queryString:function(){var e=this,t="?wh="+e.convert10_16(e.arData.map(function(e){return e.size.join("")}).reverse().join(""));return e.flgName.forEach(function(a,r){var n=e.convert2_16(e.arData.map(function(e){return e.checks[r].flg?1:0}).reverse().join(""));"0"!==n&&(t+="&"+a+"="+n)}),e.arData.forEach(function(e,a){e.imageUrl&&(t+="&i"+a+"="+e.imageUrl)}),t},viewerUrl:function(){return"https://web-ar-viewer.firebaseapp.com"+this.queryString}},methods:{scroll:function(e){scrollTo(0,window.pageYOffset+e.getBoundingClientRect().top)},selectImage:function(e,t){var a=this;if(t.target.files.length){var r=t.target.files[0],n=new FileReader;n.onload=function(){a.arData[e].imageFile=n.result,(new THREE.TextureLoader).load(n.result,function(t){t.minFilter=THREE.LinearFilter;var r=new THREE.MeshLambertMaterial({map:t,transparent:!0,depthTest:!1});a.arData[e].mesh.material=r,a.pUpdate()})},n.readAsDataURL(r)}},uploadImage:function(i){var self=this,req=new XMLHttpRequest;req.open("POST","https://api.imgur.com/3/image",!0),req.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=UTF-8"),req.setRequestHeader("Authorization","Client-ID 14834ce07369dac"),req.onload=function(event){4===req.readyState&&(200===req.status?(self.arData[i].imageUrl=eval("("+req.responseText+")").data.link,self.arData[i].imageFile=null):console.log(req.statusText))},req.onerror=function(e){console.log(e.type)},req.send("image="+encodeURIComponent(self.arData[i].imageFile.split(",")[1]))},cancelImage:function(e){var t=this;t.arData[e].imageFile=null;var a=new THREE.MeshLambertMaterial({color:t.arData[e].color,transparent:!0,depthTest:!1});t.arData[e].mesh.material=a,t.pUpdate()},createAr:function(){var e=this;e.gyroUrl=e.viewerUrl+"&gyro=1",e.creatingFlg=!0,e.qrCtx||(e.qrCtx=e.$refs.qrCanvas.getContext("2d"),e.qrCtx.fillStyle="#fff"),e.arImg||(e.arImg=new Image,e.arImg.src="images/ar.png"),e.qrCtx.fillRect(0,0,1024,1024);var t=new Image;t.crossOrigin="Anonymous",t.src="https://chart.apis.google.com/chart?chs=364x364&cht=qr&chl="+encodeURIComponent(e.viewerUrl),t.onload=function(){e.createAreaVisibleFlg=!0,e.qrCtx.drawImage(t,372,286),e.qrCtx.beginPath(),e.qrCtx.lineWidth=206,e.qrCtx.strokeRect(205,205,614,614),e.qrCtx.drawImage(e.arImg,332,626),e.$refs.qrImg.src=e.$refs.qrCanvas.toDataURL(),e.creatingFlg=!1}},convert2_16:function(e){return parseInt(e,2).toString(16)},convert10_16:function(e){return parseInt(e,10).toString(16)},previewViwer:function(){window.open(this.viewerUrl+"&preview=1")},gyroViwer:function(){window.open(this.gyroUrl)},tweetGyro:function(){window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent("WebARジェネレータでARを作ったよ！")+"&url="+encodeURIComponent(this.gyroUrl)+"&hashtags=WebARジェネレータ")},pUpdate:function(){var e=this;e.arData.forEach(function(t,a){if(t.mesh.material.opacity=t.imageUrl?.5:.1,0===a)if(t.checks[1].flg){var r=new THREE.SphereGeometry(.5,32,32);t.mesh.rotation.set(0,-Math.PI/2,0),t.mesh.geometry=r,t.mesh.position.set(0,t.size[1]/2,0),t.mesh.scale.set(t.size[1],t.size[1],t.size[1])}else{r=new THREE.PlaneGeometry(1,1);t.mesh.geometry=r,t.mesh.position.set(0,0,0),t.mesh.rotation.set(-Math.PI/2,0,0),t.mesh.scale.set(t.size[0],t.size[1],1)}else t.mesh.position.set(0,t.size[1]/2,[0,-e.arData[0].size[1]/2,0,e.arData[0].size[1]/2][a]),t.mesh.scale.set(t.size[0],t.size[1],1)}),e.pRenderer.render(e.pScene,e.pCamera)}}});
