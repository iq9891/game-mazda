function styleJs(){
	var pingKuan=$("#legend canvas").width(),
		pingGao=$("#legend canvas").height(),
		bili = function(mun){
			var oScale = mun/480;
			return oScale.toFixed(6);
		};
	
	//预约试驾
	$(".orderBgWrap").css({
		"width":pingKuan,
		"marginLeft": -pingKuan/2
	});

	$(".orderBg").css({
		"width":pingKuan * bili(440),
		"height":pingGao
	});

	$(".orderImg").css({
		"height":pingKuan * bili(632)
	});

	$(".oAfanhui").css({
		"width":pingKuan * bili(80),
		"height":pingKuan * bili(81)
    });

    $(".orderArea").each(function (i, e) {
        $(".orderArea").eq(i).css({
            "height": pingKuan * bili(50),
            "backgroundPosition": "0 " + (-pingKuan * bili(82) - pingKuan * bili(50) * i) + "px"
        });
    });


    $(".orderAreaInp,.oASel").css({
        "marginLeft": pingKuan * bili(204),
		"width":pingKuan * bili(216),
		"height":pingKuan * bili(36),
		"lineHeight":pingKuan * bili(36) + 'px'
    });
    $(".oASel").css({
        "width": pingKuan * bili(181)
    });

	$(".orderAreaBtn").css({
		"width": "100%",
		"height":pingKuan * bili(95),
		"marginTop": pingKuan * bili(5),
		"backgroundPosition": "0 " + -pingKuan * bili(538) + "px"
    });
    $(".orderAreaInp,.oASel").bind("touchstart", function () {
        $(this).focus();
    });
	
	//弹框
	$(".tk").css({
		"width": pingKuan * bili(320),
		"height": pingKuan * bili(384)
	});
	$(".tkH2").css({
		"width": pingKuan * bili(320),
		"height": pingKuan * bili(80)
	});
	$(".shareArea").css({
		"width": pingKuan * bili(182/*273*/),
		"height": pingKuan * bili(80),
		//"marginLeft": pingKuan * bili(30),
		"marginTop": pingKuan * bili(73)
	});
	$(".shareArea a").css({
		"width": pingKuan * bili(80),
		"height": pingKuan * bili(80),
		"marginRight": pingKuan * bili(11)
	});
	$(".scoreArea").css({
		"height": pingKuan * bili(304)
	});
	$(".scoreBox").css({
		"width": pingKuan * bili(248)
	});
	$(".scoreNow").css({
		"height": pingKuan * bili(84),
		"paddingTop": pingKuan * bili(14)
	});
	$(".scoreBest").css({
		"height": pingKuan * bili(90),
		"paddingTop": pingKuan * bili(2)
	});
	
	$(".scoreImg").css({
		"width": pingKuan * bili(24),
		"height": pingKuan * bili(70)
	});

    $(".saBot,.saBot a").css({
		//"width": pingKuan * bili(200),
		"height": pingKuan * bili(125)
    });

    $(".rotating").css({
        "width": pingKuan * bili(270),
        "height": pingKuan * bili(270)
    });

    $(".reStart").bind("touchstart", function () {
		//重置层级
		onFrameLayer.removeChild(game.allLayer);
		game.allLayer = new LSprite();
		onFrameLayer.addChild(game.allLayer);
		game.toPlay = true;
		game.gameEnterFn();

		$(".tk3,.b-modal").hide().css({
			"opacity":0,
			"zIndex": 1
		});
    });

    $(".yuyue").bind("touchstart", function () {
        //重置层级
        game.start();
        game.toPlay = true;
        game.orderDownFn();

        $(".tk3,.b-modal").hide().css({
            "opacity": 0,
            "zIndex": 1
        });
    });


};
window.onload=function(){

	setTimeout(function(){

		styleJs();

	},1000);

}

var firstLoad = true;

//横竖屏		
function hengshuping(){
	if(window.orientation==180||window.orientation==0){
	    setTimeout(function () {

	        if (!firstLoad) {
	            var liulanqi = window.navigator.userAgent;

	            if (liulanqi.indexOf('CPU iPhone OS 6') != -1) {
	                window.location.href = window.location.href + "?" + Math.random();
	                firstLoad = true;
	                styleJs();
	            }
	        }

	    }, 1000);
	};
	if(window.orientation==90||window.orientation==-90){
	    setTimeout(function () {

	        styleJs();
	        firstLoad = false;

	    }, 1000);
	}
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
window.addEventListener('load', hengshuping, false);

function fanhuiFn(){
	
	$(".orderBgWrap").hide().css({
		"zIndex": 1
	});
	
	game.indexFn();
	
};