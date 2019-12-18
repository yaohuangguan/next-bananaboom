db.posts.insertMany([
  {
    name: "React router 的history对象？",
    info:
      " 我们可以通过this.props来获取history中的方法，比如push,replace,goBack等来达到路由导向前进后退等, 如果是functional的组件，我们怎么使用props？我们可以使用withRouter 这个React router提供给我们的工具",

    author: "Sam Yao",
    createdDate: "2019/10/15",
    likes: 0,
    tags: ["React", "router", "browser history"],
    button: "Read more",
    content: `在class为基础的组件中，我们可以通过接触props这个参数来获取浏览器的history从而动态的掌握路由的去向,
    我们可以通过this.props来获取history中的方法，比如push,replace,goBack等
          来达到路由导向前进后退等.
          但是如果是functional的组件，我们怎么使用props？我们可以使用withRouter这个React
          router提供给我们的工具,
          他让我们可以获取history中的方法从而达到的我们的目的.这个方法有一个问题，就是如果使用Safari浏览器，这段代码不能实现功能，这时候我们需要在onClick里传入event参数，然后阻止click的默认行为，然后在使用browserHistory`,
    code: `import { withRouter } from "react-router-dom";
          const Blog3 = ({ history }) => {
            return (
             
                <a href='#' onClick={(e) => {e.preventDefault();history.go(-1)}} title='Go Back'>)}
          
                export default withRouter(Blog3)`
  },
  {
    name: " 一句话解释什么是JavaScript闭包",
    info:
      "闭包是什么？ 用我的话来讲，闭包是一种责任。高尚的道德操守。如果你生孩子或产生一些东西（一些其他功能）在内部，你必须继续为他们提供他们使用和需要的东西。闭包是一种在javascript中具有道德行为，它对内在诞生的函数负责并提供值。那就是说函数内部可以访问全局变量",
    author: "Sam Yao",
    createdDate: "2019/10/20",
    likes: 0,
    tags: ["javascript", "闭包"],
    button: "Read more",
    content: `用我的话来讲，闭包是一种责任。高尚的道德操守。如果你生了什么东西（一些其他功能）在内部，
    你必须继续为他们提供他们使用和需要的东西。
    闭包是一种在javascript中具有道德行为，它对内在诞生的函数负责并提供值。那就是说
    函数内部可以访问外部变量,
    在 Javascript 中，这里做了一些独特的事情。 闭包是JavaScript的一个功能，JavaScript
    引擎将确保函数可以访问外部的所有变量。如果运行a（），当调用过后应从call
    stack中弹出，并从变量环境里消除。为什么person函数没有被垃圾回收？因为它的内部函数c仍然引用着这个变量。
    person依然存在，那是因为person进入了闭包这个盒子。 这个盒子就是内存堆memory
    heap，就是一堆内存，只要我们不再需要这些在内存中，就会被清除。
    然而当垃圾回收机制看到了person这个函数，看到了在此有闭包，它说：‘嘿
    这有闭包，我不能回收，因为内部有人还在引用这它。’
    所以当我们调用b（）的时候，调用下一个 b
    函数，并将它添加到堆栈中，创建新的变量环境，我们有一个hobby，一旦我们删除hobby或一旦
    b
    弹出堆栈再次hobby正在被它内部的另一个函数引用。所以hobby被放进了闭包盒子中，紧接着
    c函数被调用，我们有了变量degree。最终到了return这行
    并说好吧，让我们来看看person变量是什么，它会看看在变量环境中吗？并说不，我找不到它，但现在与其寻找全局范围或全局变量，而是看着这个闭包盒子，说我找到了person变量。
    因为函数c内部没有function，当JavaScript引擎看到函数b会创建闭包，所有在c之外的变量，会被保存以便c使用。`,
    code: `function a(){
      let person = 'sam'
      return function b(){
      let hobby = 'plays basketball'
      return function c(){
      let degree = 'very well'
      return \`\${person} \${hobby} \${degree}\`
    }
    }
    }
    
    a()()() // sam plays basketball very well`
  }
]);

