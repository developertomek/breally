import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Button from '../components/button'
import Layout from '../components/layout'
import { getPage, getPages, signNewsletter } from '../services/pages'
import styles from '../styles/Home.module.css'

export const getStaticProps = async () => {
  const pages = await getPages()
  const home = pages.find((el) => el.url == '/')
  const page = await getPage(home.id)

  return {
    props: { pages, page },
  }
}

export default function Home({ pages, page }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState()
  const [isSigned, setIsSigned] = useState(false)
  const [error, setError] = useState(false)

  const handleInput = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await signNewsletter(email)
    setMessage((await response.json()).message)
    if (response.ok) {
      setIsSigned(true)
      setError(false)
    } else {
      setError(true)
      setIsSigned(false)
    }
  }

  return (
    <Layout pages={pages}>
      <div className={styles.container}>
        <Head>
          <title>Breally - home</title>
          <meta name="description" content="next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {page.sections.map((section) => (
            <section
              key={section.type}
              className={`${styles[section.type]} ${styles.section}`}
            >
              <div className={styles.section_content}>
                <div className={`${styles[section.type + '_content']}`}>
                  {section.text && (
                    <p className={`${styles[section.type + '_text']}`}>
                      {section.text}
                    </p>
                  )}
                  {section.img && (
                    <div className={styles.hero_img_box}>
                      <img src={section.img} />
                    </div>
                  )}
                  {section.author && (
                    <>
                      <img
                        className={styles.quotation_mark}
                        src="/img/quotation-mark.svg"
                      />
                      <p className={styles.author}>{section.author}</p>
                    </>
                  )}
                  {section.type === 'newsletter' && (
                    <>
                      <p id="contact" className={styles.newsletter_text}>
                        Sign up for Newsletter
                      </p>
                      <form className={styles.newsletter_form}>
                        <input
                          className={styles.newsletter_input}
                          onChange={handleInput}
                          placeholder="Type your email"
                        />
                        <Button onClick={handleSubmit}>Submit</Button>
                      </form>
                      {isSigned && (
                        <p className={styles.thank_you_for_signin}>{message}</p>
                      )}
                      {error && <p className={styles.error}>{message}</p>}
                    </>
                  )}
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>
    </Layout>
  )
}
