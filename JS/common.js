
//创建背景图像
function createImg(src){
	var img=new Image();
	img.src=src;
	return img;
}
//START状态下，logo图标
function showLogo(ctx){
	ctx.drawImage(logo,($("#canvas").get()[0].width-logo.width)/2,($("#canvas").get()[0].height-logo.height)/2);
}
//RUNNING状态下，显示得分和生命值
function drawText(ctx){
	ctx.font="bold 24px Verdana";
	ctx.textAlign="left";
	ctx.textBaseline="hanging";
	ctx.fillText("SCORE:"+SCORE,20,30);
	ctx.fillText("LIFE:"+LIFE,350,30);
}
//PAUSE状态下，暂停图标
function showPause(ctx){
	ctx.drawImage(pause,($("#canvas").get()[0].width-pause.width)/2,($("#canvas").get()[0].height-pause.height)/2);
}
//RUNNING状态下，创建敌机
function componentEnter(){
	var curTime=new Date().getTime();
	if(curTime-lastTime>=interval){
		//console.log("敌机数量："+enemies.length);
		var num=Math.floor(Math.random()*10);
		if(num<=7){
			//创建小飞机，添加到enemies数组中
			enemies.push(new Enemy(ENEMYMIN,ctx));
		}else if(num==8){
			//中飞机
			enemies.push(new Enemy(ENEMYMID,ctx));
		}else if(num==9){
			//大飞机
			if(enemies[0]==null || enemies[0].type!=3){
				enemies.splice(0,0,new Enemy(ENEMYMAX,ctx));
			}
		}
		lastTime=curTime;
	}
}
//RUNNING状态下，移动
function componentStep(){
	if(enemies.length!=0){
		for(var i=0;i<enemies.length;i++){
			enemies[i].step();
		}
	}
	for(var j=0;j<bullets.length;j++){
		bullets[j].step();
	}
}
//RUNNING状态下，绘制
function componentDraw(ctx){
	for(var i=0;i<enemies.length;i++){
		enemies[i].draw(ctx);
	}
	for(var j=0;j<bullets.length;j++){
		bullets[j].draw(ctx);
	}
}

//RUNNING,删除组件
function componentDelete(){
	//超出下边界、碰撞、life=0
	for(var i=0;i<enemies.length;i++){
		if(enemies[i].outOfBounds()||enemies[i].canDelete){
			enemies.splice(i,1);
		}
	}
	//子弹
	for(var j=0;j<bullets.length;j++){
		if(bullets[j].outOfBounds()||bullets[j].canDelete){
			bullets.splice(j,1);
		}
	}
	//英雄机
	if(hero.canDelete){
		LIFE--;
		if(LIFE==0){
			curState=4;//game over
		}else{
			hero=new Hero(HERO,ctx);
		}
	}
}

//RUNNING,检查各个组件是否与敌机相撞成功
function checkHit(){
	for(var i=0;i<enemies.length;i++){
		//判断enemies[i]是否处于爆破状态
		if(enemies[i].down||enemies[i].canDelete){
			continue;
		}
		if(enemies[i].hit(hero)){
			enemies[i].bang();
			hero.bang();
		}
		for(var j=0;j<bullets.length;j++){
			//判断bullets[i]是否处于爆破状态
			if(enemies[i].hit(bullets[j])){
				enemies[i].bang();
				bullets[j].canDelete=true;
			}
		}
	}
}

//GAMEOVER
function drawOver(ctx){
	ctx.font="bold 48px Verdana";
	ctx.textAlign="center";
	//var w=ctx.measureText("GAME OVER");
	//var x=($("canvas").width-w)/2;
	//var y=($("canvas").height-48)/2;
	ctx.fillText("GAME OVER",250,250);
}

