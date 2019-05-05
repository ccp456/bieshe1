import axios from 'axios'

export default {
  postSell () {
    return axios({
      url: '/api/static/postsell',
      method: 'post'
    })
  },
  getMovie (params) {
    return axios({
      url: '/api/static/postMovie',
      method: 'get',
      params: params
    })
  }
}
