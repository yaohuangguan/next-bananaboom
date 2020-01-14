// db.posts.insertMany([
//   {
//     name: "React router 的history对象？",
//     info:
//       " 我们可以通过this.props来获取history中的方法，比如push,replace,goBack等来达到路由导向前进后退等, 如果是functional的组件，我们怎么使用props？我们可以使用withRouter 这个React router提供给我们的工具",

//     author: "Sam Yao",
//     createdDate: "2019/10/15",
//     likes: 0,
//     tags: ["React", "router", "browser history"],
//     button: "Read more",
//     content: `在class为基础的组件中，我们可以通过接触props这个参数来获取浏览器的history从而动态的掌握路由的去向,
//     我们可以通过this.props来获取history中的方法，比如push,replace,goBack等
//           来达到路由导向前进后退等.
//           但是如果是functional的组件，我们怎么使用props？我们可以使用withRouter这个React
//           router提供给我们的工具,
//           他让我们可以获取history中的方法从而达到的我们的目的.这个方法有一个问题，就是如果使用Safari浏览器，这段代码不能实现功能，这时候我们需要在onClick里传入event参数，然后阻止click的默认行为，然后在使用browserHistory`,
//     code: `import { withRouter } from "react-router-dom";
//           const Blog3 = ({ history }) => {
//             return (
             
//                 <a href='#' onClick={(e) => {e.preventDefault();history.go(-1)}} title='Go Back'>)}
          
//                 export default withRouter(Blog3)`
//   },
//   {
//     name: " 一句话解释什么是JavaScript闭包",
//     info:
//       "闭包是什么？ 用我的话来讲，闭包是一种责任。高尚的道德操守。如果你生孩子或产生一些东西（一些其他功能）在内部，你必须继续为他们提供他们使用和需要的东西。闭包是一种在javascript中具有道德行为，它对内在诞生的函数负责并提供值。那就是说函数内部可以访问全局变量",
//     author: "Sam Yao",
//     createdDate: "2019/10/20",
//     likes: 0,
//     tags: ["javascript", "闭包"],
//     button: "Read more",
//     content: `用我的话来讲，闭包是一种责任。高尚的道德操守。如果你生了什么东西（一些其他功能）在内部，
//     你必须继续为他们提供他们使用和需要的东西。
//     闭包是一种在javascript中具有道德行为，它对内在诞生的函数负责并提供值。那就是说
//     函数内部可以访问外部变量,
//     在 Javascript 中，这里做了一些独特的事情。 闭包是JavaScript的一个功能，JavaScript
//     引擎将确保函数可以访问外部的所有变量。如果运行a（），当调用过后应从call
//     stack中弹出，并从变量环境里消除。为什么person函数没有被垃圾回收？因为它的内部函数c仍然引用着这个变量。
//     person依然存在，那是因为person进入了闭包这个盒子。 这个盒子就是内存堆memory
//     heap，就是一堆内存，只要我们不再需要这些在内存中，就会被清除。
//     然而当垃圾回收机制看到了person这个函数，看到了在此有闭包，它说：‘嘿
//     这有闭包，我不能回收，因为内部有人还在引用这它。’
//     所以当我们调用b（）的时候，调用下一个 b
//     函数，并将它添加到堆栈中，创建新的变量环境，我们有一个hobby，一旦我们删除hobby或一旦
//     b
//     弹出堆栈再次hobby正在被它内部的另一个函数引用。所以hobby被放进了闭包盒子中，紧接着
//     c函数被调用，我们有了变量degree。最终到了return这行
//     并说好吧，让我们来看看person变量是什么，它会看看在变量环境中吗？并说不，我找不到它，但现在与其寻找全局范围或全局变量，而是看着这个闭包盒子，说我找到了person变量。
//     因为函数c内部没有function，当JavaScript引擎看到函数b会创建闭包，所有在c之外的变量，会被保存以便c使用。`,
//     code: `function a(){
//       let person = 'sam'
//       return function b(){
//       let hobby = 'plays basketball'
//       return function c(){
//       let degree = 'very well'
//       return \`\${person} \${hobby} \${degree}\`
//     }
//     }
//     }
    
//     a()()() // sam plays basketball very well`
//   }
// ]);

