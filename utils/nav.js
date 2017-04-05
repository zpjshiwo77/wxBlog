var imath = require('math.js'); //获取数学函数的实例

const nav = {
    color:"#fff",
    navCont:[{
        name:"美食",
        border:"none",
        url:"../food/food"
    },{
        name:"音乐",
        border:"none",
        url:"../music/music"
    }]
};

module.exports = {
   NavF() {
    var arr = imath.imath.deepClone(nav);
    return arr;
  }
}