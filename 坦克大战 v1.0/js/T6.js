/*
 * 这里面严格区分大小写，符号一律用英文，语句结束用分号。
 */
var can    	= document.createElement("canvas");	//定义画布
var g 	   	= can.getContext("2d");	//定义画笔
can.width  	= 1200;		//定义画布宽度
can.height 	= 650;		//定义画布高度

var wallcount		= 20;		//墙的数量
var wallsize		= 30;		//墙的尺寸
var enemycount		= 14;		//敌军数量
var tanksize		= 50;		//坦克或飞机的尺寸
var bdtime			= 5;		//冰冻时间长度                变量     可能会改变
var jdtimer			= null;		//解冻定时器
var jianmie			= 0;		//歼灭敌人计数
var fuhuo			= 3;		//复活机会次数
var zhuangtai		= "未开始";	//游戏状态
var bianhaoqi		= 0;		//编号计数器
var overy			= can.height;		//结束语高度
var djs				= 9;		//倒计时
var fhtimer			= null;		//复活定时器

var DR = "敌人";
var WO = "我军";
var JD = "基地";			//常量    不改变
var ZD = "子弹";
var ZB = "装备";
var TP = "图片";
var DL = "地雷";
var Q  = "墙";

var qs	 = [];
var kill = [12,16,21,27,35];		//子弹伤害
var fy   = [1,3,5,7,9];			//防御值
var zt   = ["未开始","激战中","冰冻","被冰冻","待复活","失败","胜利"];		//状态

var st 	 = new Stage();

var logo = new Base( 425, 210, 350, 350, TP, "img/logo.png", 0, 0, 0 );
var jd	 = new Base( 570, 580, 60, 70, JD, "img/jd.png", 0, 3, 0 );
var me 	 = new Tank(420, 520,"img/tU.png");

var bomb2 = new Audio();
bomb2.src = "sounds/bomb2.wav";

onload = function () {
	document.getElementById("mydiv").appendChild(can);
	begin();		//调用begin函数
}

function begin() {
	
	var list = st.list;
	
	st.add(jd);
	
	st.add(logo);
	
	st.add(me);
	
	huaqiang();
	
	huadiren();
	
	huahome();
	

	
	function hua(){
		g.fillStyle = "#333";		//指定画笔的颜色
		g.fillRect(0,0,can.width,can.height);	//填充画布颜色
		
		huaxinxi();
		huazuozhe();
		huakaishi();
		huashengli();
		huashijian();
		huaover();
		huadjs();
		huashuoming();
		
		list.forEach(function(o){  o.show(); });
		
		requestAnimationFrame(hua);		//间隔一段时间去执行一下hua函数
	}
	
	hua();		//调用“hua”这个函数
}

function huadiren(){
	var x = (can.width-enemycount*(tanksize+7)) / 2,y = 80;			//利用表达式   使内容居中
	for (var i = 0;i<enemycount;i++){
		var f = new FJ(x,y,"img/FD.PNG");
		st.add(f);  x += tanksize + 7;		//每次循环显示一个墙的尺寸
			
		
	}
}

function huaqiang(){
	var x = (can.width-wallcount*wallsize) / 2,y = 140;			//利用表达式   使内容居中    中间墙
	for (var i = 0;i<wallcount;i++){
		var w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
		st.add(w);  x += wallsize;		//每次循环显示一个墙的尺寸

	}
	
	var x = 20,y = 240;			
	for (var i = 0;i<10;i++){				//左墙
		var w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
		st.add(w);  x += wallsize;		//每次循环显示一个墙的尺寸

	}
	
	var x = 880,y = 240;			
	for (var i = 0;i<10;i++){				//右墙
		var w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
		st.add(w);  x += wallsize;		//每次循环显示一个墙的尺寸

	}
	
	var x = 20,y = 440;			
	for (var i = 0;i<10;i++){				//右墙
		var w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
		st.add(w);  x += wallsize;		//每次循环显示一个墙的尺寸

	}
	var x = 880,y = 440;			
	for (var i = 0;i<10;i++){				//右墙
		var w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,1,0);
		st.add(w);  x += wallsize;		//每次循环显示一个墙的尺寸

	}

}

