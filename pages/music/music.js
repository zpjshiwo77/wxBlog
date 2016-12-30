//index.js
var nav = require('../../utils/nav.js'); //获取导航的实例
var songsId = ["406475388","418603077","424477572","28747428","30569023","404184209","411988502","408332847","187956","41665696","31545822","168277","65528","34179838","64673","188671","208938","190473","425724850","37169617","35403523","209045","409060868","113610","185982","185868","253948","30394763","63650","187966","255858","32507038","186125","4950181","188703","720231","28029104","36539010","316637","27612267","64959","35847131","31654343","167924","287035","387622","188657","30394771","25877506","30070212","28850212","26348068","286602","30953009"];//歌曲
var count = 12;
var musicStatus = false;
var songs = [];
var loadItem = 0;
var loadFlag = 9;
var songNow = "";
var songNowId = "";
var songPosition = 0;

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
    this.loadMusic();
    setTimeout(function(){
      that.loadMusic();
    },500);
  },
  loadMusic: function(){
    for(var i = 0;i < 9;i++){
      if(loadItem + i < songsId.length && loadFlag > 0){
        loadFlag--;
        this.loadSongs(songsId[loadItem + i]);
      }
    }
    loadItem += 9;
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
    this.setData({
      nav:thisNav
    });
  },
  renderPage: function(data){
    var item = {};
    item.picUrl = data.songs[0].album.picUrl;
    item.name = data.songs[0].name;
    item.singer = data.songs[0].artists[0].name;
    item.scale = "scale";
    item.song = data.songs[0].mp3Url;
    songs.push(item);
    this.setData({
      musics:songs
    });
  },
  loadSongs: function(data){
    console.log("loadStart");
    var that = this;
    wx.request({
      url: 'https://www.seventh77.com/modal/test.php',
      method: 'POST',
      data: 'id=' + data,
      header: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function(res) {
        console.log("success");
        that.renderPage(res.data);
        loadFlag++;
      },
      fail: function(){
        console.log("fail");
      }
    })
  }
})
