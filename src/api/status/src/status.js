import axios from 'axios'

export default {
  postSell () {
    return axios({
      url: '/api/static/postsell',
      method: 'post'
    })
  }
}
