export const redirectTo = (type,header) => {
    let path
    if(type==='dashen'){
        //dashen 主界面
        path = '/home/dashen'
    } else {
        //laoban 主界面
        path = '/home/laoban'
    }
    if(!header){
        // 信息完善页面
        path += '-info'
    }
    return path
}
