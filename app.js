import ModelTest from "./test/modelTest"
import highReplyFormServiceTest from  './test/serviceTest/highReplyFormServiceTest'
import dntServiceTest from './test/serviceTest/dntServiceTest'
const SYSTEM_MODE_TEST = false;

App({

  /**
   * 全局数据存放此处
   */
  globalData: {
    myStaffAccount: ''
  },

  /**
   * 小程序启动完毕后触发
   * @param {启动参数} options 
   */
  onLaunch(options) {
    
    if(SYSTEM_MODE_TEST){
      // 测试
      dntServiceTest.test();
    }
    
    // 模拟登录，正式运行需注释！
    // if(options.query.staffAccount) this.globalData.myStaffAccount = options.query.staffAccount;

    // 从缓存读取token以及该用户所有信息存到globalData中
    dd.getStorage({
      key: 'userInfo',
      success: (userInfo) => {
        this.globalData.userInfo = userInfo;
      }
    });
    dd.getStorage({
      key: 'myStaffAccount',
      success: ({data: myStaffAccount}) => {
        if (myStaffAccount) this.globalData.myStaffAccount = myStaffAccount;
        else {
          // 第一次打开
          dd.redirectTo({
            url: '/pages/login/login'
          });
        }
      }
    });

  },

  /**
   * 页面显示完毕后触发
   * @param {启动参数} options 
   */
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  }
  
});
