var Event = require('bcore/event');
var $ = require('jquery');
var _ = require('lodash');
//var Chart = require('XXX');

/**
 * 马良基础类
 */
module.exports = Event.extend(function Base(container, config) {
  this.config = {
    theme: {}
  }
  this.container = $(container);           //容器
  this.apis = config.apis;                 //hook一定要有
  this._data = null;                       //数据
  this.chart = null;                       //图表
  this.init(config);
}, {
  /**
   * 公有初始化
   */
  init: function (config) {
    //1.初始化,合并配置
    this.mergeConfig(config);
    //2.刷新布局,针对有子组件的组件 可有可无
    this.updateLayout();
    //3.子组件实例化
    //this.chart = new Chart(this.container[0], this.config);
    //4.如果有需要, 更新样式
    this.updateStyle();
  },
  /**
   * 绘制
   * @param data
   * @param options 不一定有
   * !!注意: 第二个参数支持config, 就不需要updateOptions这个方法了
   */
  render: function (data, config) {
    data = this.data(data);
    console.log(data);
    let that = this;
    var cfg = this.mergeConfig(config);
    var bg = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/456c2d2d61bcfa3bcf8a80ba03a72ff5.png";
    var hover = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/4f731bb1dbd15240dc42fcebe5860175.png"

    var html=`<div class="account_prt" style="height:300px;"><ul style="clear:both">`
        

    for (var i = 0; i < data.length; i++) { 
      var icon = "";
      var background = "";
      if(data[i]["type"] === 1){
        icon = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/affaa2bdc2fe61e28f970daac8af6c30.png"
        background = bg
      }
      else if(data[i]["type"] === 2){
        icon = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/df51dbd3066fb260d32c51f05a9eabcf.png"
        background = hover
      }
      else if(data[i]["type"] === 3){
        icon = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/db315c6cf286d36ae182aadaa1d5d240.png"
        background = hover
      }else{
        icon = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/ad1ce4145817072d083b8fcc038cb2c5.png"
        background = hover
      }

      html += `<li style="width:282px;height:133px;cursor:pointer;float:left;margin-top:20px;margin-left:20px;list-style:none;position:relative;background-image:url('${background}')">
        <p style="text-align:center;margin-top:20px;">
        <img style="width:38px;height:32px;position:absolute;left:70px;top:20px;" src="${icon}" />
        ${data[i]["typeName"]}</p>
        <p style="margin-top:38px;text-align:center;">${data[i]["accountCount"]}</p>
      </li>`
    }
    
    html+=`</ul></div>` 

    html += `<div class="user_prt" style="margin-top:22px;height:300px;">
    <ul style="clear:both">`
    for (var i = 0; i < data.length; i++) { 
      var icon = "";
      var background = "";
      if(data[i]["type"] === 1){
        icon = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/affaa2bdc2fe61e28f970daac8af6c30.png"
        background = bg
      }
      else if(data[i]["type"] === 2){
        icon = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/df51dbd3066fb260d32c51f05a9eabcf.png"
        background = hover
      }
      else if(data[i]["type"] === 3){
        icon = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/db315c6cf286d36ae182aadaa1d5d240.png"
        background = hover
      }else{
        icon = "http://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/ad1ce4145817072d083b8fcc038cb2c5.png"
        background = hover
      }

      html += `<li style="width:282px;height:133px;cursor:pointer;float:left;margin-top:20px;margin-left:20px;list-style:none;position:relative;background-image:url('${background}')">
        <p style="text-align:center;margin-top:20px;">
        <img style="width:38px;height:32px;position:absolute;left:70px;top:20px;" src="${icon}" />
        ${data[i]["typeName"]}</p>
        <p style="margin-top:38px;text-align:center;">${data[i]["fansCount"]}</p>
      </li>`
    }
    html+=`</ul></div>` 

    //更新图表
    //this.chart.render(data, cfg);
    this.container.html(html);
    // this.container.find(".prt ul li").css({
    // })

    $(".account_prt ul li").click(function(){
      console.log($(this))
      $(this).css({"background-image":"url('"+bg+"')"});
      $(this).siblings("li").css({"background-image":"url('"+hover+"')"});

      var Index = $(this).index();
      $(".user_prt ul li")[Index].style.backgroundImage="url('"+bg+"')";
      $($(".user_prt ul li")[Index]).siblings("li").css({"background-image":"url('"+hover+"')"});
      console.log(111111111111)
      that.emit('click', {id:Index}); 

    })

    $(".user_prt ul li").click(function(){
      console.log($(this))
      $(this).css({"background-image":"url('"+bg+"')"});
      $(this).siblings("li").css({"background-image":"url('"+hover+"')"});

      var Index = $(this).index();
      $(".account_prt ul li")[Index].style.backgroundImage="url('"+bg+"')";
      $($(".account_prt ul li")[Index]).siblings("li").css({"background-image":"url('"+hover+"')"});

      that.emit('click', {id:Index}); 

    })
    //如果有需要的话,更新样式
    this.updateStyle();
  },
  /**
   *
   * @param width
   * @param height
   */
  resize: function (width, height) {
    this.updateLayout(width, height);
    //更新图表
    //this.chart.render({
    //  width: width,
    //  height: height
    //})
  },
  /**
   * 每个组件根据自身需要,从主题中获取颜色 覆盖到自身配置的颜色中.
   * 暂时可以不填内容
   */
  setColors: function () {
    //比如
    //var cfg = this.config;
    //cfg.color = cfg.theme.series[0] || cfg.color;
  },
  /**
   * 数据,设置和获取数据
   * @param data
   * @returns {*|number}
   */
  data: function (data) {
    if (data) {
      this._data = data;
    }
    return this._data;
  },
  /**
   * 更新配置
   * 优先级: config.colors > config.theme > this.config.theme > this.config.colors
   * [注] 有数组的配置一定要替换
   * @param config
   * @private
   */
  mergeConfig: function (config) {
    if (!config) {return this.config}
    this.config.theme = _.defaultsDeep(config.theme || {}, this.config.theme);
    this.setColors();
    this.config = _.defaultsDeep(config || {}, this.config);
    return this.config;
  },
  /**
   * 更新布局
   * 可有可无
   */
  updateLayout: function () {},
  /**
   * 更新样式
   * 有些子组件控制不到的,但是需要控制改变的,在这里实现
   */
  updateStyle: function () {
    var cfg = this.config;
    this.container.css({
      'font-size': cfg.size + 'px',
      'color': cfg.color || '#fff'
    });
  },
  /**
   * 更新配置
   * !!注意:如果render支持第二个参数options, 那updateOptions不是必须的
   */
  //updateOptions: function (options) {},
  /**
   * 更新某些配置
   * 给可以增量更新配置的组件用
   */
  //updateXXX: function () {},
  /**
   * 销毁组件
   */
   destroy: function(){console.log('请实现 destroy 方法')}
});