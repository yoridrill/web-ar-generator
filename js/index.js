new Vue({
    el: '#app',
    data: {
        flgName: ['fw', 'fs', 'fp', 'fk'],
        touchName: ['ft', 'fg'],
        arData: [
            {
                openFlg: false,
                tabOptionType: 'effect',
                title: '床 (または球)',
                checks: [
                    { label: '球体', flg: false, img: "images/sphere.png" },
                    { label: '回転', flg: false, img: "images/rotate.gif" },
                    { label: 'ぽよ', flg: false, img: "images/poyo.gif" },
                    { label: 'キラ', flg: false, img: "images/kira.gif" }
                ],
                touchChecks: [
                    { label: 'くるん', flg: false, img: "images/turn.gif" },
                    { label: 'ぷにっ', flg: false, img: "images/guni.gif" }
                ],
                image: {
                    file: null,
                    url: null
                },
                map: {
                    file: null,
                    url: null
                },
                touch: {
                    file: null,
                    url: null
                },
                chromakey: [25, 229, 51],
                availableSizeX: [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],
                availableSizeY: [0,1,2,3,4,5,6,7,8,9],
                size: [2, 2],
                decaFlg: false,
                color: 'rgb(255, 151, 112)',
                rgba: 'rgba(255, 151, 112, 0.3)',
                mesh: null
            },
            {
                openFlg: false,
                tabOptionType: 'effect',
                title: '奥',
                checks: [
                    { label: '曲げ', flg: false, img: "images/warp_bg.png" },
                    { label: '影', flg: false, img: "images/shadow.png" },
                    { label: 'ぽよ', flg: false, img: "images/poyo.gif" },
                    { label: 'キラ', flg: false, img: "images/kira.gif" }
                ],
                touchChecks: [
                    { label: 'くるん', flg: false, img: "images/turn.gif" },
                    { label: 'ぷにっ', flg: false, img: "images/guni.gif" }
                ],
                image: {
                    file: null,
                    url: null
                },
                map: {
                    file: null,
                    url: null
                },
                touch: {
                    file: null,
                    url: null
                },
                chromakey: [25, 229, 51],
                availableSizeX: [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],
                availableSizeY: [1,2,3,4,5,6,7,8,9],
                size: [2, 2],
                decaFlg: false,
                color: 'rgb(66, 184, 221)',
                rgba: 'rgba(66, 184, 221, 0.2)',
                mesh: null
            },
            {
                openFlg: true,
                tabOptionType: 'effect',
                title: '真ん中',
                checks: [
                    { label: '曲げ', flg: false, img: "images/warp.png" },
                    { label: '影', flg: false, img: "images/shadow.png" },
                    { label: 'ぽよ', flg: false, img: "images/poyo.gif" },
                    { label: 'キラ', flg: false, img: "images/kira.gif" }
                ],
                touchChecks: [
                    { label: 'くるん', flg: false, img: "images/turn.gif" },
                    { label: 'ぷにっ', flg: false, img: "images/guni.gif" }
                ],
                image: {
                    file: null,
                    url: null
                },
                map: {
                    file: null,
                    url: null
                },
                touch: {
                    file: null,
                    url: null
                },
                chromakey: [25, 229, 51],
                availableSizeX: [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],
                availableSizeY: [1,2,3,4,5,6,7,8,9],
                size: [2, 2],
                decaFlg: false,
                color: 'rgb(240, 190, 0)',
                rgba: 'rgba(253, 231, 76, 0.4)',
                mesh: null
            },
            {
                openFlg: false,
                tabOptionType: 'effect',
                title: '手前',
                checks: [
                    { label: '曲げ', flg: false, img: "images/warp.png" },
                    { label: '影', flg: false, img: "images/shadow.png" },
                    { label: 'ぽよ', flg: false, img: "images/poyo.gif" },
                    { label: 'キラ', flg: false, img: "images/kira.gif" }
                ],
                touchChecks: [
                    { label: 'くるん', flg: false, img: "images/turn.gif" },
                    { label: 'ぷにっ', flg: false, img: "images/guni.gif" }
                ],
                image: {
                    file: null,
                    url: null
                },
                map: {
                    file: null,
                    url: null
                },
                touch: {
                    file: null,
                    url: null
                },
                chromakey: [25, 229, 51],
                availableSizeX: [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90],
                availableSizeY: [1,2,3,4,5,6,7,8,9],
                size: [2, 2],
                decaFlg: false,
                color: 'rgb(255, 112, 166)',
                rgba: 'rgba(255, 112, 166, 0.2)',
                mesh: null
            },
            {
                openFlg: true,
                tabOptionType: 'effect',
                title: '全天球',
                checks: [
                    { label: '魚眼', flg: false, img: "images/lens.png" },
                    { label: '回転', flg: false, img: "images/rotate_vr.gif" },
                    { label: '青み', flg: false, img: "images/blue.png" },
                    { label: null, flg: false, img: null }
                ],
                touchChecks: [
                    { label: null, flg: false, img: null },
                    { label: null, flg: false, img: null }
                ],
                image: {
                    file: null,
                    url: null
                },
                map: {
                    file: null,
                    url: null
                },
                touch: {
                    file: null,
                    url: null
                },
                chromakey: [25, 229, 51],
                size: [9, 9],
                decaFlg: false,
                color: 'rgb(160, 165, 170)',
                rgba: 'rgba(160, 165, 170, 0.2)',
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
        pGeoPlane: new THREE.PlaneGeometry(1, 1),
        pGeoPlaneFine: new THREE.PlaneGeometry(1, 1, 64, 64),
        pGeoSphere: new THREE.SphereGeometry(0.5, 32, 16),
        pGeoSphereFine: new THREE.SphereGeometry(0.5, 128, 64),
        pMarkerAr0: null,
        pMultiGroup: null,
        zoomRange: 1,
        tweetUrl: null,
        optionType: 'normal', // ['vr'|'multi']
        vrPos: [0, 0, -4],
        offset: [0, 0, 0],
        markerAr0TurnFlg: false,
        detailOpenFlg: false,
        screenWidth: 0
    },
    created: function () {
        var self = this;

        self.screenWidth = window.innerWidth;

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
        arg.kiraList = arg.fk && (pad + parseInt(arg.fk, 16).toString(2)).slice(-1 * self.arData.length).split('').reverse();
        arg.turnList = arg.ft && (pad + parseInt(arg.ft, 16).toString(2)).slice(-1 * self.arData.length).split('').reverse();
        arg.guniList = arg.fg && (pad + parseInt(arg.fg, 16).toString(2)).slice(-1 * self.arData.length).split('').reverse();
        arg.decaList = arg.fd && (pad + parseInt(arg.fd, 16).toString(2)).slice(-1 * self.arData.length).split('').reverse();
        arg.sizeList = arg.wh && (pad + pad + parseInt(arg.wh, 16).toString(10)).slice(-2 * self.arData.length).match(/.{2}/g).reverse();

        self.arData.forEach(function (el, idx) {
            self.arData[idx].image.url = arg['i' + idx];
            self.arData[idx].map.url = arg['m' + idx];
            self.arData[idx].touch.url = arg['t' + idx];
            self.arData[idx].checks[0].flg = arg.warpList && !!Number(arg.warpList[idx]);
            self.arData[idx].checks[1].flg = arg.shodowList && !!Number(arg.shodowList[idx]);
            self.arData[idx].checks[2].flg = arg.poyoList && !!Number(arg.poyoList[idx]);
            self.arData[idx].checks[3].flg = arg.kiraList && !!Number(arg.kiraList[idx]);
            self.arData[idx].touchChecks[0].flg = arg.turnList && !!Number(arg.turnList[idx]);
            self.arData[idx].touchChecks[1].flg = arg.guniList && !!Number(arg.guniList[idx]);
            self.arData[idx].decaFlg = arg.decaList && !!Number(arg.decaList[idx]);
            self.arData[idx].size = [Number(arg.sizeList[idx][0]), Number(arg.sizeList[idx][1])];
            if (self.arData[idx].decaFlg) {
                self.arData[idx].size[0] *= 10;
            }
            if (arg['i' + idx]) {
                self.arData[idx].openFlg = true;
            }
            if (arg['kc' + idx]) {
                var rgb = decodeURIComponent(arg['kc' + idx]).split(' ');
                self.arData[idx].chromakey = rgb.map(function(el) {
                    return Math.round(el*255);
                });
            }
        });

        if (self.arData[4].image.url) {
            self.optionType = 'vr';
        } else if (arg.multi) {
            self.optionType = 'multi';
        }

        if (arg.vrPos) {
            self.vrPos = decodeURIComponent(arg.vrPos).split(' ');
        }
        if (arg.offset) {
            self.offset = decodeURIComponent(arg.offset).split(' ');
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

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(0, 100, 100);
        self.pScene.add(directionalLight);
        var light = new THREE.AmbientLight(0xffffff, 0.8);
        self.pScene.add(light);

        self.drawMarker(0);
        var arTexture = new THREE.CanvasTexture(self.qrCanvas[0]);
        var material = new THREE.MeshBasicMaterial({map: arTexture});
        self.pMarkerAr0 = new THREE.Mesh(self.pGeoPlane, material);
        self.pMarkerAr0.scale.set(1.24,1.24,1);
        self.pMarkerAr0.rotation.set(-Math.PI/2, 0, 0);
        self.pMarkerAr0.position.set(0, -0.01, 0);
        self.pScene.add(self.pMarkerAr0);

        self.arData.forEach(function (el, idx) {
            var material = new THREE.MeshPhongMaterial({
                color: el.color,
                transparent: true,
                depthTest: false,
                side: THREE.DoubleSide
            });
            material.displacementBias = -0.5;
            if (idx === 4) {
                el.mesh = new THREE.Mesh(self.pGeoSphere, material);
                el.mesh.material.side = THREE.BackSide;
                el.mesh.scale.set(500, 500, 500);
                el.mesh.rotation.set(0, -Math.PI/2, 0);
            } else {
                el.mesh = new THREE.Mesh(self.pGeoPlane, material);
            }
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
        },
        zoomRange: function () {
            var self = this;
            self.pCamera.zoom = self.zoomRange;
            self.pCamera.updateProjectionMatrix();
            self.pRenderer.render(self.pScene, self.pCamera);
        }
    },
    computed: {
        allOpenFlg: function () {
            var self = this;
            return self.arData.every(function (el) {
                return el.openFlg;
            });
        },
        isSubmitDisabled: function () {
            var self = this;
            return self.creatingFlg || self.arData.every(function (el) {
                return !el.image.url;
            }) || self.arData.some(function (el) {
                return (el.image.url && !el.image.url.match(/^http/)) || (el.map.url && !el.map.url.match(/^http/)) || (el.touch.url && !el.touch.url.match(/^http/));
            });
        },
        queryString: function () {
            var self = this;
            var str = '?wh=' + self.convert10_16(self.arData.map(function (el) {
                if (el.size[0] > 9) {
                    el.decaFlg = true;
                    return el.size[0]/10 + '' + el.size[1];
                } else {
                    el.decaFlg = false;
                    return el.size.join('');
                }
            }).reverse().join(''));
            self.flgName.forEach(function (val, idx) {
                var num = self.convert2_16(self.arData.map(function (el) {
                    return el.checks[idx].flg ? 1 : 0;
                }).reverse().join(''));
                if(num !== '0') {
                    str += '&' + val + '=' + num;
                }
            });
            self.touchName.forEach(function (val, idx) {
                var num = self.convert2_16(self.arData.map(function (el) {
                    return el.touchChecks[idx].flg ? 1 : 0;
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
                if (el.image.url && (idx !== 4 || self.optionType === 'vr')) {
                    str += '&i' + idx + '=' + el.image.url;
                    if (el.map.url) {
                        str += '&m' + idx + '=' + el.map.url;
                    }
                    if (el.touch.url) {
                        str += '&t' + idx + '=' + el.touch.url;
                        str += '&kc' + idx + '=' + encodeURIComponent(Math.floor(el.chromakey[0]/2.55)/100 + ' ' + Math.floor(el.chromakey[1]/2.55)/100 + ' ' + Math.floor(el.chromakey[2]/2.55)/100);
                    }
                }
            });

            if (self.optionType === 'vr') {
                str += '&vrPos=' + encodeURIComponent(self.vrPos.join(' '));
            } else if (self.optionType === 'multi') {
                str += '&multi=1';
            } else if (self.offset[0] * self.offset[0] + self.offset[1] * self.offset[1] + self.offset[2] * self.offset[2]) {
                str += '&offset=' + encodeURIComponent(self.offset.join(' '));
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
        switchAllOpen: function (flg) {
            var self = this;
            self.arData.forEach(function (el) {
                el.openFlg = flg;
            });
        },
        selectImage: function (i,e,target) {
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
                self.arData[i][target].file = fr.result;

                var loader = new THREE.TextureLoader();

                if (target === 'image') {
                    loader.load(fr.result, function (texture) {
                        texture.minFilter = THREE.LinearFilter;
                        self.arData[i].mesh.material.map = texture;
                        var rate = texture.image.width/texture.image.height;
                        if (rate < 1/9) {// .111111111
                            self.arData[i].size = [1,9];
                        } else if (rate < 1.2/3) {// .4
                            self.arData[i].size = [1,Math.round(1/rate)];
                        } else if (rate < 1.2/2) {// .6
                            self.arData[i].size = [2,4];
                        } else if (rate < 3.5/4) {// .875
                            self.arData[i].size = [3,4];
                        } else if (rate < 4/3.5) {// 1.142857143
                            self.arData[i].size = [2,2];
                        } else if (rate < 2/1.2) {// 1.666666667
                            self.arData[i].size = [4,3];
                        } else if (rate < 3/1.2) {// 2.5
                            self.arData[i].size = [4,2];
                        } else if (rate < 9){
                            self.arData[i].size = [Math.round(rate),1];
                        } else {
                            self.arData[i].size = [9,1];
                        }
                        self.arData[i].mesh.material.needsUpdate = true;
                        self.pUpdate();
                    });
                } else if (target === 'map') {
                    if (i===0 && self.arData[i].checks[0].flg) {
                        self.arData[i].mesh.geometry = self.pGeoSphereFine;
                    } else if (i !== 4) {
                        self.arData[i].mesh.geometry = self.pGeoPlaneFine;
                    }
                    loader.load(fr.result, function (texture) {
                        texture.minFilter = THREE.LinearFilter;
                        self.arData[i].mesh.material.displacementMap = texture;
                        self.arData[i].mesh.material.needsUpdate = true;
                        self.pUpdate();
                    });
                }
            }
            fr.readAsDataURL(file);
        },
        uploadImage: function (i,target) {
            var self = this;

            self.arData[i][target].url = "アップロード中…";

            var req = new XMLHttpRequest();
            req.open('POST', "https://api.imgur.com/3/image", true);
            req.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            req.setRequestHeader('Authorization', 'Client-ID 14834ce07369dac');
            req.onload = function (event) {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        self.arData[i][target].url = eval('(' + req.responseText + ')').data.link;
                        self.arData[i][target].file = null;
                    } else {
                        self.arData[i][target].url = '';
                        alert('アップロードに失敗しました。\nError: ' + req.status);
                    }
                }
            };
            req.onerror = function (event) {
                self.arData[i][target].url = '';
                alert('アップロード中にエラーが発生しました。');
            };
            req.send('image=' + encodeURIComponent(self.arData[i][target].file.split(',')[1]));
        },
        cancelImage: function (i,target) {
            var self = this;
            self.arData[i][target].file = null;

            if (target === 'image') {
                self.arData[i].mesh.material.map = null;
                self.arData[i].mesh.material.needsUpdate = true;
            } else if (target === 'map') {
                self.arData[i].mesh.material.displacementMap = null;
                self.arData[i].mesh.material.needsUpdate = true;
            }
            self.pUpdate();
        },
        createAr: function () {
            var self = this;

            if (self.optionType === 'vr' && !self.arData[4].image.url && window.confirm('VRモードがオンになっていますが、全天球画像が設定されていません。\nVRモードをオフにしてARを作りますか？')) {
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
                var elH = el.decaFlg ? el.size[1]*10 : el.size[1];
                el.mesh.material.opacity = el.image.url ? 0.5 : 0.1;
                if (idx === 0) {
                    if (el.checks[0].flg) {
                        el.mesh.geometry = el.mesh.material.displacementMap ? self.pGeoSphereFine : self.pGeoSphere;
                        el.mesh.rotation.set(0, -Math.PI/2, 0);
                        el.mesh.position.set(0, el.size[0]/2, 0);
                        el.mesh.scale.set(el.size[0], el.size[0], el.size[0]);
                    } else {
                        self.arData[0].mesh.geometry = self.arData[0].mesh.material.displacementMap ? self.pGeoPlaneFine : self.pGeoPlane;
                        self.arData[0].mesh.position.set(0, 0, 0);
                        self.arData[0].mesh.rotation.set(-Math.PI/2, 0, 0);
                        self.arData[0].mesh.scale.set(el.size[0], elH, 1);
                        el.mesh.scale.set(el.size[0], elH, 1);
                    }
                } else if (idx !== 4) {
                    if (self.optionType === 'multi') {
                        var pos = [
                            {x: 0, z: 0},
                            {x: 2, z: -2},
                            {x: 0, z: -2},
                            {x: -2, z: -2}
                        ];
                    } else {
                        var ar0H = self.arData[0].decaFlg ? self.arData[0].size[1]*10 : self.arData[0].size[1];
                        var pos = [
                            {x: 0, z: 0},
                            {x: 0, z: -ar0H/2},
                            {x: 0, z: 0},
                            {x: 0, z: ar0H/2}
                        ];
                    }
                    el.mesh.position.set(pos[idx].x, elH/2, pos[idx].z);
                    el.mesh.scale.set(el.size[0], elH, 1);
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
                    var arTexture = new THREE.CanvasTexture(self.qrCanvas[i]);
                    var material = new THREE.MeshBasicMaterial({map: arTexture});
                    var mesh = new THREE.Mesh(self.pGeoPlane, material);
                    mesh.scale.set(1.24, 1.24, 1);
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
