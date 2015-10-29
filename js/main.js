function doScroll() {
    if (window.pageYOffset === 0) {
        window.scrollTo(0, 1);
    }
}

window.addEventListener('load', function () {
    setTimeout(doScroll, 100);
}, false);

window.onorientationchange = function () {
    setTimeout(doScroll, 100);
};
window.onresize = function () {
    setTimeout(doScroll, 100);
};

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
init(60, "legend", 480, 755, main); //16.6


var imgData = [
			{ type: "js", path: "./js/jquery-1.8.3.min.js" },
			{ type: "js", path: "./js/TouchSlide.1.1.js" },
			{ type: "js", path: "./js/global.js" },
			{ type: "js", path: "./js/jquery.bpopup.min.js" },
			{ name: "bg", path: "./images/bg.jpg" },
			{ name: "wood0", path: "./images/rock1.png" },
			{ name: "wood1", path: "./images/wood1.png" },
			{ name: "wood2", path: "./images/wood2.png" },
			{ name: "wood3", path: "./images/wood3.png" },
			{ name: "indexLogo", path: "./images/indexLogo.png" },
			{ name: "orderBtn", path: "./images/orderBtn.png" },
			{ name: "gameBtn", path: "./images/gameBtn.png" },
			{ name: "road", path: "./images/road.jpg" },
			{ name: "leftDown", path: "./images/leftDown.png" },
			{ name: "leftUp", path: "./images/leftUp.png" },
			{ name: "rightDown", path: "./images/rightDown.png" },
			{ name: "rightUp", path: "./images/rightUp.png" },
			{ name: "gameTop", path: "./images/gameTop.png" },
			{ name: "gameBot", path: "./images/gameBot.png" },
			{ name: "gameBh", path: "./images/gameBh.png" },
			{ name: "gameBotBtn", path: "./images/gameBotBtn.png" },
			{ name: "startBtn", path: "./images/startBtn.png" },
			{ name: "gravityBtnOff", path: "./images/gravityBtnOff.png" },
			{ name: "gravityBtnOn", path: "./images/gravityBtnOn.png" },
			{ name: "point1", path: "./images/point.png" },
			{ name: "point2", path: "./images/point2.png" },
			{ name: "car", path: "./images/car.png" },
			{ name: "zi0", path: "./images/zi0.png" },
			{ name: "zi1", path: "./images/zi1.png" },
			{ name: "zi2", path: "./images/zi2.png" },
			{ name: "zi3", path: "./images/zi3.png" },
			{ name: "zi4", path: "./images/zi4.png" },
			{ name: "zi5", path: "./images/zi5.png" },
			{ name: "zi6", path: "./images/zi6.png" },
			{ name: "zi7", path: "./images/zi7.png" },
			{ name: "zi8", path: "./images/zi8.png" },
			{ name: "zi9", path: "./images/zi9.png" },
			{ name: "hp", path: "./images/life.png" },
			{ name: "carAni", path: "./images/carAni.png" }
		],
		imglist, loadingLayer,
		startAllBtn = false, twoRotating = false;


		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
			if (window.orientation == 180 || window.orientation == 0) {

			    $(".rotating,.b-modal").hide().css({
			        "opacity": 0,
			        "zIndex": 1
			    });

			}
			if (window.orientation == 90 || window.orientation == -90) {

			    setTimeout(function () {

			        if (twoRotating) {
			            $(".rotating,.b-modal").show().css({
			                "opacity": 1,
			                "zIndex": 10
			            });
			            $('.b-modal').css({
			                "opacity": 0.6
			            });

			        } else {

			            twoRotating = true;

			            //显示成绩弹框
			            $('.rotating').bPopup({
			                onOpen: function () {
			                    $('.rotating').css({
			                        "zIndex": 10
			                    });
			                    // styleJs();

			                },
			                onClose: function () {

			                    $('.rotating').css({
			                        "zIndex": 1
			                    });

			                },
			                opacity: 0.6
			            });

			        }

			    }, 1000);

			}

		}, false);



//设置全屏

LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
LGlobal.align = LStageAlign.TOP_MIDDLE;
LSystem.screen(LStage.FULL_SCREEN);

