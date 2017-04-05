//index.js
var nav = require('../../utils/nav.js'); //获取导航的实例
var foodData = require('../../utils/foodDetail_data.js'); //获食物详细信息的实例
var food,fid;

Page({
  data: {
    nav:nav.NavF(),
  },
  onLoad: function (options) {
    this.Nav_Init();
    food = this.requestData(options.id);
    this.page_Init(food);
  },
  page_Init: function(data){
    this.setData({
      food:data
    });
  },
  requestData: function(id){
    var data = foodData.foodData;
    var myfood;
    fid = id;

    for(var i = 0;i < data.length;i++){
      if(id == data[i].id){
        myfood = data[i];
      }
    }

    return myfood;
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
  }
})