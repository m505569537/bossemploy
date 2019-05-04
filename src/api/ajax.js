//封装axios
//通过在package.json中配置 proxy代理，修改axios请求的路径

import axios from 'axios'

export default function ajax (url, data={}, type='GET'){
    if(type==='GET'){
        //url后面可能还会带有查询字符串，所以要拼串
        let paramStr = ''
        //Object.keys()方法可以将一个对象中的属性抽离出来组成一个数组
        Object.keys(data).forEach( item => {
            paramStr += item + '=' + data[item] + '&'
        })
        //最后面会多一个 &
        if(paramStr){
            paramStr = paramStr.substring(0,paramStr.length-1)
        }
        return axios.get('/api' + url + '?' + paramStr)
    } else {
        return axios.post('/api' + url, data)
    }
}