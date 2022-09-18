import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'bikeshop',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: 'sanity-auth-token', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}

export const val = (val) => {
  return (val) ? val : "";
}

export const getComponent = (name) => {
  return new Promise((resolve) => {

    // Tweak query if needed or add more
    const query = '*[_type == "component" && name == $name] {name}'
    const params = {name: name}

    client.fetch(query, params).then((component) => resolve(component[0]))

  })
}

export const getDynamicSlugs = () => {
  return new Promise((resolve) => {

    // Tweak query if needed or add more
    const query = '*[ slug !="" ] {slug}'

    client.fetch(query).then((slugs) => resolve(slugs))

  })
}

export const getDynamicPage = (slug) => {
  return new Promise((resolve) => {

    // Tweak query if needed or add more
    const query = '*[_type == "page" && slug !=""] {slug}'
    const params = {slug: slug}

    client.fetch(query, params).then((page) => resolve(page[0]))

  })
}