function huahome(){				/***1-4***/
	var x = jd.x - wallsize ,y = jd.y - 5 - wallsize;
	
	var w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,2,0);
	st.add(w);	x += wallsize;	qs.push(w);
	
	w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,2,0);
	st.add(w);	x += wallsize;	qs.push(w);
	
	w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,2,0);
	st.add(w);	x += wallsize;	qs.push(w);
	
	w = new Base(x,y,wallsize,wallsize,Q,"img/qiang.gif",0,2,0);
	st.add(w);	x += wallsize;	qs.push(w);
	
	
	x = jd.x - wallsize;	y += wallsize;			/****5-6****/
	w = new Base(x,y,wallsize,wallsize+5,Q,"img/qiang.gif",0,2,0);
	st.add(w);	x += wallsize * 3;	qs.push(w);
	
	w = new Base(x,y,wallsize,wallsize+5,Q,"img/qiang.gif",0,2,0);
	st.add(w);	x += wallsize * 3;	qs.push(w);
	
	x = jd.x - wallsize;	y += wallsize + 10;		/****7-8****/
	w = new Base(x,y,wallsize,wallsize+5,Q,"img/qiang.gif",0,2,0);
	st.add(w);	x += wallsize * 3;	qs.push(w);
	
	w = new Base(x,y,wallsize,wallsize+5,Q,"img/qiang.gif",0,2,0);
	st.add(w);	x += wallsize * 3;	qs.push(w);
		
}

function huashuoming(){
	if (zhuangtai != zt[0]) return;
	var x = 20,y = 350;
	g.fillStyle  = "#f40";
	g.font		 = "18px 楷体";
	g.fillText("欢迎大家来到我的游戏~",		x,y); y+=20;	
	g.fillText("第一次设计，请多担待~",		x,y); y+=20;
	g.fillText("按'R'键复活~",		 		x,y); y+=20;
	g.fillText("按'M'键开启背景音乐~",		x,y); y+=20;
}

function huaxinxi(){
	var x = 50,y = 20;
	g.fillStyle = "#fff";
	g.font = "12px 宋体";
	g.fillText("敌军数量："+ enemycount,		x,y); x+=120;
	g.fillText("歼灭数量："+ jianmie,		 	x,y); x+=120;
	g.fillText("我的HP："+ me.hp,		 		x,y); x+=120;
	g.fillText("复活次数："+ fuhuo,		 		x,y); x+=120;
	g.fillText("攻击："+ me.gong,			 	x,y); x+=100;
	g.fillText("防御："+ me.fang,		 	 	x,y); x+=100;
	g.fillText("移动速度："+ me.speed,		 	x,y); x+=120;
	g.fillText("可用地雷："+ me.dilei,		 	x,y); x+=120;
	g.fillText("游戏状态："+ zhuangtai,		 	x,y); x+=120;
	g.fillText("坐标："+ me.x + "," + me.y,	x,y); x+=120;
	
}

function huazuozhe(){
	var x = 20,y = 590;
	g.fillStyle = "cyan";
	g.font = "13px 楷体";
	g.fillText("作者：小白学习机",		 		x,y);y+=20;
	g.fillText("Q Q ：2513145024",		x,y);y+=20;
	g.fillText("V 信：tj2513145024",		x,y);y+=20;
}


function huakaishi(){
	if (zhuangtai != zt[0]) return;
	var x =(can.width - 50*8) / 2 ,y = 230;
	g.fillStyle = "red";
	g.font = "50px 楷体";
	g.fillText("请按'Y'键开始游戏",		 	x,y);
	
}