// const BLOG_DATA = [
//   {
//     id: 1,
//     name: "How to globally use Axios instance and interceptors in Vue.js",
//     info:
//       "Here to share those experience of using Axios interceptors and hoping this could be helpful. In order to have an Axios instance to use, you need to create an api.js file in your directory.",
//     author: "Sam Yao",
//     likes: 0,
//     tags: ["axios", "vue"],
//     createdDate: "2019/08/01",
//     button: "Read more",
//     content: ` Here to share those experience of using Axios interceptors and hoping
//     this could be helpful. In order to have an Axios instance to use, you need to create an api.js file in your directory.
//     api.js will be your Axios instance you will use later, you can use them anywhere you want as long as you import them in there. Then, you can simply use api.post(‘/…’).then(…).
//     Now, let's go-ahead to Axios interceptors For Vue, you can add
//     interceptor basically anywhere, I'm going to add it in the api.js
//     file. So what the interceptors will do are making
//     all kinds of reactions that you can define when the application is
//     making the request or receiving response and errors.
//     In your login Axios request, you actually storage the token that
//           returns from the backend in the localStorage or cookie, this
//           interceptor would use this request to set the header to Authorization.
//           This is basically how to use Axios interceptors globally. Of course,
//           this code is not perfect, it has a lot of space to improve. Wishing
//           this could help you a little bit.
          
//           Method 2 using Vue $http,
//           import this in your main.js file, and you can use replaced this.$http to make axios request globally`,
//     code: `      
//           import axios from "axios";
//           const api = axios.create({
//             baseURL: '/',
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json"
//             }
//           });
//           api.defaults.timeout = 10000;

//           api.interceptors.request.use(
//             config => {
//               const token = localStorage.getItem("access_token");
//               if (token) {
//                 api.defaults.headers.common["Authorization"] = "Bearer " + token;
//               }
//               return config;
//             },
//             error => Promise.reject(error)
//           );
     
//           api.interceptors.response.use(
//             response => {
//               if (response.status === 200 || response.status === 201) {
//                 return Promise.resolve(response);
//               } else {
//                 return Promise.reject(response);
//               }
//             },

//             error => {
//               if (error.response.status) {
//                 switch (error.response.status) {
//                   case 401:
                   

//                     break;

//                   case 403:
                   
//                     break;
//                   case 404:
                   

//                   default:
//                     throw error;
//                 }
//                 return Promise.reject(error.response);
//               }
//             }
//           );

//           export default api;`,
//     code2: `Vue.use({
//             install (Vue) {
//             Vue.prototype.$http = axios.create({
//               baseURL: '/'
//             })
//           }
//           })`
//   },
//   {
//     id: 2,
//     name: "如何使用同时运行前端和后端框架?",
//     info: "使用concurrently或者npm-run-all",
//     author: "Sam Yao",
//     createdDate: "2019/08/20",
//     button: "Read more",
//     likes: 0,
//     tags: ["前端", "后端"],
//     content: `如何同时运行前端和后端框架?先安装依赖 npm install -g concurrently. 前端的目录要在Express文件夹中,
//           在express根文件夹里的package.json文件里编辑script.也可以使用npm-run-all 来执行多个script`,
//     code: `"scripts": {
//             "start": "node server",
//             "server":"nodemon server",
//             "client":"npm run serve --prefix client",
//             "dev":"concurrently \"npm run server\" \"npm run client\""
//           } `,
//     code2: `"scripts": {
//             "start": "npm-run-all --parallel dev server client",
//             "dev": "webpack --config webpack.server.js --watch",
//             "server": "nodemon --watch build --exec \"node build/bundle.js\"",
//             "client": "webpack --config webpack.client.js --watch"
//           },`
//   },

//   {
//     id: 3,
//     name: "使用Promise和Fetch的数据获取和错误处理",
//     info:
//       "如果遇到网络故障，fetch() promise 将会 reject，带上一个 TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404 不是一个网络故障。想要精确的判断 fetch ()是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是不是为 true。",
//     author: "Sam Yao",
//     createdDate: "2019/10/08",
//     likes: 0,
//     tags: ["Promise", "Fetch", "es6"],
//     button: "Read more",
//     content: `
//     关于fetch比较重要的是，fetch返回一个promise，fetch（） API
//     仅在遇到"网络错误"时拒绝承诺，尽管这通常意味着权限问题或类似问题。基本上，fetch（）
//     将拒绝承诺，如果用户脱机，或发生一些不太可能的网络错误，如 DNS
//     查找失败。 如果遇到网络故障，fetch() promise 将会 reject，带上一个
//     TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404
//     不是一个网络故障。想要精确的判断 fetch() 是否成功，需要包含 promise
//     resolved 的情况，此时再判断 Response.ok 是不是为 true。
//     好消息是，fetch提供了一个简单的 OK 标志，指示 HTTP
//     响应的状态代码是否处于成功范围内。例如，以下代码日志"错误：内部服务器错误（…）", 我们可以用fetch返回给我们的response里的ok属性，如果有错误就是true，那么有错误就throw这个错误，没有就返回reponse.json();，如果不用json的话fetch会返回response对象，我们并没法使用，如果打开proto属性看会看到json方法这样就可以获得具体的数据。
//     然后接着使用.then获取上一步的.json()然后resolve，我们就可以从app.js中使用.then获取到resolved的数据`,
//     code: `fetch("https://api.github.com/users")
//     .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         return new Error(res.statusText);
//     }).then(res => console.log(res)).catch(console.log);`
//   },
//   {
//     id: 4,
//     name: "React router 的history对象？",
//     info:
//       " 我们可以通过this.props来获取history中的方法，比如push,replace,goBack等来达到路由导向前进后退等, 如果是functional的组件，我们怎么使用props？我们可以使用withRouter 这个React router提供给我们的工具",

