new Vue({
    el: '#app',
    data: {
        flgName: ['fs', 'fw', 'fp'],
        arData: [
            {
                title: '床',
                checks: [
                    { label: '回転', flg: false },
                    { label: '球体', flg: false },
                    { label: 'ぽよ', flg: false }
                ],
                imageFile: null,
                imageUrl: null,
                size: [2, 2],
                color: 'rgb(255, 0, 255)',
                mesh: null
            },
            {
                title: '奥',
                checks: [
                    { label: '床影', flg: false },
                    { label: '曲げ', flg: false },
                    { label: 'ぽよ', flg: false }
                ],
                imageFile: null,
                imageUrl: null,
                size: [2, 2],
                color: 'rgb(0, 0, 255)',
                mesh: null
            },
            {
                title: '真ん中',
                checks: [
                    { label: '床影', flg: false },
                    { label: '曲げ', flg: false },
                    { label: 'ぽよ', flg: false }
                ],
                imageFile: null,
                imageUrl: null,
                size: [2, 2],
                color: 'rgb(0, 255, 255)',
                mesh: null
            },
            {
                title: '手前',
                checks: [
                    { label: '床影', flg: false },
                    { label: '曲げ', flg: false },
                    { label: 'ぽよ', flg: false }
                ],
                imageFile: null,
                imageUrl: null,
                size: [2, 2],
                color: 'rgb(255, 255, 0)',
                mesh: null
            }
        ],
        arImg: null,
        qrCtx: null,
        createAreaVisibleFlg: false,
        creatingFlg: false,
        pRenderer: null,
        pScene: null,
        pCamera: null,
        gyroUrl: null
    },
    created: function () {
        var self = this;

        if (!location.search) return;

        var arg = {};
        var pair = location.search.substring(1).split('&');
        for(var i=0; pair[i]; i++) {
            var kv = pair[i].split('=');
            arg[kv[0]] = decodeURIComponent(kv[1]);
        }
        var pad = new Array(self.arData.length).join('0');

        arg.warpList = arg.fw && (pad + parseInt(arg.fw, 16).toString(2)).slice(-1 * self.arData.length).split('').reverse();
        arg.shodowList = arg.fs && (pad + parseInt(arg.fs, 16).toString(2)).slice(-1 * self.arData.length).split('').reverse();
        arg.poyoList = arg.fp && (pad + parseInt(arg.fp, 16).toString(2)).slice(-1 * self.arData.length).split('').reverse();
        arg.sizeList = arg.wh && (pad + pad + parseInt(arg.wh, 16).toString(10)).slice(-2 * self.arData.length).match(/.{2}/g).reverse();

        self.arData.forEach(function (el, idx) {
            self.arData[idx].imageUrl = arg['i' + idx];
            self.arData[idx].checks[0].flg = arg.shodowList && !!Number(arg.shodowList[idx]);
            self.arData[idx].checks[1].flg = arg.warpList && !!Number(arg.warpList[idx]);
            self.arData[idx].checks[2].flg = arg.poyoList && !!Number(arg.poyoList[idx]);
            self.arData[idx].size = [Number(arg.sizeList[idx][0]), Number(arg.sizeList[idx][1])];
        });
    },
    mounted: function () {
        var self = this;

        var width  = self.$refs.pCanvas.offsetWidth;
        var height = self.$refs.pCanvas.offsetHeight;
        var aspect = width / height;

        self.pRenderer = new THREE.WebGLRenderer({
            canvas: self.$refs.pCanvas,
            antialias: true
        });
        self.pRenderer.setPixelRatio(window.devicePixelRatio);
        self.pRenderer.setSize(width, height);

        self.pScene = new THREE.Scene();
        self.pScene.background = new THREE.Color(0xffffff);

        self.pCamera = new THREE.PerspectiveCamera(20, aspect, 1, 1000);
        self.pCamera.position.set(6, 10, 10);
        self.pCamera.lookAt(new THREE.Vector3(0, 1, 0));

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 100, 100);
        self.pScene.add( directionalLight );
        var light = new THREE.AmbientLight(0xffffff, 0.5);
        self.pScene.add(light);

        var geometry = new THREE.PlaneGeometry(1, 1);
        var material = new THREE.MeshLambertMaterial({color: 0x000000});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.position.set(0, -0.015, 0);
        self.pScene.add(mesh);
        var geometry = new THREE.PlaneGeometry(0.5, 0.5);
        var material = new THREE.MeshLambertMaterial({color: 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.position.set(0, -0.01, 0);
        self.pScene.add(mesh);

        self.arData.forEach(function (el, idx) {
            var geometry = new THREE.PlaneGeometry(1, 1);
            var material = new THREE.MeshLambertMaterial({
                color: el.color,
                transparent: true,
                depthTest: false
            });
            el.mesh = new THREE.Mesh(geometry, material);
            self.pScene.add(el.mesh);
        });
        self.pUpdate();
    },
    watch: {
        viewerUrl: function () {
            var self = this;
            history.replaceState('', '', self.queryString);
            self.pUpdate();
        }
    },
    computed: {
        isSubmitDisabled: function () {
            var self = this;
            return self.creatingFlg || self.arData.every(function (el) {
                return !el.imageUrl || !el.imageUrl.match(/^http/);
            });
        },
        queryString: function () {
            var self = this;
            var str = '?wh=' + self.convert10_16(self.arData.map(function (el) {
                return el.size.join('');
            }).reverse().join(''));
            self.flgName.forEach(function (val, idx) {
                var num = self.convert2_16(self.arData.map(function (el) {
                    return el.checks[idx].flg ? 1 : 0;
                }).reverse().join(''));
                if(num !== '0') {
                    str += '&' + val + '=' + num;
                }
            });
            self.arData.forEach(function (el, idx) {
                if (el.imageUrl) {
                    str += '&i' + idx + '=' + el.imageUrl;
                }
            });

            return str;
        },
        viewerUrl: function () {
            var self = this;

            return 'https://web-ar-viewer.firebaseapp.com' + self.queryString;
        }
    },
    methods: {
        scroll: function (el) {
            scrollTo(0, window.pageYOffset + el.getBoundingClientRect().top);
        },
        selectImage: function (i,e) {
            var self = this;

            if (!e.target.files.length) {
                return;
            }

            var file = e.target.files[0];
            var fr = new FileReader();
            fr.onload = function() {
                if(file.size > 10000000) {
                    alert('ファイルサイズが10MBを超えています。\nファイルサイズを抑えるか、他のサービスで事前にアップロードしておいたものを使用してください。')
                    return false;
                }
                self.arData[i].imageFile = fr.result;

                var loader = new THREE.TextureLoader();
                loader.load(fr.result, function (texture) {
                    texture.minFilter = THREE.LinearFilter;
                    var material = new THREE.MeshLambertMaterial({map: texture, transparent: true, depthTest: false});
                    self.arData[i].mesh.material = material;
                    self.pUpdate();
                });
            }
            fr.readAsDataURL(file);
        },
        uploadImage: function (i) {
            var self = this;

            self.arData[i].imageUrl = "アップロード中…";

            var req = new XMLHttpRequest();
            req.open('POST', "https://api.imgur.com/3/image", true);
            req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            req.setRequestHeader('Authorization', 'Client-ID 14834ce07369dac');
            req.onload = function (event) {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        self.arData[i].imageUrl = eval('(' + req.responseText + ')').data.link;
                        self.arData[i].imageFile = null;
                    } else {
                        self.arData[i].imageUrl = null;
                        alert('アップロードに失敗しました。\nError: ' + req.status);
                    }
                }
            };
            req.onerror = function (event) {
                self.arData[i].imageUrl = null;
                alert('アップロード中にエラーが発生しました。');
            };
            req.send('image=' + encodeURIComponent(self.arData[i].imageFile.split(',')[1]));
        },
        cancelImage: function (i) {
            var self = this;
            self.arData[i].imageFile = null;

            var material = new THREE.MeshLambertMaterial({
                color: self.arData[i].color,
                transparent: true,
                depthTest: false
            });
            self.arData[i].mesh.material = material;
            self.pUpdate();
        },
        createAr: function () {
            var self = this;

            self.gyroUrl = self.viewerUrl + '&gyro=1';

            self.creatingFlg = true;

            // URL短縮
            var req = new XMLHttpRequest();
            req.open('POST', "https://api-ssl.bitly.com/v3/shorten", true);
            req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            req.onload = function (event) {
                if (req.readyState === 4) {

                    // bitlyの制限に引っかかっても作れるようにはする
                    if (!self.qrCtx) {
                        self.qrCtx = self.$refs.qrCanvas.getContext('2d');
                        self.qrCtx.fillStyle = '#fff';
                    }
                    if (!self.arImg) {
                        self.arImg = new Image();
                        self.arImg.src = 'images/ar.png';
                    }

                    self.qrCtx.fillRect(0, 0, 1024, 1024);

                    var img = new Image();
                    img.crossOrigin = 'Anonymous';

                    var chartUrl = 'https://chart.apis.google.com/chart?chs=364x364&cht=qr&chl=';

                    if (req.status === 200) {
                        img.src = chartUrl + encodeURIComponent(eval('(' + req.responseText + ')').data.url);
                    } else {
                        img.src = chartUrl + encodeURIComponent(self.viewerUrl);
                    }

                    img.onload = function () {
                        self.createAreaVisibleFlg = true;
                        self.qrCtx.drawImage(img, 372, 286);
                        self.qrCtx.beginPath();
                        self.qrCtx.lineWidth = 206;
                        self.qrCtx.strokeRect(205, 205, 614, 614);
                        self.qrCtx.drawImage(self.arImg, 332, 626);

                        self.$refs.qrImg.src = self.$refs.qrCanvas.toDataURL();
                        self.creatingFlg = false;
                    };
                }
            };
            req.onerror = function (event) {
                alert('QRコード生成中にエラーが発生しました。');
            };
            req.send('domain=j%2emp&longUrl=' + encodeURIComponent(self.viewerUrl) + '&access_token=ea695cba9768d20a417f5162db91ddef4ba81b5c');
        },
        convert2_16: function (numStr) {
            return parseInt(numStr, 2).toString(16);
        },
        convert10_16: function (numStr) {
            return parseInt(numStr, 10).toString(16);
        },
        previewViwer: function () {
            var self = this;
            window.open(self.viewerUrl + '&preview=1');
        },
        gyroViwer: function () {
            var self = this;
            window.open(self.gyroUrl);
        },
        tweetGyro: function () {
            var self = this;
            window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('WebARジェネレータでARを作ったよ！') + '&url=' + encodeURIComponent(self.gyroUrl) + '&hashtags=WebARジェネレータ');
        },
        pUpdate: function () {
            var self = this;

            self.arData.forEach(function (el, idx) {
                el.mesh.material.opacity = el.imageUrl ? 0.5 : 0.1;
                if (idx === 0) {
                    if (el.checks[1].flg) {
                        var geometry = new THREE.SphereGeometry(0.5, 32, 32);
                        el.mesh.rotation.set(0, -Math.PI/2, 0);

                        el.mesh.geometry = geometry;
                        el.mesh.position.set(0, el.size[1]/2, 0);
                        el.mesh.scale.set(el.size[1], el.size[1], el.size[1]);
                    } else {
                        var geometry = new THREE.PlaneGeometry(1, 1);

                        el.mesh.geometry = geometry;
                        el.mesh.position.set(0, 0, 0);
                        el.mesh.rotation.set(-Math.PI/2, 0, 0);
                        el.mesh.scale.set(el.size[0], el.size[1], 1);
                    }
                } else {
                    el.mesh.position.set(0, el.size[1]/2, [0, -self.arData[0].size[1]/2, 0, self.arData[0].size[1]/2][idx]);
                    el.mesh.scale.set(el.size[0], el.size[1], 1);
                }
            });
            self.pRenderer.render(self.pScene, self.pCamera);
        }
    }
});
