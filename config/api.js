const http = uni.$u.http
// post请求，获取菜单
export const sda = (params, config = {}) => http.get('/wx/user/login', params, config)

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const auth = (data) => http.post('wx/user/postAuth', data)
export const getcategory = (data) => http.get('wx/other/getcategory',data)
export const getswiper = (data) => http.get('wx/other/getswiper',data)
//首页获取商店列表
export const getshop = (data) => http.get('wx/other/getshop',data)
export const getshopbyid = (data) => http.get('wx/other/getshopbyid',data)


export const postorder = (data) => http.post('/wx/other/postorder', data)

export const hotlist = (data) => http.get('/wx/other/hotlist', data)
export const search = (data) => http.get('/wx/other/search', data)

export const getorderunsuccess = (data) => http.get('/wx/other/getorderunsuccess', data)
export const getordersuccess = (data) => http.get('/wx/other/getordersuccess', data)
export const delorder = (data) => http.get('/wx/other/delorder', data)