const BLOG_DATA = [
  {
    id: 1,
    name: "How to globally use Axios instance and interceptors in Vue.js",
    info:
      "Here to share those experience of using Axios interceptors and hoping this could be helpful. In order to have an Axios instance to use, you need to create an api.js file in your directory.",
    author: "Sam Yao",
    likes: 0,
    tags: ["axios", "vue"],
    createdDate: "2019/08/01",
    button: "Read more",
    content: ` Here to share those experience of using Axios interceptors and hoping
    this could be helpful. In order to have an Axios instance to use, you need to create an api.js file in your directory.
    api.js will be your Axios instance you will use later, you can use them anywhere you want as long as you import them in there. Then, you can simply use api.post(‘/…’).then(…).
    Now, let's go-ahead to Axios interceptors For Vue, you can add
    interceptor basically anywhere, I'm going to add it in the api.js
    file. So what the interceptors will do are making
    all kinds of reactions that you can define when the application is
    making the request or receiving response and errors.
    In your login Axios request, you actually storage the token that
          returns from the backend in the localStorage or cookie, this
          interceptor would use this request to set the header to Authorization.
          This is basically how to use Axios interceptors globally. Of course,
          this code is not perfect, it has a lot of space to improve. Wishing
          this could help you a little bit.
          
          Method 2 using Vue $http,
          import this in your main.js file, and you can use replaced this.$http to make axios request globally`,
    code: `      
          import axios from "axios";
          const api = axios.create({
            baseURL: '/',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          });
          api.defaults.timeout = 10000;

          api.interceptors.request.use(
            config => {
              const token = localStorage.getItem("access_token");
              if (token) {
                api.defaults.headers.common["Authorization"] = "Bearer " + token;
              }
              return config;
            },
            error => Promise.reject(error)
          );
     
          api.interceptors.response.use(
            response => {
              if (response.status === 200 || response.status === 201) {
                return Promise.resolve(response);
              } else {
                return Promise.reject(response);
              }
            },

            error => {
              if (error.response.status) {
                switch (error.response.status) {
                  case 401:
                   

                    break;

                  case 403:
                   
                    break;
                  case 404:
                   

                  default:
                    throw error;
                }
                return Promise.reject(error.response);
              }
            }
          );

          export default api;`,
    code2: `Vue.use({
            install (Vue) {
            Vue.prototype.$http = axios.create({
              baseURL: '/'
            })
          }
          })`
  },
  {
    id: 2,
    name: "如何使用同时运行前端和后端框架?",
    info: "使用concurrently或者npm-run-all",
    author: "Sam Yao",
    createdDate: "2019/08/20",
    button: "Read more",
    likes: 0,
    tags: ["前端", "后端"],
    content: `如何同时运行前端和后端框架?先安装依赖 npm install -g concurrently. 前端的目录要在Express文件夹中,
          在express根文件夹里的package.json文件里编辑script.也可以使用npm-run-all 来执行多个script`,
    code: `"scripts": {
            "start": "node server",
            "server":"nodemon server",
            "client":"npm run serve --prefix client",
            "dev":"concurrently \"npm run server\" \"npm run client\""
          } `,
    code2: `"scripts": {
            "start": "npm-run-all --parallel dev server client",
            "dev": "webpack --config webpack.server.js --watch",
            "server": "nodemon --watch build --exec \"node build/bundle.js\"",
            "client": "webpack --config webpack.client.js --watch"
          },`
  },

  {
    id: 3,
    name: "使用Promise和Fetch的数据获取和错误处理",
    info:
      "如果遇到网络故障，fetch() promise 将会 reject，带上一个 TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404 不是一个网络故障。想要精确的判断 fetch ()是否成功，需要包含 promise resolved 的情况，此时再判断 Response.ok 是不是为 true。",
    author: "Sam Yao",
    createdDate: "2019/10/08",
    likes: 0,
    tags: ["Promise", "Fetch", "es6"],
    button: "Read more",
    content: `
    关于fetch比较重要的是，fetch返回一个promise，fetch（） API
    仅在遇到"网络错误"时拒绝承诺，尽管这通常意味着权限问题或类似问题。基本上，fetch（）
    将拒绝承诺，如果用户脱机，或发生一些不太可能的网络错误，如 DNS
    查找失败。 如果遇到网络故障，fetch() promise 将会 reject，带上一个
    TypeError 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404
    不是一个网络故障。想要精确的判断 fetch() 是否成功，需要包含 promise
    resolved 的情况，此时再判断 Response.ok 是不是为 true。
    好消息是，fetch提供了一个简单的 OK 标志，指示 HTTP
    响应的状态代码是否处于成功范围内。例如，以下代码日志"错误：内部服务器错误（…）", 我们可以用fetch返回给我们的response里的ok属性，如果有错误就是true，那么有错误就throw这个错误，没有就返回reponse.json();，如果不用json的话fetch会返回response对象，我们并没法使用，如果打开proto属性看会看到json方法这样就可以获得具体的数据。
    然后接着使用.then获取上一步的.json()然后resolve，我们就可以从app.js中使用.then获取到resolved的数据`,
    code: `fetch("https://api.github.com/users")
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return new Error(res.statusText);
    }).then(res => console.log(res)).catch(console.log);`
  },
  {
    id: 4,
    name: "React router 的history对象？",
    info:
      " 我们可以通过this.props来获取history中的方法，比如push,replace,goBack等来达到路由导向前进后退等, 如果是functional的组件，我们怎么使用props？我们可以使用withRouter 这个React router提供给我们的工具",

    author: "Sam Yao",
    createdDate: "2019/10/15",
    likes: 0,
    tags: ["React", "router", "browser history"],
    button: "Read more",
    content: `在class为基础的组件中，我们可以通过接触props这个参数来获取浏览器的history从而动态的掌握路由的去向,
    我们可以通过this.props来获取history中的方法，比如push,replace,goBack等
          来达到路由导向前进后退等.
          但是如果是functional的组件，我们怎么使用props？我们可以使用withRouter这个React
          router提供给我们的工具,
          他让我们可以获取history中的方法从而达到的我们的目的.这个方法有一个问题，就是如果使用Safari浏览器，这段代码不能实现功能，这时候我们需要在onClick里传入event参数，然后阻止click的默认行为，然后在使用browserHistory`,
    code: `import { withRouter } from "react-router-dom";
          const Blog3 = ({ history }) => {
            return (
             
                <a href='#' onClick={(e) => {e.preventDefault();history.go(-1)}} title='Go Back'>)}
          
                export default withRouter(Blog3)`
  },
  {
    id: 5,
    name: " 一句话解释什么是JavaScript闭包",
    info:
      "闭包是什么？ 用我的话来讲，闭包是一种责任。高尚的道德操守。如果你生孩子或产生一些东西（一些其他功能）在内部，你必须继续为他们提供他们使用和需要的东西。闭包是一种在javascript中具有道德行为，它对内在诞生的函数负责并提供值。那就是说函数内部可以访问全局变量",
    author: "Sam Yao",
    createdDate: "2019/10/20",
    likes: 0,
    tags: ["javascript", "闭包"],
    button: "Read more",
    content: `用我的话来讲，闭包是一种责任。高尚的道德操守。如果你生了什么东西（一些其他功能）在内部，
    你必须继续为他们提供他们使用和需要的东西。
    闭包是一种在javascript中具有道德行为，它对内在诞生的函数负责并提供值。那就是说
    函数内部可以访问外部变量,
    在 Javascript 中，这里做了一些独特的事情。 闭包是JavaScript的一个功能，JavaScript
    引擎将确保函数可以访问外部的所有变量。如果运行a（），当调用过后应从call
    stack中弹出，并从变量环境里消除。为什么person函数没有被垃圾回收？因为它的内部函数c仍然引用着这个变量。
    person依然存在，那是因为person进入了闭包这个盒子。 这个盒子就是内存堆memory
    heap，就是一堆内存，只要我们不再需要这些在内存中，就会被清除。
    然而当垃圾回收机制看到了person这个函数，看到了在此有闭包，它说：‘嘿
    这有闭包，我不能回收，因为内部有人还在引用这它。’
    所以当我们调用b（）的时候，调用下一个 b
    函数，并将它添加到堆栈中，创建新的变量环境，我们有一个hobby，一旦我们删除hobby或一旦
    b
    弹出堆栈再次hobby正在被它内部的另一个函数引用。所以hobby被放进了闭包盒子中，紧接着
    c函数被调用，我们有了变量degree。最终到了return这行
    并说好吧，让我们来看看person变量是什么，它会看看在变量环境中吗？并说不，我找不到它，但现在与其寻找全局范围或全局变量，而是看着这个闭包盒子，说我找到了person变量。
    因为函数c内部没有function，当JavaScript引擎看到函数b会创建闭包，所有在c之外的变量，会被保存以便c使用。`,
    code: `function a(){
      let person = 'sam'
      return function b(){
      let hobby = 'plays basketball'
      return function c(){
      let degree = 'very well'
      return \`\${person} \${hobby} \${degree}\`
    }
    }
    }
    
    a()()() // sam plays basketball very well`
  }
];
db.posts.insert({
  name:'new post',
  info:'try it out',
  author:'me',
  content:'hahahahahah this is non',
  code:'asdnoasndioasndoaisndosand hohow'
})