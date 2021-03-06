/***业务对象***/
function component(obj,ctx){
	this.width=obj.width;
	this.height=obj.height;

	this.down=false;
	this.canDelete=false;
	this.lastTime=0;

	this.x=0;
	this.y=0;
	
	if(obj.framesAll){
		this.framesAll=obj.framesAll;
		this.frameIndex=0;
		this.frame=this.framesAll[0];
	}else if(obj.image){
		this.image=obj.image;
	}


	if(obj.minSpeed && obj.maxSpeed){
		this.speed=Math.random()*(obj.maxSpeed-obj.minSpeed)+obj.minSpeed;
	}else if(obj.speed){
		this.speed=obj.speed;
	}

	this.draw=function(ctx){
		if(obj.image){
			ctx.drawImage(this.image,this.x,this.y);
		}else if(obj.framesAll){
			ctx.drawImage(this.frame,this.x,this.y);
		}
		
	};
}
/***背景业务对象***/
var BG=function(obj,ctx){
	//obj:当前所用的数据对象-->SKY
	component.call(this,obj,ctx)	
	this.x1=0;this.y1=0;
	this.x2=0;this.y2=-this.height;
	//根据时间差，更新背景纵坐标
	this.step=function(){
		var curTime=new Date().getTime();
		if(curTime-this.lastTime>=this.speed){
			this.y1++;
			this.y2++;
			if(this.y1>=this.height){
				this.y1=-this.height;
			}
			if(this.y2>=this.height){
				this.y2=-this.height;
			}
			this.lastTime=curTime;
		}
	};
	//绘制背景
	this.draw=function(ctx){
		ctx.drawImage(this.image,this.x1,this.y1);
		ctx.drawImage(this.image,this.x2,this.y2);
	};
};

/***STARTING，左下角飞机出动***/
var Loading=function(obj,ctx){
	component.call(this,obj,ctx);
	this.y=$("#canvas").get()[0].height-this.height;
	//更新frameIndex，并将最新的图赋给frame
	this.step=function(){
		var curTime=new Date().getTime();
		if(curTime-this.lastTime>=this.speed){
			this.frame=this.framesAll[this.frameIndex];
			this.frameIndex++;
			if(this.frameIndex==this.framesAll.length){
				curState=2;
			}
			this.lastTime=curTime;
		}
	};
};

/***RUNNING,英雄机***/
var Hero=function(obj,ctx){
	component.call(this,obj,ctx);
	this.baseFrameCount=obj.baseFrameCount;
	//初始位置，底部居中
	this.x=($("#canvas").get()[0].width-this.width)/2;
	this.y=$("#canvas").get()[0].height-this.height;
	//英雄撞击后的操作
	this.bang=function(){
		this.down=true;
		this.frameIndex=this.baseFrameCount;
	};

	this.step=function(){
		var curTime=new Date().getTime();
		if(curTime-this.lastTime>=this.speed){
			if(this.down){
				//击中状态
				this.frame=this.framesAll[this.frameIndex];
				this.frameIndex++;
				if(this.frameIndex==this.framesAll.length){
					this.canDelete=true;
				}
			}else{
				//正常状态,索引为0或1
				this.frame=this.framesAll[this.frameIndex%this.baseFrameCount];
				this.frameIndex++;
			}
			this.lastTime=curTime;
		}
	};
	//发射子弹
	this.shootLastTime=0;
	this.shootInterval=300;//发射时间间隔
	this.shoot=function(){
		var curTime=new Date().getTime();
		if(curTime-this.shootLastTime>=this.shootInterval){
			bullets.push(new Bullet(BULLET,ctx));
			this.shootLastTime=curTime;
		}
	};
};

/***RUNNING,子弹***/
var Bullet=function(obj,ctx){
	component.call(this,obj,ctx);	
	this.x=hero.x+hero.width/2-this.width/2;
	this.y=hero.y-this.height/2;
	this.step=function(){
		var curTime=new Date().getTime();
		if(curTime-this.lastTime>=this.speed){
			this.y-=5;
			this.lastTime=curTime;
		}
	};
	this.outOfBounds=function(){
		return this.y<-this.height;
	};
};

/***RUNNING,敌机***/
var Enemy=function(obj,ctx){
	component.call(this,obj,ctx);
	this.type=obj.type;
	this.baseFrameCount=obj.baseFrameCount;
	this.score=obj.score;
	this.life=obj.life;
	this.x=Math.random()*($("#canvas").get()[0].width-this.width);
	this.y=-this.height;

	this.bang=function(){
		this.life--;
		if(this.life==0){
			this.down=true;//爆破状态无撞击,更新checkHit()
			this.frameIndex=this.baseFrameCount;
		}
	};

	this.step=function(){
		var curTime=new Date().getTime();
		if(curTime-this.lastTime>=this.speed){
			if(!this.down){
				//基本帧的切换
				this.frame=this.framesAll[this.frameIndex%this.baseFrameCount];
				this.frameIndex++;
				//让飞机向下移动
				this.y++;
			}else{
				this.frame=this.framesAll[this.frameIndex];
				this.frameIndex++;
				if(this.frameIndex==this.framesAll.length){
					this.canDelete=true;
					SCORE+=this.score;
				}
			}
			this.lastTime=curTime;
		}
	};
	
	this.outOfBounds=function(){
		return this.y>$("#canvas").get()[0].height;
	};

	this.hit=function(component){
		//撞击规则,true为撞击
		var c=component;
		return c.x+c.width/2>this.x-c.width/2
			&&c.x+c.width/2<this.x+this.width+c.width/2
			&&c.y+c.height/2>this.y-c.height/2
			&&c.y+c.height/2<this.y+this.height+c.height/2;
	};
};
