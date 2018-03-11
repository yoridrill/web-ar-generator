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
    mounted: function () {
        var self = this;

        var width  = self.$refs.pCanvas.offsetWidth;
        var height = self.$refs.pCanvas.offsetHeight;
        var aspect = width / height;

        self.pRenderer = new THREE.WebGLRenderer({
            canvas: self.$refs.pCanvas,
            antialias: true
        });
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
            self.pUpdate();
        }
    },
    computed: {
        isSubmitDisabled: function () {
            var self = this;
            return self.arData.every(function (el) {
                return !el.imageUrl || !el.imageUrl.match(/^http/);
            });
        },
        viewerUrl: function () {
            var self = this;

            var url = 'https://web-ar-viewer.firebaseapp.com?wh=' + self.convert10_16(self.arData.map(function (el) {
                return el.size.join('');
            }).reverse().join(''));

            self.flgName.forEach(function (val, idx) {
                var num = self.convert2_16(self.arData.map(function (el) {
                    return el.checks[idx].flg ? 1 : 0;
                }).reverse().join(''));

                if(num !== '0') {
                    url += '&' + val + '=' + num;
                }
            });

            self.arData.forEach(function (el, idx) {
                if (el.imageUrl) {
                    url += '&i' + idx + '=' + el.imageUrl;
                }
            });
            return url;
        }
    },
    methods: {
        scroll: function (el) {
            scrollTo(0, window.pageYOffset + el.getBoundingClientRect().top);
        },
        createAr: function () {
            var self = this;

            self.gyroUrl = self.viewerUrl + '&gyro=1';

            self.creatingFlg = true;

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
            img.crossOrigin = "Anonymous";
            img.src = 'https://chart.apis.google.com/chart?chs=364x364&cht=qr&chl=' + encodeURIComponent(self.viewerUrl);

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
