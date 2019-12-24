
const link = ['https://gamesenshi.com','http://www.yby.best/']
const image = ['https://i.ibb.co/55z32tw/long-sleeve.png','https://www.gamesenshi.com/static/media/dota2.2d33d761.jpg']
const [width,height] = [200,220]
const PROJECTS = [
  {
    id: 1,
    name: "中文",
    items: [
      {
        id: 1,
        name: "GameSenshi戦士",
        link: link[0],
        info:
          "一个供游戏玩家与其他玩家及直播主之间的组队和与社区中其他人联系的平台，从此游戏不再孤单",
        image: image[1], 
        width: width,
        height: height
      },
      {
        id: 2,
        name: "SamYao 服装购物",
        link:
          link[1],
        info:
          "为正在寻找时尚服装的客户创建的平台。优质的产品和优质的客户服务以及流畅的零障碍购买经验是您从我们网站上获得的最低保证！便宜又优质!",
        image:
          image[0],
        width: width,
        height: height
      }
    ]
  },
  {
    id: 2,
    name: "English",
    items: [
      {
        id: 1,
        name: "GameSenshi",
        link: link[0],
        info:
          "A platform for gamers/streamers to provide their casual service and link up with others in the community.",
        image:image[1],
        width: width,
        height: height
      },
      {
        id: 2,
        name: "SamYao Clothing",
        link:
        link[1],
        info:
          " A platform created for customers that are looking for fashion outfits. Great quality and excellent customer service, and smooth zero obstacle purchasing experience are the least you can get from our site! Cheap and yet best quality!",
        image:
        image[0],
        width: width,
        height: height
      }
    ]
  }
];

export default PROJECTS;
