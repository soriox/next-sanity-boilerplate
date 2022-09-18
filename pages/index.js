import Head from '../components/Head'
import Example from '../components/Example'

export default function Home() {
  return <>
    {/* The page name is the only required option for the head component */}
    <Head page="Home" />

    <Example />

  </>
}