import type { AppProps } from 'next/app'

import Template from '@/layouts/template'
import '../styles/globals.css'
import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Template>
      <Component {...pageProps} />
    </Template>
  )
}

export default MyApp