//     author: "Sam Yao",
//     createdDate: "2019/10/15",
//     likes: 0,
//     tags: ["React", "router", "browser history"],
//     button: "Read more",
//     content: `在class为基础的组件中，我们可以通过接触props这个参数来获取浏览器的history从而动态的掌握路由的去向,
//     我们可以通过this.props来获取history中的方法，比如push,replace,goBack等
//           来达到路由导向前进后退等.
//           但是如果是functional的组件，我们怎么使用props？我们可以使用withRouter这个React
//           router提供给我们的工具,
//           他让我们可以获取history中的方法从而达到的我们的目的.这个方法有一个问题，就是如果使用Safari浏览器，这段代码不能实现功能，这时候我们需要在onClick里传入event参数，然后阻止click的默认行为，然后在使用browserHistory`,
//     code: `import { withRouter } from "react-router-dom";
//           const Blog3 = ({ history }) => {
//             return (
             
//                 <a href='#' onClick={(e) => {e.preventDefault();history.go(-1)}} title='Go Back'>)}
          
//                 export default withRouter(Blog3)`
//   },
//   {
//     id: 5,
//     name: " 一句话解释什么是JavaScript闭包",
//     info:
//       "闭包是什么？ 用我的话来讲，闭包是一种责任。高尚的道德操守。如果你生孩子或产生一些东西（一些其他功能）在内部，你必须继续为他们提供他们使用和需要的东西。闭包是一种在javascript中具有道德行为，它对内在诞生的函数负责并提供值。那就是说函数内部可以访问全局变量",
//     author: "Sam Yao",
//     createdDate: "2019/10/20",
//     likes: 0,
//     tags: ["javascript", "闭包"],
//     button: "Read more",
//     content: `用我的话来讲，闭包是一种责任。高尚的道德操守。如果你生了什么东西（一些其他功能）在内部，
//     你必须继续为他们提供他们使用和需要的东西。
//     闭包是一种在javascript中具有道德行为，它对内在诞生的函数负责并提供值。那就是说
//     函数内部可以访问外部变量,
//     在 Javascript 中，这里做了一些独特的事情。 闭包是JavaScript的一个功能，JavaScript
//     引擎将确保函数可以访问外部的所有变量。如果运行a（），当调用过后应从call
//     stack中弹出，并从变量环境里消除。为什么person函数没有被垃圾回收？因为它的内部函数c仍然引用着这个变量。
//     person依然存在，那是因为person进入了闭包这个盒子。 这个盒子就是内存堆memory
//     heap，就是一堆内存，只要我们不再需要这些在内存中，就会被清除。
//     然而当垃圾回收机制看到了person这个函数，看到了在此有闭包，它说：‘嘿
//     这有闭包，我不能回收，因为内部有人还在引用这它。’
//     所以当我们调用b（）的时候，调用下一个 b
//     函数，并将它添加到堆栈中，创建新的变量环境，我们有一个hobby，一旦我们删除hobby或一旦
//     b
//     弹出堆栈再次hobby正在被它内部的另一个函数引用。所以hobby被放进了闭包盒子中，紧接着
//     c函数被调用，我们有了变量degree。最终到了return这行
//     并说好吧，让我们来看看person变量是什么，它会看看在变量环境中吗？并说不，我找不到它，但现在与其寻找全局范围或全局变量，而是看着这个闭包盒子，说我找到了person变量。
//     因为函数c内部没有function，当JavaScript引擎看到函数b会创建闭包，所有在c之外的变量，会被保存以便c使用。`,
//     code: `function a(){
//       let person = 'sam'
//       return function b(){
//       let hobby = 'plays basketball'
//       return function c(){
//       let degree = 'very well'
//       return \`\${person} \${hobby} \${degree}\`
//     }
//     }
//     }
    
