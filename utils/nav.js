var imath = require('math.js'); //获取数学函数的实例

const nav = {
    color:"#fff",
    navCont:[{
        name:"主页",
        border:"none",
        url:"../index/index"
    },{
        name:"技术博客",
        border:"none",
        url:"../comesoon/comesoon"
    },{
        name:"电影",
        border:"none",
        url:"../comesoon/comesoon"
    },{
        name:"音乐",
        border:"none",
        url:"../music/music"
    },{
        name:"吃货",
        border:"none",
        url:"../food/food"
    },{
        name:"动漫",
        border:"none",
        url:"../comesoon/comesoon"
    },]
};

module.exports = {
   NavF() {
    var arr = imath.imath.deepClone(nav);
    return arr;
  }
}