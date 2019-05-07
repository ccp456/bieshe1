import axios from 'axios'

export default {
  getmovie (param) {
    return axios({
      param: param,
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