//     a()()() // sam plays basketball very well`
//   }
// ];
// db.resumes.insertMany([
//   {
//     id: 1,
//     title: "Netflix重制",
//     _title: "Netflix Remake",
//     info:
//       "根据Netflix网站的布局，我通过HTML,CSS,JS制作的镜像网站，没有具体功能",
//     _info:
//       "According to Netflix layout，I remade this website using HTML,CSS,JS, but there is no actual processing functions, just for fun",
//     degree: "small scale",

//     url: "https://yaohuangguan.github.io/Netflix-selfmade/"
//   },
//   {
//     id: 2,
//     title: "GameSenshi戦士",
//     _title: "GameSenshi",
//     info:
//       "一个供游戏玩家与其他玩家及直播主之间的组队和与社区中其他人联系的平台，从此游戏不再孤单，使用了React，Redux和Firebase来管理前后端，Stripe来进行支付的过程",
//     _info:
//       "A platform for gamers/streamers to provide their casual service and link up with others in the community.",
//     degree: "large scale",
//     url: "https://gamesenshi.com"
//   },
//   {
//     id: 3,
//     title: "卡路里跟踪App",
//     _title: "Tracalories App",

//     info:
//       "一个简单的web程序，可以添加食物及热量，并且可以计算出卡路里和更新的数据",
//     _info:
//       "A simple web app，you can add or delete food and calories of it，you can also get the calculated calories of suggested data you should get",
//     degree: "small scale",
//     url: "https://yaohuangguan.github.io/Tracalories/"
//   },
//   {
//     id: 4,
//     title: "联系人管理app",
//     _title: "Friend Keeper app",
//     info:
//       "使用 Mongoose 创建用户 Model，并使用提供的 Api 来操作数据注册和登录操作，并存入 Mongodb。 使用了 JWT 和 Mongo 实现了登录系统和 Postman 来测试 API 的接口数据。前端 React 使用了 Hook，Context API 与 React Router 来管理客户端的状态管理, 页面渲染和路由设置",
//     _info:
//       "This app is made by mongoDB,Node,React,Express.You can sign up a user and log in ，you can save and create new contact and their tags",
//     degree: "medium",

//     url: "http://contact.yaobaiyang.com/"
//   },
//   {
//     id: 5,
//     title: "工作公告栏",
//     _title: "Developer Job Board",
//     info: "一个给Zero to mastery社区提供的开发者工作告示栏",
//     _info:
//       "a place that made for Zero to mastery community, which provides developers to make friend with each other and find jobs",
//     degree: "medium",

//     url: "https://zero-to-mastery.github.io/ZtM-Job-Board/"
//   },
//   {
//     id: 6,
//     title: "颜色生成器",
//     _title: "Color Generator",
//     info: "一个用vue做的可以提取gradient颜色的css,可以选取不同颜色的Hexcode",
//     _info:
//       "like lots of css generators out there on web, this is a small yet powerful app for creating gradient color css",
//     degree: "small",

//     url: "http://color.yaobaiyang.com/"
//   },
//   {
//     id: 7,
//     title: "书签app",
//     _title: "Book Marker",
//     info: "可以管理自己的书籍，做记录",
//     _info: "You can manage the book you have read and take notes of it",
//     degree: "small",

//     url: "https://yaohuangguan.github.io/book-list/"
//   },
//   {
//     id: 8,
//     title: "贷款计算器",
//     _title: "loan calculator",
//     info: "计算贷款并添加利率等，可以计算出需要多少年和多少钱",
//     _info:
//       "Handy small app that enables you to calculator how much many you need and how much time to pay for the loan in no time",
//     degree: "small",

//     url: "https://yaohuangguan.github.io/loan-calculator/"
//   },
//   {
//     id: 9,
//     title: "青柠网",
//     _title: "Green Pomelo",
//     info:
//       "为寻求出色工作的艺术家创建的平台，发挥你的优势，上传艺术作品或者灵感，让更多公司注意到你，获得更多巨大的机会！与有共同兴趣的人们一起探索更多你喜欢的事物",
//     _info:
//       "A platform created for artists that are looking for great jobs. Bring out the best of you, let more great companies notice you, gain lots of huge oppotunities. Explore more stuff you love with people share same interests.",
//     degree: "medium",

//     url: "http://pomelo.bananaboom.space"
//   },
//   {
//     id: 10,
//     title: "VueTube 视频网页",
//     _title: "VueTube Video Watching",
//     info:
//       "使用Vue和YouTube API做的一个视频播放网站，你可以搜索youtube上面的视频并且观看，无广告，需要VPN",
//     _info:
//       "Used Vue and YouTube API to make this awesome Ads-free video playing website，you can search your favorite YouTube videos from here",
//     degree: "small",

