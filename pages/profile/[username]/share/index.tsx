import { GetStaticPaths, GetStaticProps } from 'next'
import { Profile } from '../../../../components/Profile'
import { useUserData } from '../../../../hooks/useUserData'

export default function Share() {
  const { user } = useUserData()

  return <Profile userData={user} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, // 1 day
  }
}
