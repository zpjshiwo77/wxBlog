const nav = {
    color:"#fff",
    navCont:[{
        name:"动漫",
        border:"none",
        url:"../comesoon/comesoon"
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
        url:"../comesoon/comesoon"
    },{
        name:"吃货",
        border:"none",
        url:"../food/food"
    },{
        name:"游戏娱乐",
        border:"none",
        url:"../comesoon/comesoon"
    },]
};

module.exports = {
   NavF() {
	const arr = {};
    arr.color = nav.color;
    arr.navCont = [];

	for(var i = 0; i < nav.navCont.length; i++){
		arr.navCont.push(nav.navCont[i]);
	}
    return arr;
  }
}