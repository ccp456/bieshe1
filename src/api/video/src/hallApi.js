import axios from 'axios'

export default {
  getHall () {
    return axios({
      url: '/api/hall/gethall',
      method: 'get'
    })
  },
  postNewHall (data) {
    return axios({
      url: '/api/hall/newhall',
      method: 'post',
      data
    })
  },
  postDel (data) {
    return axios({
      url: '/api/hall/delhall',
      method: 'post',
      data
    })
  }
}
