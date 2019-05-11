import axios from 'axios'

export default {
  importData (data) {
    return axios({
      data,
      url: '/api/video/importData',
      method: 'post'
    })
  },
  getmovie (params) {
    return axios({
      params: params,
      url: '/api/video/getmovie',
      method: 'get'
    })
  },
  getHall () {
    return axios({
      url: '/api/video/gethall',
      method: 'get'
    })
  },
  mname () {
    return axios({
      url: '/api/video/mname',
      method: 'get'
    })
  },
  postMovie (data) {
    return axios({
      url: '/api/video/newmovie',
      method: 'post',
      data
    })
  },
  postDel (data) {
    return axios({
      url: '/api/video/dele',
      method: 'post',
      data
    })
  },
  changeStatus (data) {
    return axios({
      url: '/api/video/changestatus',
      method: 'post',
      data
    })
  }
}
