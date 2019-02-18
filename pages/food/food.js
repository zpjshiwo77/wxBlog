//index.js
var nav = require('../../utils/nav.js'); //获取导航的实例
var page = 1;
var foodlist = [];
var requestFlag = true;
var likeFlag = true;
var NowShare = '/pages/food/food';
Page({
  data: {
    nav:nav.NavF(),
    m_Cont:foodlist
  },
  onLoad: function () {
    this.Nav_Init();
    this.GetFoodList();
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
      path: NowShare
    }
  },
  GetFoodList: function(data){
    var that = this;
    var data = {
      method:"GetFoodList",
      page:page
    };
    this.requsetFunc(data,function(res){
      requestFlag = true;
      page++;
      var list = res.data.result.foods;
      foodlist.push.apply(foodlist,list);

      for (var i = 0; i < foodlist.length; i++) {
        foodlist[i].likeFlag = false;
      }
      that.setData({
        m_Cont:foodlist
      });
    });
  },
  likeThisFood: function(event){
    var that = this;
    var id =  event.currentTarget.dataset.id;   
    var data = {
      method:"addAHite",
      id:id
    };
    for(var i = 0;i < foodlist.length;i++){
      if(foodlist[i].id == id) {
        if(foodlist[i].likeFlag){
          wx.showModal({
            title: '感谢您的支持',
            content: '您已经点过赞了',
          });
        }
        else{
          this.requsetFunc(data,function(res){
            likeFlag = false;
          });
          foodlist[i].like++;
          that.setData({
            m_Cont:foodlist
          });
          foodlist[i].likeFlag = true;
        }
      }
    }
  },
  // setNowId: function(event){
  //   var id =  event.currentTarget.dataset.id;
  //   NowShare = '/pages/food_detail/food_detail?id=' + id;
  // },
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
            callback(res);
          }
        },
        fail: function(){
          requestFlag = true;
          console.log("fail");
        }
      });
    }
  },
  shareThisFood: function(){

  },
  clickCollection: function(){
    wx.showModal({
      title: '点击右上角“添加到我的小程序”',
      content: '收藏能更快找到该小程序'
    });
  },
  onShareAppMessage: function (event) { 
    var id =  event.target.dataset.id; 
    return {
      title: 'Music美食',
      path: '/pages/food_detail/food_detail?id='+id,
      imageUrl: '/images/share.jpg'
    }
  }//用户点击右上角分享
})
