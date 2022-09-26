import type { NextPage } from 'next'
import Head from 'next/head'
import {Header} from '../components'
import { Dashboard } from '../features/dashboard'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todolist challenge</title>
      </Head>

      <Header />
      <Dashboard />
    </>
  )
}

export default Home
