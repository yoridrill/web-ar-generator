new Vue({el:"#app",data:{flgName:["isShadow","isWarp","isPoyo"],arData:[{title:"床",checks:[{label:"回転",flg:!1},{label:"球体",flg:!1},{label:"ぽよ",flg:!1}],imageUrl:null,size:[2,2],color:"rgb(255, 0, 255)",mesh:null},{title:"奥",checks:[{label:"床影",flg:!1},{label:"曲げ",flg:!1},{label:"ぽよ",flg:!1}],imageUrl:null,size:[2,2],color:"rgb(0, 0, 255)",mesh:null},{title:"真ん中",checks:[{label:"床影",flg:!1},{label:"曲げ",flg:!1},{label:"ぽよ",flg:!1}],imageUrl:null,size:[2,2],color:"rgb(0, 255, 255)",mesh:null},{title:"手前",checks:[{label:"床影",flg:!1},{label:"曲げ",flg:!1},{label:"ぽよ",flg:!1}],imageUrl:null,size:[2,2],color:"rgb(255, 255, 0)",mesh:null}],arImg:null,qrCtx:null,createAreaVisibleFlg:!1,creatingFlg:!1,pRenderer:null,pScene:null,pCamera:null,gyroUrl:null},mounted:function(){var e=this,r=e.$refs.pCanvas.offsetWidth,t=e.$refs.pCanvas.offsetHeight,a=r/t;e.pRenderer=new THREE.WebGLRenderer({canvas:e.$refs.pCanvas,antialias:!0}),e.pRenderer.setPixelRatio(window.devicePixelRatio),e.pRenderer.setSize(r,t),e.pScene=new THREE.Scene,e.pScene.background=new THREE.Color(16777215),e.pCamera=new THREE.PerspectiveCamera(20,a,1,1e3),e.pCamera.position.set(6,10,10),e.pCamera.lookAt(new THREE.Vector3(0,1,0));var n=new THREE.DirectionalLight(16777215);n.position.set(0,100,100),e.pScene.add(n);var l=new THREE.AmbientLight(16777215,.5);e.pScene.add(l);var o=new THREE.PlaneGeometry(1,1),i=new THREE.MeshLambertMaterial({color:0}),s=new THREE.Mesh(o,i);s.rotation.set(-Math.PI/2,0,0),s.position.set(0,-.015,0),e.pScene.add(s);var o=new THREE.PlaneGeometry(.5,.5),i=new THREE.MeshLambertMaterial({color:16777215}),s=new THREE.Mesh(o,i);s.rotation.set(-Math.PI/2,0,0),s.position.set(0,-.01,0),e.pScene.add(s),e.arData.forEach(function(r,t){var a=new THREE.PlaneGeometry(1,1),n=new THREE.MeshLambertMaterial({color:r.color,transparent:!0,depthTest:!1});r.mesh=new THREE.Mesh(a,n),e.pScene.add(r.mesh)}),e.pUpdate()},watch:{viewerUrl:function(){console.log("watch"),this.pUpdate()}},computed:{isSubmitDisabled:function(){return this.arData.every(function(e){return!e.imageUrl||!e.imageUrl.match(/^http/)})},viewerUrl:function(){var e=this,r="https://web-ar-viewer.firebaseapp.com?wh="+e.convert10_16(e.arData.map(function(e){return e.size.join("")}).reverse().join(""));return e.flgName.forEach(function(t,a){var n=e.convert2_16(e.arData.map(function(e){return e.checks[a].flg?1:0}).reverse().join(""));"0"!==n&&(r+="&"+t+"="+n)}),e.arData.forEach(function(e,t){e.imageUrl&&(r+="&i"+t+"="+e.imageUrl)}),console.log("vie"),r}},methods:{scroll:function(e){scrollTo(0,window.pageYOffset+e.getBoundingClientRect().top)},createAr:function(){var e=this;e.gyroUrl=e.viewerUrl+"&gyro=1",e.creatingFlg=!0,e.qrCtx||(e.qrCtx=e.$refs.qrCanvas.getContext("2d"),e.qrCtx.fillStyle="#fff"),e.arImg||(e.arImg=new Image,e.arImg.src="images/ar.png"),e.qrCtx.fillRect(0,0,1024,1024);var r=new Image;r.crossOrigin="Anonymous",r.src="http://chart.apis.google.com/chart?chs=364x364&cht=qr&chl="+encodeURIComponent(e.viewerUrl),r.onload=function(){e.createAreaVisibleFlg=!0,e.qrCtx.drawImage(r,372,286),e.qrCtx.beginPath(),e.qrCtx.lineWidth=206,e.qrCtx.strokeRect(205,205,614,614),e.qrCtx.drawImage(e.arImg,332,626),e.$refs.qrImg.src=e.$refs.qrCanvas.toDataURL(),e.creatingFlg=!1}},convert2_16:function(e){return parseInt(e,2).toString(16)},convert10_16:function(e){return parseInt(e,10).toString(16)},previewViwer:function(){var e=this;window.open(e.viewerUrl+"&preview=1")},gyroViwer:function(){var e=this;window.open(e.gyroUrl)},tweetGyro:function(){var e=this;window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent("WebARジェネレータでARを作ったよ！")+"&url="+encodeURIComponent(e.gyroUrl)+"&hashtags=WebARジェネレータ")},pUpdate:function(){var e=this;console.log("aaaaaaaapppp"),e.arData.forEach(function(r,t){if(r.mesh.material.opacity=r.imageUrl?.5:.1,0===t)if(r.checks[1].flg){var a=new THREE.SphereGeometry(.5,32,32);r.mesh.geometry=a,r.mesh.position.set(0,r.size[1]/2,0),r.mesh.scale.set(r.size[1],r.size[1],r.size[1])}else{console.log("pppp");var a=new THREE.PlaneGeometry(1,1);r.mesh.geometry=a,r.mesh.position.set(0,0,0),r.mesh.rotation.set(-Math.PI/2,0,0),r.mesh.scale.set(r.size[0],r.size[1],1)}else r.mesh.position.set(0,r.size[1]/2,[0,-e.arData[0].size[1]/2,0,e.arData[0].size[1]/2][t]),r.mesh.scale.set(r.size[0],r.size[1],1)}),e.pRenderer.render(e.pScene,e.pCamera)}}});