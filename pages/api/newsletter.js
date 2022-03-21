import { signNewsletter } from '../../services/pages'

export default async (req, res) => {
  switch (req.method) {
    case 'POST': {
      try {
        let reqBody = JSON.parse(req.body)
        let response = await signNewsletter(reqBody.email)
        let { message } = await response.json()

        res.status(200).json({ message, ok: response.ok })
      } catch (error) {
        console.log(error)
      }
      break
    }
    default:
      res.status(400)
  }
}
