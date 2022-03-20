import { Buffer } from 'buffer'
export const jsonFetcher = (url, method, body = null) => {
  const api = process.env.API_URL + '/' + url
  const credentials = Buffer(process.env.CREDENTIALS).toString('base64')

  const headers = {
    method: method,
    headers: {
      Authorization: `Basic ${credentials}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  const options = body
    ? {
        ...headers,
        body: JSON.stringify(body),
      }
    : {
        ...headers,
      }

  return fetch(api, options)
}
