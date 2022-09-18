# NextJS & Sanity Client Boilerplate

A NextJS and Sanity Client boilerplate project for React websites. Created with 'create-next-app', this project was meant to ease the use of Sanity's client and api within React while adding SEO features from NextJS.

This project also uses Sass by default

[Check out the demo here](https://next-sanity-boilerplate.vercel.app/)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Getting Started

First, install required dependencies for NextJS:

```bash
npm install
# or
yarn install
```

Navigate to the 'studio' folder and do the same there

```bash
cd studio && npm install
# or
cd studio && yarn install
```

Next, edit the sanity.js file found in the project root. Add your details to the client object in this file:

```javascript

import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'bikeshop',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: 'sanity-auth-token', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data

...

```

Read more about the Sanity API options [here](https://www.sanity.io/docs/js-client#api)

Install the Sanity CLI if not already installed:

```bash
npm install -g @sanity/cli
```

Then switch to the 'studio' folder and initialize Sanity. This will prompt you to sign in if you are not already. It should also detect a Sanity Studio project allow you to reconfigure it with your project's details (without erasing the boilerplate schema).

```bash
sanity init
```

## Loading demo data

To load in the boilerplate data you will need to do so via the CLI. In the 'studio' folder enter the command below. If your target dataset is not "production", change it to the name of your dataset. 

```bash
sanity dataset import boilerplate.ndjson production
```

## Development and Testing

Once the project is setup, you can run the NextJS development server in the project root:

```bash
npm dev
# or
yarn dev
```

To start the Sanity Studio, navigate to the 'studio' folder in a separate command prompt and start sanity:

```bash
sanity start
```

To change your site's default data, navigate to /components/Head.js and edit the "siteOptions" object to set your website's default site information.

```javascript

import NextHead from 'next/head';

// Default and fallback site information
const siteOptions = {
    language: "en_US",
    type: "website",
    site_title: "Next Sanity Boilerplate",
    favicon: "/favicon.ico",
    description: "Default site description",
    author: "John Doe",
    og_image: "/og-image.jpg",
    theme_color: "#161a19",
    url: "https://example.com/",
    site_name: "example.com",
}

...

```

# Sanity Functions

To ease the use of Sanity's client we've also included some functions that specific to the React and NextJS workflow. All of this code is based on the [schemas I have created]().

### ::val (value)

Used to parse values that may be looked for but not present in objects returned from Sanity

```javascript
const unparsed = "";
const parseValue = val(unparsed)
```

### ::getComponent (name)

Get page component based on the name of the component that you sent in Sanity. You can see how this is used in the [Example.js](https://github.com/soriox/next-sanity-boilerplate/blob/main/components/Example.js). This is best used with React's [useState](https://reactjs.org/docs/hooks-state.html) and [useEffect](https://reactjs.org/docs/hooks-effect.html) hooks.

```javascript

const [data, setData] = useState(false);

useEffect(() => {
  getComponent().then((component) => setData(component))
}, [])


```


### ::getDynamicSlugs ()

Gets all documents from Sanity containing the "slug" field. This should be used ONLY with NextJS's [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths). You can see how this is used in the [[slug].js file]().

```javascript

export async function getStaticPaths() {

  const slugs = await getDynamicSlugs();
    
  return {
    paths: slugs.map((i) => ({ params: { slug: i.slug } })),
    fallback: false,
  }

}

```


### ::getDynamicPage (slug)

Gets page data based on the slug. Meant for pages with dynamic slugs. This should be used in combination with [getDynamicSlugs](), [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths), and [getStaticProps])(https://nextjs.org/docs/basic-features/data-fetching/get-static-props).

```javascript
 
export async function getStaticProps({params}) {
    
  const data = await getDynamicPage(params.slug);

  return {
    props: { 
      slug: params.slug,
      title: data.page_title, 
      description: data.description, 
      author: data.author,
      og_image: data.ogimage,
      theme_color: data.theme_color,
    }
  }

}

```

