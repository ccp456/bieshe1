import axios from 'axios'

export default {
  getWatch () {
    return axios({
      url: '/api/watch/home',
      method: 'get'
    })
  }
}
