import { getBeeHexImg } from "../Background/Beehex";
export const getChineseContent = () => {
  return (
    <div>
      <h5 className='blue-text'>学习经历:</h5>
   
      <p>迈阿密大学 公立常青藤之一</p>
      <p>交互研究 GPA:3.7</p>
      <p>主要研究方向: Web理论和技术研究</p>
      <p>相关技能: Web应用编程, Web交互编程, HCI理论和可用性, 网络安全, 电子商务</p>
      <br />
      <h5 className='blue-text'>腾讯云<i className="fab fa-qq"></i> - 前端开发工程师</h5>
      <div className='d-flex row'>
        <div className="col-md-12 mt-3">
          <p>
          目前负责腾讯云 Coding OA 版本的前端开发，Coding OA 版的目标是服务好腾讯云内部的代码研发体系建设、DevOps工具链建设，包含 CI/CD、自动化工具、项目管理、过程管理、制品管理、EP 度量等
          </p>
        </div>
       
       
      </div>
      <h5 className='blue-text'> BeeHex - 前端开发工程师</h5>
      <div className='d-flex row'>
        <div className="col-md-12">{getBeeHexImg()}</div>
        <div className="col-md-12 mt-3">
          <p>
            BeeHex 是一家 NASA 的子公司，利用食品行业最先进的 3D
            打印和机器人系统，使食品制备和个性化现代化。
          </p>
          <p>
            在4人团队中工作，职责主要集中在创建用户友好的Vue.js应用，前端性能优化，跨域测试防御攻击，安全支付，供客户可以在线购买我们的机器打印的饼干/蛋糕
          </p>
          <p>
            所负责项目与美国大型超市Target和沃尔玛合作，并且计划向全美开展业务
          </p>
          <p>负责使用AWS EC2云服务器并成功搭建了Nginx服务器来运行App</p>
          <p>
          公司核心项目附属于美国航天局NASA，并与美国陆军合作来为军人和宇航员制定营养计划
        </p>
        </div>
       
       
      </div>
    </div>
  );
};

export const getEnglishContent = () => {
  return (
    <div>
    
      <h5 className='blue-text'>Learning Experience:</h5>
      <p>Miami University  Public Ivies</p>
      <p>Bachelor of Art in Interactive Media Studies (STEM Major) GPA:3.7</p>
      <p>Major Concentration: Website Technology</p>
      <p>
        Relevant Skills: Web Application Programming, Web Interaction
        Programming, HCI theory and usability, Cyber Security, Digital Marketing
      </p>
      <br />
      <h5 className='blue-text'>Tencent Cloud<i className="fab fa-qq"></i> - Front end Engineer</h5>
      <div className='d-flex row'>
        <div className="col-md-12 mt-3">
          <p>
          Working towards the Tencent Cloud Coding OA version, the goal of Coding OA version is to serve Tencent Cloud's internal research and development system, DevOps toolchain construction, including CI/CD, automation tools, project management, process management, product management, EP metrics, etc.
          </p>
        </div>
       
       
      </div>
      <h5 className='blue-text'>BeeHex - Front end Engineer</h5>
      <div className="d-flex row">
        <div className="col-md-12">{getBeeHexImg()}</div>

        <div className="col-md-12 mt-3">
          <p>
            BeeHex is a NASA spin-off company modernizing food preparation and
            personalization with the most advanced 3D printing and robotics
            system in the food industry.
          </p>
          <p>
            Worked in a team of 4, my duty mainly focused on creating more user
            friendly and interactive Vue.js app, front end performance
            optimizing and CORS testing and preventing website attacks.
            Providing customers to purchase our machine printed cookie/cake
            online.
          </p>
          <p>
            Responsible for using AWS EC2 computing cloud and successfully
            creating the Nginx web server to run the application.
          </p>
          <p>
          This website project will be cooperating with Target and Walmart and
          our service will be nationwide in the future
        </p>
        <p>
          Company’s core project is NASA spin off project and we are working
          with US Army to create the personalized nutrition plans for the
          astronaut and soldiers.
        </p>
        </div>
        
      </div>
    </div>
  );
};