//     url: "http://vuetube.yaobaiyang.com/"
//   },
//   {
//     id: 11,
//     title: "Github查找好友",
//     _title: "GitHub User Finder",
//     info:
//       "可以通过GITHUB提供的API来查询特定用户的信息，比如登录名，repo，个人网站，star等",
//     _info:
//       "This is made by GITHUB API and react to search for a specific user and to check there personal website or repository or stars,etc...",
//     degree: "small",

//     url: "https://yaohuangguan.github.io/github-finder/"
//   },
//   {
//     id: 12,
//     title: "Apex Legend战绩查询",
//     _title: "Apex Legend Checker",
//     info: "使用Vue和Node.js创建了界面和Api，为用户提供一个查询战绩的接口",
//     _info:
//       "this app used Vue and Node.js that created a awesome Api for users to check their scores of Apex Legend",
//     degree: "medium",

//     url: "http://apex.yaobaiyang.com/"
//   },
//   {
//     id: 13,
//     title: "CookieCannon饼干",
//     _title: "CookieCannon Cookie Store",

//     info:
//       "使用Vue和Django的网站，因为公司有其他业务所以此项目暂未上线，前端的功能是与后端相连，服务器暂时下线。所以前端暂时无法使用。",
//     _info:
//       "I made this app using Vue and Django，because some issues was going on in our company，so that our server is currently down and this project is delayed. Front end side is connected to Back end side, so the features on front end might not be working at this point.",
//     degree: "large",

//     url: "http://cookiecannon.yaobaiyang.com/"
//   },
//   {
//     id: 14,
//     title: "BeeHex 3D打印",
//     _title: "BeeHex 3D Print",
//     info:
//       "BeeHex公司官网，BeeHex 是一家 NASA 的子公司，利用食品行业最先进的 3D 打印和机器人系统，使食品制备和个性化现代化。",
//     _info:
//       "BeeHex Official Website，BeeHex is a NASA spin-off company modernizing food preparation and personalization with the most advanced 3D printing and robotics system in the food industry.",
//     degree: "large",

//     url: "https://www.beehex.com"
//   },
//   {
//     id: 15,
//     title: "YouTube UI设计",
//     _title: "YouTube Redesign",
//     info:
//       "大名鼎鼎的YouTube，在学校时，我的一个课程曾参与过YouTube网站的UI重设计，是关于UX&UI的，要对此进行使用性测验等。国内用户无法使用，需要VPN",
//     _info:
//       "The famous YouTube，back in school，I had a UX course that was given an assignment that worked with YouTube to redesign their website. I did a lot of research and usability test,etc...",
//     degree: "large",

//     url: "https://www.youtube.com"
//   },
//   {
//     id: 16,
//     title: "Sam Yao服装网站",
//     _title: "Sam Clothing",
//     info:
//       "使用 Redux 来管理程序的状态和方法，React-router 来管理路由.通过 React 提供的 React.lazy 和 Suspense 方法来实现路由懒加载，减少不必要的性能开销. 使用 Firebase 和 Google 登录 API 来储存用户信息和第三方登录.使用了 Firestore 作为项目的数据库，并通过 Stripe.js 支付工具实现付款的功能",
//     _info:
//       "Made by using React，Reduxand Firebase authentication and firestore，Stripe.js payment processing tool，the users could use this fully functional website to purchase their desire clothing",
//     degree: "large",
//     url: "http://clothes.yaobaiyang.com/"
//   }
// ]);

// useEffect(() => {
//   const abortController = new AbortController();
//   const getExpenseTemplate = () => {
//    axios
//       .get(
//         `${process.env.REACT_APP_PROD_URL}/expense_application_line_template/all?company_id=${companies.id}`
//       )
//       .then((res) => {
//         setTemplate(res.data.expenseApplicationLineTemplates);
//         setIsLoading(false);
//       })
//       .catch((err) => console.log(err));
//   };

//   getExpenseTemplate();
//   return () => {
//     abortController.abort();
//   };
// }, []);

// db.posts.insert({
//   name: "花了一上午时间写了一个Canvas的动画",
//       info:
//         "HTML5的canvas标签和JavaScript，使用的是es6 class写法。流星从空中坠落，到地面破碎会有\"粒子\"的效果，背景还有流星划过夜空",
//       author: "Sam Yao",
//       likes: 10,
//       tags: ["Canvas", "Animation"],
//       button: "See it in action",
//       url:'/meteor'
// })

// openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
//   -keyout localhost-privkey.pem -out localhost-cert.pem