function main() {
    loadingLayer = new LoadingSample4("","rgba(255,255,255,0)");
    addChild(loadingLayer);
    LLoadManage.load(
		imgData,
		function (progress) {
		    loadingLayer.setProgress(progress);
		},
		function (result) {
		    imglist = result;
		    removeChild(loadingLayer);
		    loadingLayer = null;
		    gameInit();
		}
	);
};
function gameInit(event) {

    var _this = this;
    onFrameLayer = new LSprite();

    addChild(onFrameLayer);

    //调试模式
    LGlobal.setDebug(true);

    //游戏初始
    game.start();

    //添加游戏关键帧
    onFrameLayer.addEventListener(LEvent.ENTER_FRAME, function () {
        onframe(game);
    });

};


var game = {
    toPlay: false,
    start: function () {

        var _this = this;
        _this.allLayer = new LSprite();

        onFrameLayer.addChild(_this.allLayer);

        //_this.toPlay = false;

        //添加首页背景
        _this.indexFn();

    },
    indexFn: function () {

        var _this = this;
        _this.indexLayer = new LSprite();

        _this.allLayer.addChild(_this.indexLayer);

        _this.indexBgLayer = new LSprite();
        _this.indexBgLayer.addChild(new LBitmap(new LBitmapData(imglist["bg"])));
        _this.indexBgLayer.x = -480;
        _this.indexLayer.addChild(_this.indexBgLayer);

        _this.indexLogoLayer = new LSprite();
        _this.indexLogoLayer.addChild(new LBitmap(new LBitmapData(imglist["indexLogo"])));
        _this.indexLayer.addChild(_this.indexLogoLayer);

        //添加首页按钮
        _this.indexBtnFn();

    },
    indexBtnFn: function () {

        var _this = this;

        _this.orderBtn = new LButton(new LBitmap(new LBitmapData(imglist["orderBtn"])), new LBitmap(new LBitmapData(imglist["orderBtn"])));
        _this.orderBtn.x = 30;
        _this.orderBtn.y = 470;
        _this.indexLayer.addChild(_this.orderBtn);

        _this.gameBtn = new LButton(new LBitmap(new LBitmapData(imglist["gameBtn"])), new LBitmap(new LBitmapData(imglist["gameBtn"])));
        _this.gameBtn.x = 245;
        _this.gameBtn.y = 470;
        _this.indexLayer.addChild(_this.gameBtn);

        //预约试驾按钮函数
        _this.orderBtn.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.orderDownFn, _this));
        //游戏体验按钮函数
        _this.gameBtn.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.gameDownFn, _this));


    },
    orderDownFn: function () {

        var _this = this;

        LTweenLite.to(_this.indexBgLayer, 1, {
            x: 0,
            onComplete: function () {

                _this.indexLayer.removeChild(_this.orderBtn);
                _this.indexLayer.removeChild(_this.gameBtn);
                _this.indexLayer.removeChild(_this.indexLogoLayer);

                $(".orderBgWrap").show().css({
                    "zIndex": 3
                });

            }
        });


    },
    gameDownFn: function () {

        var _this = this;

        //游戏开始
        _this.gameEnterFn();

    },
    gameEnterFn: function () {

        var _this = this;

        //开始倒计时数字
        _this.startTimer = 3;

        //开始游戏开关
        //_this.startAllBtn = false;

        //生成障碍物间隔
        _this.aGap = 0;

        //生成障碍物位置
        _this.aPos = [60, 180, 300];

        //生成障碍物间隔参考
        _this.aGapStep = 20;

        //得分
        _this.point = 0;

        //控制游戏难度的速度
        _this.allSpeed = 10;

        //删除首页的层级
        _this.allLayer.removeChild(_this.indexLayer);

        //游戏层
        _this.gameLayer = new LSprite();
        _this.allLayer.addChild(_this.gameLayer);

        //生命值
        _this.hp = 3;

        //游戏按钮层
        _this.gameBtnLayer = new LSprite();
        _this.allLayer.addChild(_this.gameBtnLayer);

        //添加路
        _this.roadFn();

        //添加障碍物
        _this.allItemLayer = new LSprite();
        _this.gameLayer.addChild(_this.allItemLayer);

        //页面头部
        _this.gameTopFn();

        //添加分数层
        _this.topPointLayer = new LSprite();
        _this.gameLayer.addChild(_this.topPointLayer);

        //添加生命层
        _this.allHpLayer = new LSprite();
        _this.gameLayer.addChild(_this.allHpLayer);

        //添加分数层
        _this.addPointFn(0);

        //添加生命层
        _this.addHpFn(3);

        //添加分数动画层
        _this.allPointLayer = new LSprite();
        _this.allLayer.addChild(_this.allPointLayer);

        //添加左右按钮
        _this.dirBtn();

        //页面底部
        _this.gameBotFn();

        //游戏开始按钮
        _this.startBtnFn();

        //添加汽车
        _this.carFn();

    },
    roadFn: function () {

        var _this = this;
        _this.roadLayer = new LSprite();
        _this.gameLayer.addChild(_this.roadLayer);

        _this.roadLayer1 = new LSprite();
        _this.roadLayer1.addChild(new LBitmap(new LBitmapData(imglist["road"])));
        _this.roadLayer.addChild(_this.roadLayer1);

        _this.roadLayer2 = new LSprite();
        _this.roadLayer2.addChild(new LBitmap(new LBitmapData(imglist["road"])));
        _this.roadLayer2.y = -755;
        _this.roadLayer.addChild(_this.roadLayer2);


    },
    dirBtn: function () {

        var _this = this;

        _this.left = new LButton(new LBitmap(new LBitmapData(imglist["leftDown"])), new LBitmap(new LBitmapData(imglist["leftUp"])));
        _this.left.x = 0;
        _this.left.y = 363;
        _this.gameLayer.addChild(_this.left);

        _this.right = new LButton(new LBitmap(new LBitmapData(imglist["rightDown"])), new LBitmap(new LBitmapData(imglist["rightUp"])));
        _this.right.x = LGlobal.width - 135;
        _this.right.y = 363;
        _this.gameLayer.addChild(_this.right);

        _this.left.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.leftFn, _this));
        _this.right.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.rightFn, _this));
        _this.left.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.leftEndFn, _this));
        _this.right.addEventListener(LMouseEvent.MOUSE_UP, $.proxy(_this.rightEndFn, _this));

    },
    leftFn: function () {

        var _this = this;

        _this.carLayer.mode = "left";

    },
    rightFn: function () {

        var _this = this;

        _this.carLayer.mode = "right";

    },
    leftEndFn: function () {

        var _this = this;

        _this.carLayer.mode = "";
        _this.carLayer.rotate = 0;

    },
    rightEndFn: function () {

        var _this = this;
        _this.carLayer.mode = "";
        _this.carLayer.rotate = 0;

    },
    gameTopFn: function () {

        var _this = this;
        _this.gameTop = new LSprite();
        _this.gameTop.addChild(new LBitmap(new LBitmapData(imglist["gameTop"])));
        _this.gameLayer.addChild(_this.gameTop);

        //游戏返回按钮
        _this.gameBhFn();

    },
    gameBhFn: function () {

        var _this = this;

        _this.gameBh = new LButton(new LBitmap(new LBitmapData(imglist["gameBh"])), new LBitmap(new LBitmapData(imglist["gameBh"])));
        _this.gameBh.x = LGlobal.width - 70;
        _this.gameBh.y = 0;
        _this.gameLayer.addChild(_this.gameBh);

        _this.gameBh.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(function () {

            if (startAllBtn) { return; }

            //重置层级
            onFrameLayer.removeChild(game.allLayer);
            game.allLayer = new LSprite();
            onFrameLayer.addChild(game.allLayer);

            //游戏返回
            _this.indexFn();

        }, _this));


    },
    gameBotFn: function () {

        var _this = this;
        _this.gameBot = new LSprite();
        _this.gameBot.addChild(new LBitmap(new LBitmapData(imglist["gameBot"])));
        _this.gameBot.x = 0;
        _this.gameBot.y = LGlobal.height - 132;
        _this.gameLayer.addChild(_this.gameBot);

        //添加游戏底部按钮
        _this.gameBotBtnFn();
    },
    gameBotBtnFn: function () {

        var _this = this;
        _this.gameBotBtn = new LSprite();
        _this.gameLayer.addChild(_this.gameBotBtn);

        _this.gameBotBtnL = new LButton(new LBitmap(new LBitmapData(imglist["gameBotBtn"])), new LBitmap(new LBitmapData(imglist["gameBotBtn"])));
        _this.gameBotBtnL.x = 0;
        _this.gameBotBtnL.y = LGlobal.height - 132;
        _this.gameBotBtn.addChild(_this.gameBotBtnL);

        _this.gameBotBtnL.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(function () {

            //显示玩法说明弹框
            $('.tk1').bPopup();

            TouchSlide({
                slideCell: "#focus",
                titCell: ".hd ul",
                mainCell: ".bd ul",
                effect: "left",
                //autoPlay:true,//自动播放
                autoPage: true,
                switchLoad: "_src"
            });

        }, _this));

        _this.gameBotBtnR = new LButton(new LBitmap(new LBitmapData(imglist["gameBotBtn"])), new LBitmap(new LBitmapData(imglist["gameBotBtn"])));
        _this.gameBotBtnR.x = LGlobal.width - 132;
        _this.gameBotBtnR.y = LGlobal.height - 132;
        _this.gameBotBtn.addChild(_this.gameBotBtnR);

        _this.gameBotBtnR.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(function () {

            //显示玩法说明弹框
            $('.tk2').bPopup();

        }, _this));

    },
    startBtnFn: function () {

        var _this = this;

        //重力感应开关
        _this.isGravity = true;

        _this.startLayer = new LSprite();
        _this.gameLayer.addChild(_this.startLayer);

        _this.startBtn = new LButton(new LBitmap(new LBitmapData(imglist["startBtn"])), new LBitmap(new LBitmapData(imglist["startBtn"])));
        _this.startBtn.x = (LGlobal.width - 130) / 2;
        _this.startBtn.y = 263;
        _this.startLayer.addChild(_this.startBtn);

        _this.startBtn.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(function () {

            //alert(3);
            _this.gameLayer.removeChild(_this.startLayer);
            //_this.startAllBtn = true;
            startAllBtn = true;

        }, _this));

        _this.gravityBtn = new LButton(new LBitmap(new LBitmapData(imglist["gravityBtnOff"])), new LBitmap(new LBitmapData(imglist["gravityBtnOff"])));
        _this.gravityBtn.x = (LGlobal.width - 130) / 2;
        _this.gravityBtn.y = 413;
        _this.startLayer.addChild(_this.gravityBtn);

        _this.gravityBtn.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.gravityBtnFn, _this));


    },
    gravityBtnFn: function () {

        var _this = this,
			canGravity = false;

        try {
            canGravity = window.DeviceMotionEvent;
        } catch (e) { };

        //重力感应
        if (_this.useGravity) {

            _this.useGravity = false;

            _this.startLayer.removeChild(_this.gravityBtn);
            _this.gravityBtn = new LButton(new LBitmap(new LBitmapData(imglist["gravityBtnOff"])), new LBitmap(new LBitmapData(imglist["gravityBtnOff"])));
            _this.gravityBtn.x = (LGlobal.width - 130) / 2;
            _this.gravityBtn.y = 413;
            _this.startLayer.addChild(_this.gravityBtn);

            _this.gravityBtn.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.gravityBtnFn, _this));

            if (canGravity) {
                window.removeEventListener('devicemotion', $.proxy(_this.deviceMotionHandler, _this), false);
            }

        } else {

            _this.useGravity = true;

            _this.startLayer.removeChild(_this.gravityBtn);
            _this.gravityBtn = new LButton(new LBitmap(new LBitmapData(imglist["gravityBtnOn"])), new LBitmap(new LBitmapData(imglist["gravityBtnOn"])));
            _this.gravityBtn.x = (LGlobal.width - 130) / 2;
            _this.gravityBtn.y = 413;
            _this.startLayer.addChild(_this.gravityBtn);

            _this.gravityBtn.addEventListener(LMouseEvent.MOUSE_DOWN, $.proxy(_this.gravityBtnFn, _this));

            if (canGravity) {
                window.addEventListener('devicemotion', $.proxy(_this.deviceMotionHandler, _this), false);
            }

        }

    },
    deviceMotionHandler: function (eventData) {

        var _this = this;

        if (startAllBtn && _this.useGravity) {
            // 获取含重力的加速度
            var acceleration = eventData.accelerationIncludingGravity,
            x = acceleration.x;

            if (window.navigator.userAgent.indexOf('Android') != -1) { //安卓样式
                var oDir = -x;
            } else {
                var oDir = x;
            }
            if (oDir > 0) {
                _this.carLayer.mode = "right";
            } else if (oDir < 0) {
                _this.carLayer.mode = "left";
            } else {
                _this.carLayer.mode = "";
            }
        }

    },
    carFn: function () {

        var _this = this;

        _this.carLayer = new Car();
        _this.carLayer.x = (LGlobal.width - 72) / 2;
        _this.carLayer.y = 510;
        _this.gameLayer.addChild(_this.carLayer);

    },
    addItemFn: function () {

        var _this = this,
		aWoodPos = Math.floor(Math.random() * 3);

        _this.itemLayer = new Item(_this);
        _this.itemLayer.x = _this.aPos[aWoodPos];

        _this.allItemLayer.addChild(_this.itemLayer);

    },
    addPointFn: function (iNum) {

        var _this = this,
			sNum = iNum + "",
			l = sNum.length,
			i;

        if (_this.topPointLayer.childList.length) {
            _this.topPointLayer.removeAllChild();
        };

        for (i = 0; i < l; i++) {
            _this.onePointLayer = new LSprite();
            _this.onePointLayer.addChild(new LBitmap(new LBitmapData(imglist["zi" + sNum[i]])));
            _this.onePointLayer.x = 90 + 24 * i;
            _this.topPointLayer.addChild(_this.onePointLayer);
        };

    },
    addHpFn: function (iNum) {

        var _this = this,
			l = iNum,
			i;

        if (_this.allHpLayer.childList.length) {
            _this.allHpLayer.removeAllChild();
        };


        for (i = 0; i < l; i++) {
            _this.oneHpLayer = new LSprite();
            _this.oneHpLayer.addChild(new LBitmap(new LBitmapData(imglist["hp"])));
            _this.oneHpLayer.x = 300 + 36 * i;
            _this.oneHpLayer.y = 20;
            _this.allHpLayer.addChild(_this.oneHpLayer);
        };

    },
    pointMoveFn: function (aPoint, x, y) {

        var _this = this;

        _this.pointMoveLayer = new Point(_this, aPoint);
        _this.pointMoveLayer.x = x;
        _this.pointMoveLayer.y = y;

        _this.allPointLayer.addChild(_this.pointMoveLayer);

    },
    point10MoveFn: function (aPoint, x, y) {

        var _this = this;

        _this.pointMoveLayer = new Point10(_this, aPoint);
        _this.pointMoveLayer.x = 125;
        _this.pointMoveLayer.y = 80;

        _this.allPointLayer.addChild(_this.pointMoveLayer);

    },
    pointMoveFn: function (aPoint, x, y) {

        var _this = this;

        _this.pointMoveLayer = new Point(_this, aPoint);
        _this.pointMoveLayer.x = x;
        _this.pointMoveLayer.y = y;

        _this.allPointLayer.addChild(_this.pointMoveLayer);

    },
    overFn: function (iNum) {

        var _this = this,
			sNum = iNum + '',
			i, l = sNum.length,
			i2, l2, sNum2,
			sHtml = '',
			sHtmlBest = '',
			code = hex_md5(iNum + "!" + "%" + "0" + "5" + "0" + "5" + "^" + "&" + "2" + "?"),
            loadTim = null,
            loadTNum = 0;

        _this.useGravity = false;

        loadTim = setInterval(function () {

            if (loadTNum == 12) {
                loadTNum = 1;
            } else {
                loadTNum++;
            }
           
            $(".scoreAreaLoad img").attr({
                "src": "images/loading" + loadTNum + ".png"
            });

        }, 100);


        //传递分数
        //$.post('../scoreajax.aspx?t=' + Math.random(), {
            //action: "GetScore",
            //score: iNum,
            //code: code
        //}, function (data) {

            //if (data == -1) {
                //alert("服务器异常");
            //}

            sNum2 = iNum + '';
            l2 = sNum2.length;

            $(".scoreBest .scoreImg").remove();
            for (i2 = 0; i2 < l2; i2++) {
                sHtmlBest += '<div class="m_fl scoreImg"><img src="images/zi' + sNum2[i2] + '.png" width="100%" /></div>';
            }
            $(".scoreBest").append(sHtmlBest);

            styleJs();

            $(".scoreAreaLoad").hide();
            clearInterval(loadTim);
            $(".scoreArea").show();

        //}).error(function () { alert("服务器异常"); });



        if (_this.toPlay) {
            $(".scoreNow .scoreImg").remove();
            for (i = 0; i < l; i++) {
                sHtml += '<div class="m_fl scoreImg"><img src="images/zi' + sNum[i] + '.png" width="100%" /></div>';
            };
            $(".scoreNow").append(sHtml);
            $('.tk3,.b-modal').show().css({
                "opacity": 1,
                "zIndex": 10
            });
            $('.b-modal').css({
                "opacity": 0.6
            });

            styleJs();

        } else {
            //显示成绩弹框
            $('.tk3').bPopup({
                onOpen: function () {
                    $(".scoreNow .scoreImg").remove();
                    for (i = 0; i < l; i++) {
                        sHtml += '<div class="m_fl scoreImg"><img src="images/zi' + sNum[i] + '.png" width="100%" /></div>';
                    };
                    $(".scoreNow").append(sHtml);
                    $('.tk3').css({
                        "zIndex": 10
                    });

                    styleJs();

                },
                onClose: function () {

                    $('.tk3').css({
                        "zIndex": 1
                    });

                    //删掉游戏结束层级
                    onFrameLayer.removeChild(_this.allLayer);
                    _this.allLayer = new LSprite();
                    onFrameLayer.addChild(_this.allLayer);

                    //重新回到首页
                    _this.start();

                },
                opacity: 0.6
            });

        };

    }
};


