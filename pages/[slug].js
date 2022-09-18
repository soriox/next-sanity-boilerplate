import {getDynamicSlugs, getDyanmicPage} from '../sanity'

export async function getStaticPaths() {

  // const slugs = await getDynamicSlugs();

  // Only these slugs will work
  const slugs = [
    {slug: "one"},
    {slug: "two"},
    {slug: "three"},
  ]
    
  return {
    paths: slugs.map((i) => ({ params: { slug: i.slug } })),
    fallback: false,
  }

}

export async function getStaticProps({params}) {
    
  // const data = await getDyanmicData(params.slug);

  const pageOptions = {
    page_title: "Next Sanity Boilerplate",
    description: "Dynamic page title",
    author: "John Doe",
    og_image: "/dynamic-og-image.jpg",
    theme_color: "#161a19",
  }

  return {
    props: { 
      slug: params.slug,
      title: pageOptions.page_title, 
      description: pageOptions.description, 
      author: pageOptions.author,
      og_image: pageOptions.ogimage,
      theme_color: pageOptions.theme_color,
    }
  }

}

export default function DynamicPage({slug}) {
  return <>
    {slug}
  </>
}