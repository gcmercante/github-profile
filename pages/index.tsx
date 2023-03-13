import { GetServerSidePropsContext } from 'next'
import { redirectToLogin } from '../utils/auth'

export default function Home() {
  return <></>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  redirectToLogin(context)

  return { props: {} }
}