function huaover(){
	if (zhuangtai != zt[5] ) return;
	var x =(can.width - 450) / 2 ;
	g.fillStyle = "red";
	g.font = "100px consolas";
	g.fillText( "Game over",  x,overy );
}

function huadjs(){
	if (zhuangtai != zt[4] ) return;
	var x =(can.width - 170) / 2 ,y = 450;
	g.fillStyle = "green";
	g.font = "300px consolas";
	g.fillText( djs,  x,y );
}


function huashijian(){
	if (zhuangtai != zt[2] && zhuangtai != zt[3] ) return;
	var x =(can.width - 50) / 2 ,y = 500;
	g.fillStyle = "mediumslateblue";
	g.font = "90px 黑体";
	g.fillText( bdtime,  x,y );
}

function huashengli(){
	if (zhuangtai != zt[6]) return;
	var x =(can.width - 70*9) / 2 ,y = 300;
	g.fillStyle = "darkcyan";
	g.font = "70px 楷体";
	g.fillText("恭喜你！！ 你赢了！！",		 	x,y);
}

function Stage() {
	this.list = [];	
}

Stage.prototype.add = function(o){
	this.list.push(o);			//把o放入list
}

Stage.prototype.del = function(o){
	var i = this.list.indexOf(o);		//查找
	if(i != -1){
		this.list.splice(i,1);			//删除
	}
}

			//     设计一个物体构造工厂函数
function Base(x,y,w,h,type,src,gong,fang,speed) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.type   = type;
	this.src  	= src;
	this.gong 	= gong;
	this.fang 	= fang;
	this.speed  = speed;	
	this.index  = bianhaoqi ++;	//每个物体在构造时分配一个唯一的编号
	this.hp 	= 100;
	
			//		显示自己的行为
	this.show = function(){
		if(this.hp <= 0) return;  
		var img = new Image();	//在内存中创建一个图片对象
		img.src = this.src;
		g.drawImage(img, this.x, this.y, this.w,this.h);
		this.blood();
	}
	
	this.blood = function(){
		if (this.type == TP || this.type == ZD || this.type == ZB || this.type == DL ) return;
		var w = this.hp / 100.0 * this.w;						//注意：语法中必须有小数  整数除整数 只得到整数 所以需要用100.0.    血量条长度随血量改变显示
		g.fillStyle = "springgreen";							//
		if( this.hp < 45)			g.fillStyle = "red";		//生命值为45以下     显示红色
		else if (this.hp < 65)		g.fillStyle = "orangered";	//生命值为65以下     显示深橙色
		else if (this.hp < 85)		g.fillStyle = "orange";		//生命值为85以下     显示橙色
		g.fillRect(this.x,this.y - 5, w, 5);					//y-5：血条自身有5个高度，需要向上走5个高度
	}
	
	this.die = function(){
		this.hp = 0;
		st.del(this);
		if ( this.type == WO || this.type == DR ){
			boom(this); clearInterval(this.movetimer);
		}
		if (this.type == WO && fuhuo >0){
			zhuangtai = zt[4];
			var s = new Audio(); s.src = "sounds/die.wav";s.play();
			daojishi();
		} else if (this.type == WO && fuhuo == 0){
			zhuangtai = zt[5];
		}	var s = new Audio(); s.src = "sounds/die.wav";s.play();
		if ( this.type == DR ) {
		clearInterval(this.changtimer);
		jianmie++; 
			if ( jianmie == enemycount ){
				zhuangtai = zt[6];
				var s = new Audio(); s.src = "sounds/hitcmd.wav";	s.play();
			}
		};
	 
		if ( this.type == JD ){
			fuhuo = 0;  me.die();
			var overtimer = setInterval( function(){
				overy -= 5 ;
				if (overy <= 280 ){
					clearInterval(overtimer);
				}
			}, 30 );		
		}
	}
}