function onframe(game) {

    var _this = game,
		ItemChild;

    if (startAllBtn) {

        //路移动
        if (_this.roadLayer.y >= 725) {
            _this.roadLayer.y = 0;
        } else {
            _this.roadLayer.y += 10 + _this.allSpeed;
        };

        //汽车起烟
        _this.carLayer.bitmap.bitmapData.setCoordinate(0, 0);

        //汽车移动
        _this.carLayer.run();


        //障碍物移动
        for (var key1 in _this.allItemLayer.childList) {
            ItemChild = _this.allItemLayer.childList[key1];
            if (ItemChild.mode == "die") {
                _this.allItemLayer.removeChild(ItemChild);
            };
            if (_this.allItemLayer.childList[key1]) {
                _this.allItemLayer.childList[key1].run(_this.allSpeed);
            };
        };

        //添加障碍物
        if (_this.aGap++ > _this.aGapStep) {
            _this.aGap = 0;
            _this.allSpeed++;
            _this.aGapStep -= 0.5;
            _this.addItemFn();
        };

        //改变得分
        _this.addPointFn(_this.point);

        //分数动画
        for (var pointKey in _this.allPointLayer.childList) {
            _this.allPointLayer.childList[pointKey].run();
        };

    }

};

//汽车对象
function Car() {

    var _this = this;
    _this.mode = "";
    _this.canDown = false;

    base(_this, LSprite, []);

    _this.bitmap = new LBitmap(new LBitmapData(imglist["car"]));
    _this.bitmap.bitmapData.setCoordinate(72, 0);
    _this.bitmap.width = 72;
    _this.bitmap.height = 220;
    _this.bitmap.bitmapData.width = 72;
    _this.bitmap.bitmapData.height = 220;
    _this.addChild(_this.bitmap);

};

