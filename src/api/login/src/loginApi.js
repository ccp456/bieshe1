import axios from 'axios'

export default {
  login (data) {
    return axios({
      url: '/api/users/login',
      method: 'post',
      data
    })
  }
}
