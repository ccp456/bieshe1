import axios from 'axios'

export default {
  getmovie () {
    return axios({
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
  }
}