function daojishi(){
	fhtimer = setInterval( function(){
		djs --;
		if ( djs <0 ){
			fuhuo = 0; clearInterval(fhtimer); zhuangtai = zt [5];
			jd.die();
		}
	}, 1200 );
}
			//     设计一个飞机构造工厂函数
function FJ(x, y, src) {
	var o 		= new Base(x, y, tanksize, tanksize, DR, src, 0, 0, 3);
	o.left  	= false;
	o.right 	= false;
	o.up 		= false;
	o.down 		= false;
	
	o.move = function() {
		if (zhuangtai != zt[1] && zhuangtai != zt[3] && zhuangtai != zt[4] && zhuangtai != zt[5] ) return;
		var ox = o.x,	oy = o.y;
		if (o.left){ 		  o.src = "img/FL.png";
			o.x -= o.speed;
		}else if (o.right) {  o.src = "img/FR.png";
			o.x += o.speed;
		}else if (o.up) {	  o.src = "img/FU.png";
			o.y -= o.speed;
		}else if (o.down) {	  o.src = "img/FD.png";
			o.y += o.speed;
		}
		if (o.x < 0 || o.y <0 || o.x > can.width - o.w || o.y > can.height - o.h) {
			o.x = ox;	o.y = oy;		//超出屏幕，回到旧坐标
		}
		if ( checkmove(o) ){
			o.x = ox;	o.y = oy;		//发生碰撞，回到旧坐标
		}
	}
	o.movetimer  = setInterval(function(){o.move();} , 20);
	o.changtimer = setInterval( function(){
		if (zhuangtai != zt[1] && zhuangtai != zt[3] && zhuangtai != zt[4] && zhuangtai != zt[5] ) return;
		var n = parseInt(Math.random()*100);
		if ( n % 29 == 0) {
			var i = parseInt(Math.random()*4);
			o.left 	= i == 0;
			o.right = i == 1;
			o.up 	= i == 2;
			o.down 	= i == 3;			
		}
		if ( n % 19 == 0 ) {
			fire(o);
		}
	}, 30);
	
	return o;
}

function boom(t) {				//当前被炸毁的对象
	var i  = 1;
	var o  = new Base( t.x, t.y, 10, 10,TP, "img/1.gif", 0, 0, 0);
	st.add(o);
	var tm = setInterval(function(){
		i++;
		if ( i == 6 ){
			o.die(); clearInterval(tm); 
			xianshidaoju(o);
			return;
		}
		o.w += 7 ;o.h += 7; o.src = "img/" + i + ".gif";
		
	}, 50);
}

function xianshidaoju(o){
	var n = parseInt(Math.random() * 10);	//随即产生一个0-9的数字
//	n = 1;
	var p = new Base(o.x, o.y, 38, 38, ZB, "img/x" + n + ".gif", 0, 0, 0);
	p.n = n;
	st.add(p);
}

function Zidan( t ){
	var fx = "D";
	var x = t.x + 18, y = t.y + 40;
	var w = 16 , h = 28;
	if ( t.src.indexOf("U") != -1 ){
		fx = "U";	x =t.x + 16; y= t.y - 22;
	} else if ( t.src.indexOf("L") != -1 ){
		fx = "L";	w = 25 ; h = 16;	x = t.x - 15; y = t.y + 18;
	} else if ( t.src.indexOf("R") != -1 ){
		fx = "R";	w = 25 ; h = 16;	x = t.x + 40; y = t.y + 17;
	}
//	console.log(t.src);
	var o 	= new Base(x, y, w, h, ZD, "img/"+ t.gong + fx + ".png", kill[t.gong], 0, 13);
	o.left 	= fx =="L";
	o.right = fx =="R";
	o.up 	= fx =="U";
	o.down 	= fx =="D";
	o.tank  = t;
	
	o.move = function() {
		var ox = o.x,	oy = o.y;
		if (o.left){
			o.x -= o.speed;
		}else if (o.right) {
			o.x += o.speed;
		}else if (o.up) {
			o.y -= o.speed;
		}else if (o.down) {
			o.y += o.speed;
		}
		if (o.x < 0 || o.y <0 || o.x > can.width - o.w || o.y > can.height - o.h) {
			o.die();	clearInterval(o.movetimer);return;
		}
		if ( checkmove(o) ){
			o.x = ox;	o.y = oy;		//发生碰撞，回到旧坐标
			o.die();	clearInterval(o.movetimer);return;
		}
	}
	o.movetimer = setInterval(function(){o.move();} , 20);
	return o;
}

			//     设计一个坦克构造工厂函数
