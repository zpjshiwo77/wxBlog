//index.js
var nav = require('../../utils/nav.js'); //获取导航的实例
var songsData = require('../../utils/songs_data.js'); //获取食物的信息
var count = 12;
var musicStatus = false;
var songs = [];
var loadItem = 0;
var loadFlag = 0;
var songNow = "";
var songNowId = "";
var songPosition = 0;
var fps = 0;//手指触碰屏幕的位置

Page({
  data: {
    nav:nav.NavF(),
    playMusic:{
      img:"http://seventh77.com/view/food/img/head.jpg",
      sing:"柒柒",
      song:"我喜欢的歌曲"
    },
    musics:songs,
    play:""
  },
  onLoad: function () {
    var that = this;
    this.Nav_Init();
    this.renderPage(15);
  },
  playMusic: function(event){
    if(event.currentTarget.id != songNowId){
      songPosition = 0;
      this.changeBtn(event);
      this.singPlay();
    }
  },
  controlMusic: function(event){
    if(musicStatus){
      this.singPause();
    }
    else{
      this.singPlay();
    }
  },
  singPlay: function(){
    musicStatus = true;
    this.setData({
      play:"play"
    });
    wx.playBackgroundAudio({
      dataUrl: songNow,
    });
    if(songPosition != 0){
       wx.seekBackgroundAudio({
          position: songPosition,
      });
    } 
  },
  singPause: function(){
    this.setData({
      play:"play stop"
    });
    wx.getBackgroundAudioPlayerState({
      success: function(res){
        songPosition =  res.currentPosition;
      }
    })
    wx.pauseBackgroundAudio({
      success: function() {
        musicStatus = false;
      }
    });
  },
  changeBtn: function(event){
    for (var i = 0;i < songs.length;i++){
      songs[i].scale = "scale";
      if(event.currentTarget.id == songs[i].name){
        songs[i].scale = "";
        songNow = songs[i].song;
        songNowId = songs[i].name;
        this.setData({
          playMusic:{
            img:songs[i].picUrl,
            sing:songs[i].singer,
            song:songs[i].name
          }
        });
      }
    }
    this.setData({
      musics:songs
    });
  },
  Nav_Init: function(){
    var thisNav = nav.NavF();
    thisNav.color = "rgb(130, 148, 160)";
    thisNav.navCont[3].border = "5rpx solid #333";
    thisNav.navCont[3].url = "";
    this.setData({
      nav:thisNav
    });
  },
  recordP: function(e){
    fps = e.changedTouches[0].clientY;
  },
  loadMore: function(e){
    if(e.changedTouches[0].clientY - fps < -10){
      if(loadFlag < songsData.songs.length){
        var num = songsData.songs.length - loadFlag > 6 ? 6 : songsData.songs.length - loadFlag;
        this.renderPage(num);
      }
    }
  },
  renderPage: function(num){
    for(var i = loadFlag;i < loadFlag + num;i++){
      songs.push(songsData.songs[i]);
    }
    loadFlag += num;
    this.setData({
      musics:songs
    });
  }
})
