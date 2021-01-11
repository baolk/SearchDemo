import React, { Component} from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class index extends Component {
  search = ()=>{
    //获取用户的输入
    const {keyWordElement:{value:keyWord}} = this
    //发送请求前通知List更新状态
    PubSub.publish('change',{isFirst:false,isLoading:true})
    //https://api.github.com/search/users?q=xxxxxx

    ///////////1.发送网络请求------axios方法//////////
    axios.get(`/api1/search/users?q=${keyWord}`)
      .then(//请求成功后通知List更新状态
        res=>{
          PubSub.publish('change',{isFirst:false,isLoading:false,users:res.data.items})
        })
      //请求失败后通知List更新状态
      .catch((err)=>{
        PubSub.publish('change',{isLoading:false,isErr:true})
      })
    }

    //////////2.发送网络请求------fetch方法，使用时外面函数要加async/////////////
    //   fetch('url').then(
    //     response=>{
    //       console.log('联系服务器成功了');
    //       return response.json()
    //     }).then(
    //     response =>{
    //       console.log('获取数据成功了',response);
    //     }).catch(
    //     error=>{
    //       console.log(error)
    //     }
    //   )
    // }


  render() {
    return (
      <div>
        <section className="jumbotron">
          <h3 className="jumbotron-heading">搜索Github用户</h3>
          <div>
              <input ref={c=>this.keyWordElement=c} type="text" placeholder="输入关键词搜索"/>&nbsp;
              <button onClick={this.search}>搜索</button>
          </div>
        </section>
      </div>
    )
  }
}