function Tank(x, y, src) {
	var o 	= new Base(x, y, tanksize, tanksize, WO, src, 0, 0, 3);
	o.left 	= false;
	o.right = false;
	o.up 	= false;
	o.down 	= false;
	o.dilei = 2;
	
	o.move = function() {
		var ox = o.x,	oy = o.y;
		if (o.left){
			o.x -= o.speed;
		}else if (o.right) {
			o.x += o.speed;
		}else if (o.up) {
			o.y -= o.speed;
		}else if (o.down) {
			o.y += o.speed;
		}
		if (o.x < 0 || o.y <0 || o.x > can.width - o.w || o.y > can.height - o.h) {
			o.x = ox;	o.y = oy;		//超出屏幕，回到旧坐标
		}
		if ( checkmove(o) ){
			o.x = ox;	o.y = oy;		//发生碰撞，回到旧坐标
		}
	}
	o.movetimer = setInterval(function(){o.move();} , 20);
	return o;
}

function checkmove(o){
	var list = st.list;
	for (var i = 0;i < list.length;i++){
		if ( o.index == list[i].index )					continue;
		if ( o.type == WO && list[i].type == DL )		continue;
		if ( o.type == WO && list[i].type == DR )		continue;
		if ( o.type == DR && list[i].type == WO )		continue;
		if ( o.type == ZD && list[i].type == ZB )		continue;
		if ( o.type == DR && list[i].type == DR )		continue;
		if ( o.type == ZD && o.tank.type  == list[i].type ) continue;
		if ( o.type == ZD && list[i].type == DL)		continue;	
		if ( list[i].type == ZD )						continue;
		if ( list[i].type == TP )						continue;
		if (hit( o , list[i] ) ){			//表示与墙或基地发生了碰撞
			if (o.type == ZD ){
				shanghai (o, list[i] );
			} else {
				chi (o, list[i]);
			}
			return true;
		}
	}
	return false;
}

function chi ( o, k ){
	if ( o.hp <= 0 ) return;
	if ( k.type != ZB && k.type != DL ) return;
	k.die();
	var s = new Audio();		//音频对象
	if ( o.type == WO ){
		wochi( o,k );
		if ( k.n ==0 || k.n ==3 || k.n == 4 || k.n == 5 || k.n == 6 || k.n == 7 || k.n == 8 || k.n == 9){
			s.src = "sounds/prop.wav";
		} else if ( k.n == 1 || k.n == 2)	s.src = "sounds/daxiao.wav";
		else if ( k.n ==7 ) 	s.src = "sounds/zeg.wav";
	} else {
		direnchi ( o, k );
	}
	
	s.play();
}

