import {val, getDynamicSlugs, getDynamicPage} from '../sanity'

export async function getStaticPaths() {

  const slugs = await getDynamicSlugs();
    
  return {
    paths: slugs.map((i) => ({ params: { slug: i.slug } })),
    fallback: false,
  }

}

export async function getStaticProps({params}) {
    
  const data = await getDynamicPage(params.slug);

  return {
    props: { 
      slug: params.slug,
      title: val(data.page_title), 
      description: val(data.description), 
      author: val(data.author),
      og_image: val(data.ogimage),
      theme_color: val(data.theme_color),
    }
  }

}

export default function DynamicPage({slug}) {
  return <>
    {slug}
  </>
}