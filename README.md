# Slick's Slices GatsbyJS

From WesBos's Master Gatsby course



## Gatsby

Everything has to go through Gatsby so it can decide what to serve when

`gatsby develop` for hot reloading dev server

`gatsby clean` to remove cache - very aggressive cache that can corrupt



### Pages and routing

- Add page file for each page
  - Just a react component
  - Don't capitalize file - not reusable component
- Add `<Nav>` under components
  - Use Gatsby `<Link>` tags similar to React-Router `<Link>`

### Layout

- Add Layout component with permanent elements nav, footer etc.

- Create Gatsby file `gatsby-browser.js` in project root

  - Special function `wrapPageElements`

    - ```react
      export function wrapPageElement({ element, props }) {            
      	return <Layout {...props}>{element}</Layout>;             
      }    
      ```

    - Automatically wraps every page

- Copy contents (or import function) into `gatsby-ssr.js` also in root to handle server side rendering

### Styles

- Can add styles to `gatsby-browser.js`
- Can use CSS modules https://github.com/css-modules/css-modules
- Can use Styled Components https://styled-components.com/
  - can import css/svg/anything to javascript files: Gatsby knows not to render out to javascript but to the correct type
  - vs just referencing from assets: would go in static and Gatsby wouldn't know about it
  - `GlobalStyle` for global styles
  - Otherwise make components root element a styled component, and everything inside just select within styled component

### Sanity - Headless CMS

- Headless - no front-end
- `sanity init` / `sanity init --reconfigure`
- Sanity studio https://www.sanity.io/docs/overview-customization
  - Create schemas for each content type
  - Can create custom components to customize inputs - `components/PriceInput.js`

### Data queries

- Graphql
- `Gatsby-config.js`  stores metadata and plugin data
  - `gatsby-source-sanity`
    - token > process.env.TOKEN `import dotenv from 'dotenv'`
- `sanity graphql deploy $DATASET`  -> gives sanity query playground url



#### Gatsby queries

- Page queries
  - can be dynamic with variables
  - can only be run on a top level page
    - Export from page: queried automatically on build and passed as props to component
    - Fragments exported from sanity
- Don't have to do any loading checking, pre-built similar to SSR so data will always be there
- Static queries
  - can not be dynamic, no variables can be passed in
  - can be run anywhere: e.g. a component
  - 

## Images

Images are hard on the internet and can make a website really slow. Gatsby handles them for you to make them easy

- too big
- not compressed
- width/height problems
- wrong format
- poor loading performance



Need something to process the images.

- can source your images from your files through `sharp` : long build times
- Services that handle it for you on demand
  - Sanity Image Pipeline
  - Cloudinary
  - Imgix

GraphQl data fetching:

```ql
 image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
}
```

`<Img>` tag in a component

```react
import Img from 'gatsby-image';

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        {/* <Img fixed={pizza.image.asset.fixed} alt={pizza.name} /> */}
      </Link>
    </div>
  );
}
```

## Gatsby Node

- `gatsby-node.js` gives plugins/site builders APIs for controlling the GraphQL data layer
- e.g. `createPages` async function with params `graphql` and `actions`
- dynamically query graphql for each page

#### Data from external APIs

`sourceNodes` function in Gatsby-node

can then query like any other data from Gatsby graphql

## Pagination

`<Pagination>` reusable component for nav links

Pages created on build

- `env` var `GATSBY_PAGE_SIZE` for elements per page
- query `totalCount`, calculate number of pages and create them
- dynamically query data with `skip` and `limit` params in graphql query to have each page in component



## React-Helmet

For SEO/head/meta HTML data

Can stick a helmet anywhere and it will go up to head

Create reusable SEO component with sensible defaults --> `gatsby-config.js` React-Helmet plugin

If don't specify a title will use the previous page's title

## Maintaining state

Gatsby unmounts/remounts on leaving pages. To persist state across nav events have to attach it to highest Gatsby element

`wrapRootElement` in `gatsby-browser.js`



## Serverless  functions

similar to running a node server, but just does one thing then shuts itself down

can host serverless functions anywhere -> netlify -> AWS Lambda

`functions/` dir with config in `netflify.toml` both in project root

can `npm init` for a package.json for each function

`nodemailer` for sending emails. can use sendgrid, postmark or ethereal.email for testing



## Create honeypot for bots

field that regular people don't fill out -> instead of captcha

hide the input but not just with hidden attribute

class name display none



## Settings page - one off

Can configure in Sanity schema

Add sidebar.js to only allow access to a particular settings page



Data fetched through Gatsby graphql is only fetched at build time

If you want to fetch client-side: directly from sanity

`sanity graphql list` gives the url to graphql database

Sanity GraphQL not the same as Gatsby GraphQL

Custom gatsby hook to fetch the data