function wochi ( o ,k ){
	if ( k.n == 0 ){
		tisu(o);
	} else if ( k.n == 1 ){
		fuhuo ++;	fuhuo = fuhuo > 5 ? 5 : fuhuo;
	} else if ( k.n == 2 ){
		if ( zhuangtai != zt[2] && zhuangtai != zt[6] ){
			zhuangtai = zt[2];
			jdtimer = setInterval( function(){
				bdtime --;
				if (bdtime < 0 ){
					bdtime = 5; clearInterval(jdtimer);
					if (zhuangtai != zt[4] && zhuangtai != zt[5] &&zhuangtai != zt[6]){
						zhuangtai = zt[1];
					}
				}
			}, 1000);
		}
	} else if ( k.n == 3 ){
		shenggong(o);
	} else if ( k.n == 4 ){
		shengfang(o);
	} else if ( k.n == 5 ){
		homejiaxue(30);
	} else if ( k.n == 6 ){
		jiaxue(o);
	} else if ( k.n == 7 ){
		shixue(o);
	} else if ( k.n == 8 ){
		jd.hp += 30;	jd.hp = jd.hp >100 ? 100 :jd.hp;
	} else if ( k.n == 9 ){
		me.dilei += 2;	me.dilei = me.dilei >10 ? 10 : me.dilei;
	}
}
function homejiaxue (n){
	for ( var i = 0; i < qs.length; i++ ){
		if ( n>0 ){
			if ( qs[i].hp <= 0 ) st.add(qs[i]);
		} else {
			if ( qs[i].hp <= 0 ) continue;
		}
		qs[i].hp += n;
		qs[i].hp = qs[i].hp > 100 ? 100 : qs[i].hp;
		if ( qs[i].hp <= 0 ) qs[i].die();
	}
}

function shixue (o){
	o.hp -= 93;
	if (o.hp <= 0 ){
		o.die();
	}
}

function jiaxue (o){
	o.hp += 30;	o.hp = o.hp > 100 ? 100 : o.hp;
}

function shengfang (o){
	o.fang ++;	o.fang = o.fang >4 ? 4 :o.fang;
}

function shenggong (o){
	o.gong ++;	o.gong = o.gong > 4 ? 4 :o.gong;
}
function tisu (o){
	o.speed += 1;	o.speed = o.speed >7 ? 7 : o.speed;
}

function build(n){
	if ( enemycount > 25 ) return;
	for (var i  =0 ; i < n; i ++ ){
		var x   = parseInt(Math.random() * (can.width - 200)) + 100;
		var y   = parseInt(Math.random() * (can.height - 200)) + 100;
		var o   = new FJ(x, y, "img/FD.png");
		while ( checkmove(o)){
			o.x = parseInt(Math.random()  * (can.width - 200)) + 100;
			o.y	=  parseInt(Math.random() * (can.height - 200)) + 100;
		}
		
		st.add( o ); enemycount ++;
	}
}

function direnchi( o , k ){
	if ( k.n == 0 ){
		tisu(o);
	} else if ( k.n == 1 ){
		build(3);
	} else if ( k.n == 2 ){
		if ( zhuangtai != zt[3] && zhuangtai != zt[5] && zhuangtai != zt[4] ){
			zhuangtai = zt[3];
			jdtimer = setInterval( function(){
				bdtime --;
				if (bdtime < 0 ){
					bdtime = 5; clearInterval(jdtimer);
					if (zhuangtai != zt[4] && zhuangtai != zt[5] &&zhuangtai != zt[6]){
						zhuangtai = zt[1];
					}
				}
			}, 1000);
		}
	} else if ( k.n == 3 ){
		shenggong(o);
	} else if ( k.n == 4 ){
		shengfang(o);
	} else if ( k.n == 5 ){
		homejiaxue(-30);
	} else if ( k.n == 6 ){
		jiaxue(o);
	} else if ( k.n == 7 ){
		shixue(o);
	} else if ( k.n == 8 ){
		build(2);
	} else if ( k.n == 9 ){
		build(2);
	} else if ( k.n == 10){
		shixue(o);    //踩地雷
		var s = new Audio(); 	s.src = "sounds/bomb2.wav"; s.play();
	}
}



function shanghai(o,k){
	k.hp -= o.gong;				//减攻
	k.hp += fy[k.fang];			//加放
	if ( k.hp <= 0 ){
		k.die();
		if (k.type == DR ) {
			bomb2.play();
		}
	} else if ( k.type == JD){
		var s = new Audio();
		s.src = "sounds/hitcmd.wav";	s.play();
	}
}

