//index.js
var nav = require('../../utils/nav.js'); //获取导航的实例
var foodData = require('../../utils/food_data.js'); //获取食物的信息

Page({
  data: {
    nav:nav.NavF(),
    m_Cont:foodData.foodData
  },
  onLoad: function () {
    this.Nav_Init();
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
      title: "美食 - Musical美食",
      path: '/pages/food/food'
    }
  }
})
