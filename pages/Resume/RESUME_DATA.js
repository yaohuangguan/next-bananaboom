const RESUME_DATA = [
  {
    id: 1,
    name: "chinese",
    items: [
      {
        id: 1,
        title: "Netflix重制",
        info:
          "根据Netflix网站的布局，我通过HTML,CSS,JS制作的镜像网站，没有具体功能",
        degree: "small scale",
        url: "https://yaohuangguan.github.io/Netflix-selfmade/"
      },
      {
        id: 2,
        title: "GameSenshi戦士",
        info:
          "一个供游戏玩家与其他玩家及直播主之间的组队和与社区中其他人联系的平台，从此游戏不再孤单，使用了React，Redux和Firebase来管理前后端，Stripe来进行支付的过程",
        degree: "large scale",
        url: "https://gamesenshi.com"
      },
      {
        id: 3,
        title: "卡路里跟踪App",
        info:
          "一个简单的web程序，可以添加食物及热量，并且可以计算出卡路里和更新的数据",
        degree: "small",

        url: "https://yaohuangguan.github.io/Tracalories/"
      },
      {
        id: 4,
        title: "联系人管理app",
        info:
          "使用 Mongoose 创建用户 Model，并使用提供的 Api 来操作数据注册和登录操作，并存入 Mongodb。 使用了 JWT 和 Mongo 实现了登录系统和 Postman 来测试 API 的接口数据。前端 React 使用了 Hook，Context API 与 React Router 来管理客户端的状态管理, 页面渲染和路由设置",
        degree: "medium",

        url: "http://contact.yaobaiyang.com/"
      },
      {
        id: 5,
        title: "工作公告栏",
        info: "一个给Zero to mastery社区提供的开发者工作告示栏",
        degree: "medium",

        url: "https://zero-to-mastery.github.io/ZtM-Job-Board/"
      },
      {
        id: 6,
        title: "颜色生成器",
        info: "一个用vue做的可以提取gradient颜色的css",
        degree: "small",

        url:
          "http://color.yaobaiyang.com/"
      },
      {
        id: 7,
        title: "书签app",
        info: "可以管理自己的书籍，做记录",
        degree: "small",

        url: "https://yaohuangguan.github.io/book-list/"
      },
      {
        id: 8,
        title: "贷款计算器",
        info: "计算贷款并添加利率等，可以计算出需要多少年和多少钱",
        degree: "small",

        url: "https://yaohuangguan.github.io/loan-calculator/"
      },
      {
        id: 9,
        title: "青柠网",
        info:
          "为寻求出色工作的艺术家创建的平台，发挥你的优势，上传艺术作品或者灵感，让更多公司注意到你，获得更多巨大的机会！与有共同兴趣的人们一起探索更多你喜欢的事物",
        degree: "medium",

        url: "http://pomelo.bananaboom.space"
      },
      {
        id: 10,
        title: "VueTube",
        info:
          "使用Vue和YouTube API做的一个视频播放网站，你可以搜索youtube上面的视频并且观看，无广告. 国内用户无法使用，需要VPN",
        degree: "small",

        url: "http://vuetube.yaobaiyang.com/"
      },
      {
        id: 11,
        title: "Github查找好友",
        info:
          "可以通过GITHUB提供的API来查询特定用户的信息，比如登录名，repo，个人网站，star等",
        degree: "small",

        url: "https://yaohuangguan.github.io/github-finder/"
      },
      {
        id: 12,
        title: "Apex Legend战绩查询",
        info: "使用Vue和Node.js创建了界面和Api，为用户提供一个查询战绩的接口",
        degree: "medium",

        url: "http://apex.yaobaiyang.com/"
      },
      {
        id: 13,
        title: "CookieCannon饼干",
        info:
          "使用Vue和Django的网站，因为公司有其他业务所以此项目暂未上线，前端的功能是与后端相连，服务器暂时下线。所以前端暂时无法使用。",
        degree: "large",

        url: "http://cookiecannon.yaobaiyang.com/"
      },
      {
        id: 14,
        title: "BeeHex",
        info:
          "BeeHex公司官网，BeeHex 是一家 NASA 的子公司，利用食品行业最先进的 3D 打印和机器人系统，使食品制备和个性化现代化。",
        degree: "large",

        url: "https://www.beehex.com"
      },
      {
        id: 15,
        title: "YouTube",
        info:
          "大名鼎鼎的YouTube，在学校时，我的一个课程曾参与过YouTube网站的UI重设计，是关于UX&UI的，要对此进行使用性测验等。国内用户无法使用，需要VPN",
        degree: "large",

        url: "https://www.youtube.com"
      },
      {
        id:16,
        title:'Sam Yao服装网站',
        info:'使用 Redux 来管理程序的状态和方法，React-router 来管理路由.通过 React 提供的 React.lazy 和 Suspense 方法来实现路由懒加载，减少不必要的性能开销. 使用 Firebase 和 Google 登录 API 来储存用户信息和第三方登录.使用了 Firestore 作为项目的数据库，并通过 Stripe.js 支付工具实现付款的功能',
        degree:'large',
        url:'http://clothes.yaobaiyang.com/'
      }
    ]
  },
  {
    id: 2,
    name: "english",
    items: [
      {
        id: 1,
        title: "Netflix Remake",
        info:
          "According to Netflix layout，I remade this website using HTML,CSS,JS, but there is no actual processing functions, just for fun",
        degree: "small scale",

        url: "https://yaohuangguan.github.io/Netflix-selfmade/"
      },
      {
        id: 2,
        title: "GameSenshi戦士",
        info:
          "A platform for gamers/streamers to provide their casual service and link up with others in the community.",
        degree: "large scale",

        url: "https://gamesenshi.com"
      },
      {
        id: 3,
        title: "Calories Tracker app",
        info:
          "A simple web app，you can add or delete food and calories of it，you can also get the calculated calories of suggested data you should get",
        degree: "small scale",

        url: "https://yaohuangguan.github.io/Tracalories/"
      },
      {
        id: 4,
        title: "Contact keeper app",
        info:
          "this app is made by mongoDB,Node,React,Express.You can sign up a user and log in ，you can save and create new contact and their tags",
        degree: "medium scale",

        url: "http://contact.yaobaiyang.com/"
      },
      {
        id: 5,
        title: "Job Board",
        info:
          "a place that made for Zero to mastery community, which provides developers to make friend with each other and find jobs",
        degree: "medium scale",

        url: "https://zero-to-mastery.github.io/ZtM-Job-Board/"
      },
      {
        id: 6,
        title: "Color Generator",
        info:
          "like lots of css generators out there on web, this is a small yet powerful app for creating gradient color css",
        degree: "small scale",

        url:
          "http://color.yaobaiyang.com/"
      },
      {
        id: 7,
        title: "book list app",
        info: "You can manage the book you have read and take notes of it",
        degree: "small scale",

        url: "https://yaohuangguan.github.io/book-list/"
      },
      {
        id: 8,
        title: "Loan Calculator",
        info:
          "Calculating all the loan that you should pay back and the years it takes",
        degree: "small scale",

        url: "https://yaohuangguan.github.io/loan-calculator/"
      },
      {
        id: 9,
        title: "Green pomelo designer website",
        info:
          "A platform created for artists that are looking for great jobs. Bring out the best of you, let more great companies notice you, gain lots of huge oppotunities. Explore more stuff you love with people share same interests.",
        degree: "large scale",

        url: "http://pomelo.bananaboom.space"
      },
      {
        id: 10,
        title: "VueTube",
        info:
          "Used Vue and YouTube API to make this awesome Ads-free video playing website，you can search your favorite YouTube videos from here",
        degree: "medium scale",

        url: "http://vuetube.yaobaiyang.com/"
      },
      {
        id: 11,
        title: "Github find friend",
        info:
          "this is made by GITHUB API and react to search for a specific user and to check there personal website or repository or stars,etc...",
        degree: "medium scale",

        url: "https://yaohuangguan.github.io/github-finder/"
      },
      {
        id: 12,
        title: "Apex Legend Scores Checker",
        info:
          "this app used Vue and Node.js that created a awesome Api for users to check their scores of Apex Legend",
        degree: "medium scale",

        url: "http://apex.yaobaiyang.com/"
      },
      {
        id: 13,
        title: "CookieCannon Cookie Store",
        info:
          "I made this app using Vue and Django，because some issues was going on in our company，so that our server is currently down and this project is delayed. Front end side is connected to Back end side, so the features on front end might not be working at this point.",
        degree: "large scale",

        url: "http://cookiecannon.yaobaiyang.com/"
      },
      {
        id: 14,
        title: "BeeHex",
        info:
          "BeeHex Official Website，BeeHex is a NASA spin-off company modernizing food preparation and personalization with the most advanced 3D printing and robotics system in the food industry. ",
        degree: "large scale",

        url: "https://www.beehex.com"
      },
      {
        id: 15,
        title: "YouTube",
        info:
          "The famous YouTube，back in school，I had a UX course that was given an assignment that worked with YouTube to redesign their website. I did a lot of research and usability test,etc...",
        degree: "large scale",

        url: "https://www.youtube.com"
      },
      {
        id:16,
        title:'Sam Yao Clothing',
        info:'Made by using React，Reduxand Firebase authentication and firestore，Stripe.js payment processing tool，the users could use this fully functional website to purchase their desire clothing',
        degree:'large scale',
        url:'http://clothes.yaobaiyang.com/'
      }
    ]
  }
];

export default RESUME_DATA;
