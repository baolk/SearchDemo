import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class index extends Component {
   //初始化状态
  state = {
    users:[],
    isFirst:true, //初次加载
    isLoading:false, //加载中
    isErr:false, //错误信息
  }

  //开启订阅
  componentDidMount(){
    this.token = PubSub.subscribe('change',(_,stateObj)=>{
      this.setState(stateObj)
    })
  }

  //
  componentWillUnmount(){
    PubSub.unsubscribe(this.token)  //关闭订阅
  }

  render() {
    const {users,isFirst,isLoading,isErr} =this.state
    return (
      <div className="row">
        {
          isFirst ? <h2>欢迎使用</h2>:
          isLoading?<h2>正在加载...</h2>:
          isErr?<h2>搜索失败...</h2>:
          users.map(userObj=>{
            return (
              <div key={userObj.id} className="card">
                  <a href={userObj.html_url} rel="noreferrer"  target="_blank">
                    <img alt="" src={userObj.avatar_url} style={{width: '100px'}}/>
                  </a>
                  <p className="card-text">{userObj.login}</p>
              </div>
            )
          })
        }
      </div>    
    )
  }
}
