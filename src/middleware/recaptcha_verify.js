import axios from 'axios'

export default (secret) => (req, res, next) => {
  try {
    if (!req.body['g-recaptcha-response']) throw new Error('missing [g-recaptcha-response] param on payload')

    axios.post('https://www.google.com/recaptcha/api/siteverify', {
      secret,
      response: req.body['g-recaptcha-response']
    })
      .then((result) => {
        if (result.data['success']) {
          next()
        } else {
          res.status(400).json({
            success: false,
            result: 'recaptcha response is not success'
          })
        }
      })
      .catch(error => {
        res.status(400).json({
          success: false,
          result: error
        })
      })
  } catch (error) {
    return res.status(400).json({
      success: false,
      result: error.message
    })
  }
}
