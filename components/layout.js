import Link from 'next/link'
import styles from '../styles/Layout.module.css'
import Button from './button'

export default function Layout({ children, pages }) {
  const handleClick = (e) => {}

  const converUrlToName = (url) => {
    let name = url.substring(1)
    return name ? name[0].toUpperCase() + name.substring(1) : ''
  }

  return (
    <>
      <nav className={styles.navigation}>
        <img src="/img/logo.svg" className={styles.logo} />
        <div className={styles.navigation_links}>
          {pages.map((page) => (
            <Link href={page.url} key={page.id}>
              <a className={styles.navigation_link}>
                {converUrlToName(page.url)}
              </a>
            </Link>
          ))}
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault()
            window.location.replace('/#contact')
          }}
        >
          Contact us
        </Button>
      </nav>
      <main className="">{children}</main>
    </>
  )
}
