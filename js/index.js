new Vue({
    el: '#app',
    data: {
        flgName: ['fs', 'fw', 'fp'],
        arData: [
            {
                title: '床',
                checks: [
                    { label: '回転', flg: false, img: "images/rotate.gif" },
                    { label: '球体', flg: false, img: "images/sphere.png" },
                    { label: 'ぽよ', flg: false, img: "images/poyo.gif" }
                ],
                imageFile: null,
                imageUrl: null,
                size: [2, 2],
                decaFlg: false,
                color: 'rgb(255, 0, 180)',
                mesh: null
            },
            {
                title: '奥',
                checks: [
                    { label: '影　', flg: false, img: "images/shadow.png" },
                    { label: '曲げ', flg: false, img: "images/warp_bg.png" },
                    { label: 'ぽよ', flg: false, img: "images/poyo.gif" }
                ],
                imageFile: null,
                imageUrl: null,
                size: [2, 2],
                decaFlg: false,
                color: 'rgb(0, 0, 255)',
                mesh: null
            },
            {
                title: '真ん中',
                checks: [
                    { label: '影　', flg: false, img: "images/shadow.png" },
                    { label: '曲げ', flg: false, img: "images/warp.png" },
                    { label: 'ぽよ', flg: false, img: "images/poyo.gif" }
                ],
                imageFile: null,
                imageUrl: null,
                size: [2, 2],
                decaFlg: false,
                color: 'rgb(0, 220, 255)',
                mesh: null
            },
            {
                title: '手前',
                checks: [
                    { label: '影　', flg: false, img: "images/shadow.png" },
                    { label: '曲げ', flg: false, img: "images/warp.png" },
                    { label: 'ぽよ', flg: false, img: "images/poyo.gif" }
                ],
                imageFile: null,
                imageUrl: null,
                size: [2, 2],
                decaFlg: false,
                color: 'rgb(100, 255, 0)',
                mesh: null
            },
            {
                title: '全天球',
                checks: [
                    { label: '回転', flg: false, img: "images/rotate_vr.gif" },
                    { label: '魚眼', flg: false, img: "images/lens.png" },
                    { label: '青み', flg: false, img: "images/blue.png" }
                ],
                imageFile: null,
                imageUrl: null,
                size: [9, 9],
                decaFlg: false,
                color: 'rgb(150, 170, 190)',
                mesh: null
            }
        ],
        arImg: new Array(4),
        qrCanvas: new Array(4),
        qrCtx: new Array(4),
        creatingFlg: false,
        resultFlg: false,
        pRenderer: null,
        pScene: null,
        pCamera: null,
        pMarkerAr0: null,
        pMultiGroup: null,
        tweetUrl: null,
        optionType: 'normal', // ['vr'|'multi']
        vrPos: [0, 0, -4]
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
        arg.decaList = arg.fd && (pad + parseInt(arg.fd, 16).toString(2)).slice(-1 * self.arData.length).split('').reverse();
        arg.sizeList = arg.wh && (pad + pad + parseInt(arg.wh, 16).toString(10)).slice(-2 * self.arData.length).match(/.{2}/g).reverse();

        self.arData.forEach(function (el, idx) {
            self.arData[idx].imageUrl = arg['i' + idx];
            self.arData[idx].checks[0].flg = arg.shodowList && !!Number(arg.shodowList[idx]);
            self.arData[idx].checks[1].flg = arg.warpList && !!Number(arg.warpList[idx]);
            self.arData[idx].checks[2].flg = arg.poyoList && !!Number(arg.poyoList[idx]);
            self.arData[idx].decaFlg = arg.decaList && !!Number(arg.decaList[idx]);
            self.arData[idx].size = [Number(arg.sizeList[idx][0]), Number(arg.sizeList[idx][1])];
        });

        if (self.arData[4].imageUrl) {
            self.optionType = 'vr';
        } else if (arg.multi) {
            self.optionType = 'multi';
        }

        if (arg.vrPos) {
            self.vrPos = decodeURIComponent(arg.vrPos).split(' ');
        }
    },
    mounted: function () {
        var self = this;

        for (var i = 0; i < 4; i++) {
            self.arImg[i] = new Image();
            self.arImg[i].src = 'images/ar' + i + '.png';
            self.qrCanvas[i] = document.createElement('canvas');
            self.qrCtx[i] = self.qrCanvas[i].getContext('2d');
            self.qrCanvas[i].width = 1024;
            self.qrCanvas[i].height = 1024;
            self.qrCtx[i].fillStyle = '#fff';
        }

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
        self.pScene.add(directionalLight);
        var light = new THREE.AmbientLight(0xffffff, 0.5);
        self.pScene.add(light);

        self.drawMarker(0);
        var geometry = new THREE.PlaneGeometry(1.24, 1.24);
        var arTexture = new THREE.CanvasTexture(self.qrCanvas[0]);
        var material = new THREE.MeshLambertMaterial({map: arTexture});
        self.pMarkerAr0 = new THREE.Mesh(geometry, material);
        self.pMarkerAr0.rotation.set(-Math.PI/2, 0, 0);
        self.pMarkerAr0.position.set(0, -0.01, 0);
        self.pScene.add(self.pMarkerAr0);

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
        optionType: function () {
            var self = this;
            self.resultFlg = false;
            self.pToggleLayout();
        },
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
                return !el.imageUrl;
            }) || self.arData.some(function (el) {
                return el.imageUrl && !el.imageUrl.match(/^http/);
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
            //decaFlg
            var numDeca = self.convert2_16(self.arData.map(function (el) {
                return el.decaFlg ? 1 : 0;
            }).reverse().join(''));
            if(numDeca !== '0') {
                str += '&fd=' + numDeca;
            }

            self.arData.forEach(function (el, idx) {
                if (el.imageUrl && (idx !== 4 || self.optionType === 'vr')) {
                    str += '&i' + idx + '=' + el.imageUrl;
                }
            });

            if (self.optionType === 'multi') {
                str += '&multi=1';
            } else if (self.optionType === 'vr') {
                str += '&vrPos=' + encodeURIComponent(self.vrPos.join(' '));
            }

            return str;
        },
        viewerUrl: function () {
            var self = this;

            return 'https://web-ar-viewer.firebaseapp.com/' + (self.optionType === 'vr' ? 'vr/' : '') + self.queryString;
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

            if (self.optionType === 'vr' && !self.arData[4].imageUrl && window.confirm('VRモードがオンになっていますが、全天球画像が設定されていません。\nVRモードをオフにしてARを作りますか？')) {
                self.optionType = 'normal';
            }

            self.tweetUrl = self.viewerUrl + (self.optionType === 'vr' ? '' : '&gyro=1');

            self.resultFlg = false;
            self.creatingFlg = true;

            // URL短縮
            var req = new XMLHttpRequest();
            req.open('POST', "https://api-ssl.bitly.com/v3/shorten", true);
            req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            req.onload = function (event) {
                if (req.readyState === 4) {

                    // bitlyの制限に引っかかっても作れるようにはする
                    if (req.status === 200) {
                        var qrUrl = eval('(' + req.responseText + ')').data.url;
                    } else {
                        var qrUrl = self.viewerUrl;
                    }

                    var img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.src = 'https://chart.apis.google.com/chart?chs=' + (self.optionType==='vr' ? '512x512' : '364x364') + '&cht=qr&chl=' + encodeURIComponent(qrUrl);

                    img.onload = function () {
                        self.resultFlg = true;
                        self.creatingFlg = false;
                        self.drawMarker(0, img);
                    };

                    if (self.optionType === 'multi') {
                        var imgMini = new Image();
                        imgMini.crossOrigin = 'Anonymous';
                        imgMini.src = 'https://chart.apis.google.com/chart?chs=244x244&cht=qr&chl=' + encodeURIComponent(qrUrl);

                        imgMini.onload = function () {
                            for (var i = 1; i < 4; i++) {
                                self.drawMarker(i, imgMini);
                            }
                        };
                    }
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
            window.open(self.tweetUrl);
        },
        tweet: function () {
            var self = this;
            if (self.optionType === 'vr') {
                var comment = encodeURIComponent('WebARジェネレータでVRを作ったよ！');
            } else {
                var comment = encodeURIComponent('WebARジェネレータでARを作ったよ！');
            }
            window.open('https://twitter.com/intent/tweet?text=' + comment + '&url=' + encodeURIComponent(self.tweetUrl) + '&hashtags=WebARジェネレータ');
        },
        drawMarker: function (index, qrImg) {
            var self = this;

            self.qrCtx[index].fillRect(0, 0, 1024, 1024);

            if (self.optionType === 'vr' && qrImg) {
                self.qrCtx[index].drawImage(qrImg, 0, 0, 512, 512, 0, 0, 1024, 1024);
                self.$refs.vr_img_0.src = self.qrCanvas[index].toDataURL();
                return;
            }

            if (qrImg) {
                self.qrCtx[index].drawImage(qrImg, [372, 316, 390, 464][index], [286, 316, 316, 316][index]);
            }
            self.qrCtx[index].beginPath();
            self.qrCtx[index].lineWidth = 206;
            self.qrCtx[index].strokeRect(205, 205, 614, 614);
            self.qrCtx[index].drawImage(self.arImg[index], 332, 626);

            if (qrImg) {
                self.$refs[self.optionType+ '_img_' + index].src = self.qrCanvas[index].toDataURL();
            }
        },
        pUpdate: function () {
            var self = this;

            self.arData.forEach(function (el, idx) {
                el.mesh.material.opacity = el.imageUrl ? 0.5 : 0.1;
                if (idx === 0) {
                    if (el.checks[1].flg) {
                        var geometry = new THREE.SphereGeometry(0.5, 32, 32);
                        el.mesh.geometry = geometry;
                        el.mesh.rotation.set(0, -Math.PI/2, 0);
                        el.mesh.position.set(0, el.size[0]/2, 0);
                        el.mesh.scale.set(el.size[0], el.size[0], el.size[0]);
                    } else {
                        var geometry = new THREE.PlaneGeometry(1, 1);
                        el.mesh.geometry = geometry;
                        el.mesh.position.set(0, 0, 0);
                        el.mesh.rotation.set(-Math.PI/2, 0, 0);
                        el.mesh.scale.set(el.size[0], el.size[1], 1);
                    }
                } else if (idx === 4) {
                    var geometry = new THREE.SphereGeometry(20, 32, 32);
                    el.mesh.geometry = geometry;
                    el.mesh.material.side = THREE.BackSide;
                    el.mesh.rotation.set(0, -Math.PI/2, 0);
                    el.mesh.position.set(0, 0, 0);
                } else {
                    if (self.optionType === 'multi') {
                        var pos = [
                            {x: 0, z: 0},
                            {x: 2, z: -2},
                            {x: 0, z: -2},
                            {x: -2, z: -2}
                        ];
                    } else {
                        var pos = [
                            {x: 0, z: 0},
                            {x: 0, z: -self.arData[0].size[1]/2},
                            {x: 0, z: 0},
                            {x: 0, z: self.arData[0].size[1]/2}
                        ];
                    }
                    el.mesh.position.set(pos[idx].x, el.size[1]/2, pos[idx].z);
                    el.mesh.scale.set(el.size[0], el.size[1], 1);
                }
            });
            self.pRenderer.render(self.pScene, self.pCamera);
        },
        pToggleLayout: function () {
            var self = this;

            if (!self.pMultiGroup) {
                self.pMultiGroup = new THREE.Group();
                for (var i = 1; i < 4; i++) {
                    self.drawMarker(i);
                    var geometry = new THREE.PlaneGeometry(1.24, 1.24);
                    var arTexture = new THREE.CanvasTexture(self.qrCanvas[i]);
                    var material = new THREE.MeshLambertMaterial({map: arTexture});
                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.rotation.set(-Math.PI/2, 0, 0);
                    mesh.position.set([0, 2, 0, -2][i], -0.01, [0, -2, -2, -2][i]);
                    self.pMultiGroup.add(mesh);
                }
                self.pScene.add(self.pMultiGroup);
            }

            if (self.optionType === 'multi') {
                self.pCamera.position.set(10, 15, 15);
                self.pCamera.lookAt(new THREE.Vector3(1, 2, 0));
                self.pMultiGroup.visible = true;
            } else {
                self.pCamera.position.set(6, 10, 10);
                self.pCamera.lookAt(new THREE.Vector3(0, 1, 0));
                self.pMultiGroup.visible = false;
            }

            self.pMarkerAr0.visible = (self.optionType !== 'vr');
        }
    }
});
