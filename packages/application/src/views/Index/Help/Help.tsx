import React from 'react'
import './Help.css'
import Input from "../../../../../components/src/Input/Input"

export default function Help(props: any) {
  const helpRecommendedList = [
    {
      icon: '#icon-tongzhi',
      text: '配置你的 简单聊 通知',
      url: ''
    },
    {
      icon: '#icon-zhuangtai1',
      text: '设置你的 简单聊 状态和上线时间',
      url: ''
    },
    {
      icon: '#icon-piliangshedingyingyeshijian',
      text: '设置提醒',
      url: ''
    },
    {
      icon: '#icon-a-gaoxinghaoxinqingbiaoqingxihuanbiaoqingxiaolian',
      text: '使用表情回复',
      url: ''
    },
    {
      icon: '#icon-shipin',
      text: '简单聊 视频教程',
      url: ''
    },
  ]
  const { openStatus, closeHelp } = props
  return (
    <div className='help_container' style={{ display: openStatus ? 'flex' : 'none' }}>
      <div className="help_head">
        <div className="help_head_primary">
          <div className="help_head_title">帮助</div>
          <div className="close_help" onClick={() => closeHelp()}>
            <svg className='icon close_help_icon' aria-hidden='true'>
              <use xlinkHref='#icon-plus'></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="help_body">
        <div className="help_search_title">快速找到答案</div>
        <div className="help_search_container">
          <Input height={40} width="100%" placeholder="有什么可以帮你?" showIcon borderRadius={4} />
        </div>
        <div className="help_recommended">
          <div className="help_recommended_title">探索帮助主题</div>
          {
            helpRecommendedList.map((item, index) => (
              <div className="help_recommended_item" onClick={() => {
                console.log(index)
              }}>
                <div className="help_recommended_icon_container">
                  <svg className="icon help_recommended_icon" aria-hidden="true">
                    <use xlinkHref={item.icon}></use>
                  </svg>
                </div>
                <div className="help_recommended_text">
                  <strong>{item.text}</strong>
                </div>
              </div>
            ))
          }
        </div>
        <div className="help_footer_container">
          <div className='help_footer'>
            <div className='ask_for_help'>帮助请求</div>
            <div className='contact_us'>联系我们</div>
          </div>
        </div>
      </div>
    </div>
  )
}
