import axios from 'axios'

export default {
  postSell (data) {
    return axios({
      url: '/api/static/postsell',
      method: 'post',
      data
    })
  }
}
