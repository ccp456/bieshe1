import axios from 'axios'

export default {
  getCinema () {
    return axios({
      url: '/api/hall/getcinema',
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
  postNewCinema (data) {
    return axios({
      url: '/api/hall/postnewcinema',
      method: 'post',
      data
    })
  },
  postDel (data) {
    return axios({
      url: '/api/hall/delcinema',
      method: 'post',
      data
    })
  },
  postHall (data) {
    return axios({
      url: '/api/hall/posthall',
      method: 'post',
      data
    })
  }
}