Car.prototype.run = function () {
    var _this = this;

    if (_this.mode == "left" && _this.mode != "right") {
        if (_this.x <= 50) {
            _this.x = 50;
            _this.rotate = 0;
        } else {
            _this.x -= 20;
            if (_this.rotate <= -15) {
                _this.rotate = -15;
            } else {
                _this.rotate -= 3;
            };
        };
    } else if (_this.mode == "right" && _this.mode != "left") {
        if (_this.x >= 350) {
            _this.x = 350;
            _this.rotate = 0;
        } else {
            _this.x += 20;
            if (_this.rotate >= 15) {
                _this.rotate = 15;
            } else {
                _this.rotate += 3;
            };
        };
    };

};

//添加障碍物对象
function Item(seft) {

    var _this = this,
		index = Math.floor(Math.random() * 4);

    base(_this, LSprite, []);

    _this.mode = "";
    _this.seft = seft;
    _this.onePoint = true;
    _this.carLayer = seft.carLayer;

    _this.value = index;

    _this.bitmap = new LBitmap(new LBitmapData(imglist["wood" + index]));
    _this.addChild(_this.bitmap);

};

Item.prototype.run = function (speed) {
    var _this = this,
		hit = _this.checkHit();

    _this.y += 10 + speed;

    if (_this.y >= 510 && _this.onePoint && _this.value != 0) {
        _this.onePoint = false;
        _this.seft.point += 10;
        _this.seft.pointMoveFn(2, 131, 81);
    };

    if (hit || _this.y > LGlobal.height) {
        _this.mode = "die";
    };

};
Item.prototype.checkHit = function () {
    var _this = this;

    if (LGlobal.hitTestArc(_this, _this.carLayer)) {

        switch (_this.value) {
            case 0:
                _this.seft.point += 20;
                //_this.seft.pointMoveFn(1, _this.x + 60, _this.y + 20);
                _this.seft.pointMoveFn(1, _this.carLayer.x + 30, _this.carLayer.y - 50);
                break;
            default:
                if (_this.seft.hp == 1) {
                    _this.seft.allHpLayer.removeChildAt(_this.seft.allHpLayer.childList.length - 1);
                    startAllBtn = false;
                    _this.seft.hp = 3;
                    //over画面
                    _this.seft.overFn(_this.seft.point);
                    //汽车起烟
                    _this.seft.carLayer.bitmap.bitmapData.setCoordinate(72, 0);

                } else {
                    _this.seft.hp--;
                    _this.seft.allHpLayer.removeChildAt(_this.seft.allHpLayer.childList.length - _this.seft.hp - 1);
                    LTweenLite.to(_this.carLayer, 0.1, { alpha: 0 }).to(_this.carLayer, 0.1, { alpha: 1 }).to(_this.carLayer, 0.01, { alpha: 0 }).to(_this.carLayer, 0.01, { alpha: 1 });
                }
                break;
        }

        return true;
    }
    return false;
};

