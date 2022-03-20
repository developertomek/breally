import { jsonFetcher } from '../utils'

export const getPages = async () => {
  return (await jsonFetcher('pages', 'GET')).json()
}

export const getPage = async (id) => {
  return (await jsonFetcher('page/' + id, 'GET')).json()
}

export const signNewsletter = async (email) => {
  return await jsonFetcher('newsletter', 'POST', { email: email })
}
