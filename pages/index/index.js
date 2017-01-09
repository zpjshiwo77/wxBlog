//index.js
var fps = 0;//手指触碰屏幕的位置
var top = "36rpx";
var nav = [{
        url:"../comesoon/comesoon",
        color:"rgb(235, 110, 98)"
    },
    {
        url:"",
        color:"#eee"
    },
    {
        url:"",
        color:"#eee"
    },
    {
        url:"",
        color:"#eee"
    },
    {
        url:"",
        color:"#eee"
    },
    {
        url:"",
        color:"#eee"
    },
    {
        url:"",
        color:"#eee"
    }];
var navActive = [{
        url:"../comesoon/comesoon",
        color:"rgb(235, 110, 98)",
        top:"36rpx"
    },
    {
        url:"../comesoon/comesoon",
        top:"106rpx",
        color:"rgb(249, 163, 108)"
    },
    {
        url:"../comesoon/comesoon",
        top:"216rpx",
        color:"rgb(245, 173, 85)"
    },
    {
        url:"../comesoon/comesoon",
        top:"296rpx",
        color:"rgb(50, 184, 176)"
    },
    {
        url:"../music/music",
        top:"386rpx",
        color:"rgb(130, 148, 160)"
    },
    {
        url:"../comesoon/comesoon",
        top:"486rpx",
        color:"rgb(129, 210, 238)"
    },
    {
        url:"../food/food",
        top:"576rpx",
        color:"rgb(193, 153, 209)"
    }];
var active = 0;

Page({
  data: {
    nav:nav,
    top:top,
  },
  onLoad: function () {
    console.log(top,nav);
  },
  moveP: function(e){
      if(e.changedTouches[0].clientY - fps > 10){
          this.moveDown();
      }
      else if(e.changedTouches[0].clientY - fps < -10){
          this.moveUp();
      }
  },
  moveUp: function(){
      if(active < 6){
          active++;
      }
      else{
          active = 0;
      }
      this.showNow();
  },
  moveDown: function(){
      if(active > 0){
          active--;
      }
      else{
          active = 6;
      }
      this.showNow();
  },
  showNow: function(){
      for(var i = 0;i < 7;i++){
          nav[i].url = "";
          nav[i].color = "#eee";
      }
      nav[active].url = navActive[active].url;
      nav[active].color = navActive[active].color;
      top = navActive[active].top;
      this.setData({
        top:top,
        nav:nav
      });
  },
  recordP: function(e){
      fps = e.changedTouches[0].clientY;
  }
})