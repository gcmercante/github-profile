import { GetStaticPaths, GetStaticProps } from 'next'
import Profile from '../..'
import { useUserData } from '../../../../hooks/useUserData'

export default function Share() {
  const { user, repositories } = useUserData()

  return <Profile userData={user} repoData={repositories} />
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
