//index.js
var nav = require('../../utils/nav.js'); //获取导航的实例
var foodData = require('../../utils/foodDetail_data.js'); //获食物详细信息的实例
var food,fid;
var requestFlag = true;
Page({
  data: {
    nav:nav.NavF(),
  },
  onLoad: function (options) {
    this.Nav_Init();
    this.requestData(options.id);
    fid = options.id;
  },
  page_Init: function(data){
    var stepImg = [];
    for (var i = 0; i < data.step.length; i++) {
      stepImg.push(data.step[i].img);
    }
    this.setData({
      food:data,
      stepImg:stepImg
    });
  },
  backToIndex: function(){
    wx.redirectTo({
      url: '../food/food'
    });
  },
  previewImg: function(event){
    var img = event.currentTarget.dataset.img;
    var imgs = this.data.stepImg;
    wx.previewImage({
      current:img,
      urls:imgs
    })
  },
  requestData: function(id){
    var that = this;
    var data = {
      method:"GetFoodDetail",
      id:id
    };
    that.requsetFunc(data,function(res){
      food = that.dealData(res.data.result);
      that.page_Init(food);
    });
  },
  dealData: function(data){
    var step = data.step;
    for(var i = 0;i < step.length;i++){
      var item = step[i].cont;
      item = item.split(";");
      item.pop();
      step[i].cont = item;
    }
    return data;
  },
  Nav_Init: function(){
    var thisNav = nav.NavF();
    thisNav.color = "rgb(193, 153, 209)";
    thisNav.navCont[0].border = "5rpx solid #333";
    thisNav.navCont[0].url = "";
    this.setData({
      nav:thisNav
    });
  },
  onShareAppMessage: function () {
    return {
      title: food.name + " - Musical美食",
      path: '/pages/food_detail/food_detail?id='+fid
    }
  },
  requsetFunc: function(data,callback){
    var that = this;
    if(requestFlag){ 
      requestFlag = false;
      wx.request({
        url: 'https://www.seventh77.com/modal/food/food.php',
        method: 'GET',
        data: data,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        success: function(res) {
          if(res.data.errorCode == 0){
            requestFlag = true;
            callback(res);
          }
        },
        fail: function(){
          requestFlag = true;
          console.log("fail");
        }
      });
    }
  }
})