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