function hit(o1,o2){
	if ( o1.x < o2.x )
	{
		if ( o2.x - o1.x <= o1.w ){
			if ( o1.y < o2.y ){
				return o2.y - o1.y <= o1.w;
			} else if ( o1.y > o2.y ){
				return o1.y - o2.y <= o2.w;
			} else 
				return o1.y == o2.y;
		}
	} else if ( o1.x > o2.x )
	{
		if ( o1.x - o2.x <= o2.w ){
			if ( o1.y < o2.y ){
				return o2.y - o1.y <= o1.w;
			} else if ( o1.y > o2.y ){
				return o1.y - o2.y <= o2.w;
			} else 
				return o1.y == o2.y;
		}
	} else {
		if ( o1.y < o2.y ){
			return o2.y - o1.y <= o1.w;
		} else if ( o1.y > o2.y ){
			return o1.y - o2.y <= o2.w;
		} else 
			return o1.y == o2.y;
	}
 	return false;
}

//-----------按键事件处理---------
onkeydown = function(e){
	var c = e.keyCode;
	console.log("c="+c);
	if ( c == 89 && zhuangtai == zt[0]){
		zhuangtai  = zt[1];
		var kaishi = new Audio();
		kaishi.src = "sounds/kaishi.mp3";
		kaishi.play();
				
		var kaipao = new Audio();
		kaipao.src = "sounds/kaipao.wav";
		kaipao.play();			
		logo.die();
	} else if ( c == 77 && zhuangtai == zt[1]){
		var bgm = new Audio();
		bgm.src = "sounds/bgm.wav";
		bgm.play();
	}
	if (zhuangtai == zt[0] || zhuangtai == zt[3] || zhuangtai == zt[4] || zhuangtai == zt[5] ) return;
	if (c == 37 || c == 65 ){
		me.left = true;		me.right = false; me.down = false; me.up = false;
		me.src  = "img/tL.png";
	} else if (c == 38 || c == 87 ){
		me.left = false;	me.right = false; me.down = false; me.up = true;
		me.src  = "img/tU.png";
	} else if (c == 39 || c == 68 ){
		me.left = false;	me.right = true; me.down  = false; me.up = false;
		me.src  = "img/tR.png";
	} else if (c == 40 || c == 83 ){
		me.left = false;	me.right = false; me.down = true; me.up  = false;
		me.src  = "img/tD.png";
	}	
}

function fire(t){
	var m = new Zidan(t);
	st.add(m);
}
//-----------松开键触发事件---------
onkeyup = function (e){
	var c  = e.keyCode;
	if ( c == 37 || c == 65 )			me.left  = false;
	else if ( c == 38 || c == 87 )		me.up 	 = false;
	else if ( c == 39 || c == 68 )		me.right = false;
	else if ( c == 40 || c == 83 )		me.down  = false;
	if ( c == 82 && zhuangtai == zt[4]){
		huoguolai();
	}
	if ( zhuangtai != zt[1] && zhuangtai != zt[2] ) return;
	if ( c==88 ){
		fire(me);
	}
	if ( c== 32 ){
		mailei();
	}
}

function mailei(){
	if ( me.dilei <1 ) return;
	me.dilei--;
	var o = new Base(me.x, me.y, 40, 40, DL, "img/x10.gif", 0, 0 ,0);
	o.n = 10;
	st.add(o);
	var s = new Audio(); s.src = "sounds/bready.wav"; s.play();
	
}

function huoguolai(){
	me.hp = 100;	me.speed = 3;	me.gong = 0;	me.fang = 0;	me.dilei = 2;
	fuhuo --;		zhuangtai = zt[1];
	me.movetimer  = setInterval(function(){me.move();} , 20);
	clearInterval(fhtimer);		djs = 9;
	st.add(me);
}