function Point(seft, aPoint) {

    var _this = this;

    _this.seft = seft;

    base(_this, LSprite, []);

    _this.bitmap = new LBitmap(new LBitmapData(imglist["point" + aPoint]));

    _this.addChild(_this.bitmap);

};

Point.prototype.run = function () {
    var _this = this;

    _this.alpha -= 0.1;

    if (_this.alpha <= 0) {
        _this.seft.allPointLayer.removeChild(_this);
        return;
    };

    _this.bitmap.scaleX += 0.5;
    _this.bitmap.scaleY += 0.5;
    _this.bitmap.x = -_this.bitmap.getWidth() * 0.5;
    _this.bitmap.y = -_this.bitmap.getHeight() * 0.5;

};

function Point10(seft, aPoint) {

    var _this = this;

    _this.seft = seft;

    base(_this, LSprite, []);

    _this.bitmap = new LBitmap(new LBitmapData(imglist["point" + aPoint]));

    _this.addChild(_this.bitmap);

};

Point10.prototype.run = function () {
    var _this = this;

    _this.alpha -= 0.1;

    if (_this.alpha <= 0) {
        _this.seft.allPointLayer.removeChild(_this);
        return;
    };

    _this.bitmap.scaleX += 0.1;
    _this.bitmap.scaleY += 0.1;
    _this.bitmap.x = -_this.bitmap.getWidth() * 0.5;
    _this.bitmap.y = -_this.bitmap.getHeight() * 0.5;

};