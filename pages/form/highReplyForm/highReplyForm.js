import {curSection, sections, formStructure} from "./config";
import Form from "../form";


Page({

  /**
   * 页面数据
   */
  data: {
    isTagsShow: false,    //顶部标题是否展开状态
    switchIcon: '/statics/icons/switch_arrow_down.png',    //顶部标题箭头按钮
    headTitle: '小节名称',    //标题显示的小节名称
    sections: sections,    //section列表
    curSection: curSection,    //当前section
    submitValues: formStructure,    //页面填写的数据
    PDP: {},    //path组件返回的接电点数据
    POC: {},    //path组件返回的分界点数据
  },

  /**
   * 页面加载完成后运行
   */
  onLoad(query) {
    Form.formPageInit(this);
    //从服务器读取表单数据
    
  },

  /**
   * 页面关闭，缓存信息
   */
  onUnload() {
    
  },
  
  /**
   * 头部标签展开/折叠
   */
  switchTags () {
    Form.switchTags(this);
  },

  /**
   * 切换section页面
   */
  changeSection (e) {
    Form.changeSection(this, e);
  },

  /**
   * 输入框输入文字时触发
   */
  bindKeyInput (e) {
    Form.bindKeyInput(this, e);
  },

  /**
   * 选项改变时触发
   */
  bindPickerChange (e) {
    Form.bindPickerChange(this, e);
  },

  /**
   * 日期选择
   */
  onDatePick (e) {
    Form.onDatePick(this, e);
  },

  /**
   * 点击图片添加按钮时触发
   */
  addImage (e) {
    Form.addImage(this, e);
  },
  
  /**
   * 点击提交按钮触发
   */
  onSubmit () {
    //要询问是否确定提交
    const submitValues = this._formatData(this.data.submitValues);
    manager.submit(submitValues);
    dd.navigateBack();
  },
  _formatData (fromValues) {   //表单数据格式化为可用格式

  let baseInfo = [];
  for(let item of fromValues.baseInfo) {
    baseInfo.push({
      name: item.name,
      value: item.value
    });
  }
  let usePower = [];
  for(let item of fromValues.usePower) {
    usePower.push({
      name: item.name,
      value: item.value
    });
  }
  let applyCapa = [];
  for(let item of fromValues.applyCapa) {
    applyCapa.push({
      name: item.name,
      value: item.value
    });
  }
  let equipment = [];
  for(let item of fromValues.equipment) {
    let list = [];
    for(let element of item.value) {
      let tmp = {};
      for(let i of element) {
        tmp[i.name] = i.value;
      }
      list.push(tmp);
    }
    equipment.push({
      applyNo: baseInfo[0].value,
      name: item.name,
      value: list
    });
  }
  let images = [];
  for(let item of fromValues.images) {
    images.push({
      name: item.name,
      value: item.value
    });
  }
  let note = [];
  for(let item of fromValues.note) {
    note.push({
      name: item.name,
      value: item.value
    });
  }

  const toValues = {
    baseInfo: baseInfo,
    usePower: usePower,
    applyCapa: applyCapa,
    equipment: equipment,
    images: images,
    note: note
  };

  return toValues;

},

  /**
   * 点击重置按钮触发
   */
  onReset () {
    Form.onReset(this);
  }

});