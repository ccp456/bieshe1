import axios from 'axios'

export default {
  getReview () {
    return axios({
      url: '/api/craw/review',
      method: 'get'
    })
  }
}
