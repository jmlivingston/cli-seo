# cli-seo

**Integrate SEO with your favorite CLI or static site generator**

This project provides a barebones SEO integration with CLI projects like **<a target="_blank" title="create-react-app" href="https://github.com/facebookincubator/create-react-app">create-react-app</a>** and **<a target="_blank" title="angular-cli" href="https://github.com/angular/angular-cli">angular-cli</a>**. Both of these projects are excellent and will build a static site, but neither one provides a way to render meta tags. This means search engines like Google and Bing and social sites like LinkedIn, Facebook, Twitter, etc. won't be able to use them for indexing or sharing content appropriately.

## Installation

While you can install and run this project by itself, it is really meant to be integrated with other CLI tools that generate static sites. (See below)

```
npm install
```

## Running the project

```bash
npm run server-install
```

```bash
npm run start-deploy
```

## Integration with CLI projects 

The following are based on **<a target="_blank" title="create-react-app" href="https://github.com/facebookincubator/create-react-app">create-react-app</a>** or **<a target="_blank" title="angular-cli" href="https://github.com/angular/angular-cli">angular-cli</a>**, but you can use similar steps with other CLI projects or static site generators. Essentially anything that builds out an index.html and related minified and compressed files.

After creating your app using ```create-react-app``` or ```ng-new```, do the following:

- Copy the **server** directory
- Copy the **scripts** values from package.json
- Copy build.js
- Add the following to .gitignore:
  - /deploy
  - /server/node_modules
- Install fs-extra. (used by build.js to copy directories)

```npm install fs-extra --save-dev```

- To test bsaic routing, you can copy and paste the links in build\index.html
- Run the following scripts:
  - Both CLIs use the first one to build
  - The second two are for testing the Express app locally

```bash
npm run build
npm run server-install
npm run start-deploy
```

- If you just want to build, run the following:

```bash
npm run build
npmr run build-deploy
```

## File Structure

- **build.js** - This does two primary things
  - creates a deploy directory using files copied from the client build directory and server directory
  - updated the index.html file with placeholder meta tags. These get replaced using the custom SEO view engine (seoViewEngin.js) below.

> **Note**: I tailored this to handle **<a target="_blank" title="create-react-app" href="https://github.com/facebookincubator/create-react-app">create-react-app</a>** and **angular-cli**, but if you know which one you're using, remove the setup code at the top and just set the clientDir variable. **<a target="_blank" title="create-react-app" href="https://github.com/facebookincubator/create-react-app">create-react-app</a>** generates code in the **build** directory and **<a target="_blank" title="angular-cli" href="https://github.com/angular/angular-cli">angular-cli</a>** uses the **dist** directory.

- package.json - Three npm scripts are used by the project:
  - **build-deploy** - builds a deployment folder based on what the CLI generates and what is in the server folder.
  - **server-install** - used for installing server packages locally
  - **start-deploy** - builds and starts locally
- server - contains all server side code:
  - **app.js** - simple Express server which relies on a custom view engine (seoViewEngine.js) for rendering the meta tags. (Note: I kept this as minimal as possible. Consider <a target="_blank" title="Express Generator" href="https://expressjs.com/en/starter/generator.html">Express Generator</a> or <a target="_blank" title="Koa" href="http://koajs.com/">Koa</a> for something more sophisticated.)

> **Note**: You may need to tweak the **isStatic** method as necessary depending on the underlying tool you're using.

  - **seoViewEngine.js** - view engine for reading from file and the placeholder meta tags created by **build.js** above.

  > **Note** -  Currently this is based on a simple data file (seoData.js), but can be easily augmented to pull from a database or routing class. This is really where this gets interesting.

  - **seoData.js** - This contains a title prefix and then URL paths that specify meta data for each. All paths inherit from the default path, so they can override specific properties. Anything omitted will use the default property.

> **Very Important**: meta values specified in build.js must be provided by the seoViewEngine.js. I have included some of the more common ones, but you may need to add or remove as is necessary.

## Deployment

One you have build the project, deployment should be pretty straight-forward. The package.json includes a postinstall npm script and an engines configuration which you can tweak.

> **Heroku**: If you are using Heroku's awesome GitHub integration, you can simply push a subtree to your GitHub repository, and then use manual or automatic deployments. I typically use the following script which creates a **deploy** subtree which I can deploy with.

```bash
git subtree push --prefix dist origin deploy
```

## Testing

Testing SEO can often be tricky due to caching, but the following SEO Validators are very helpful. I would highly recommend validating some variable dummy paths first until you can get it right.

- [Facebook - Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Google - Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)
- [Twitter - Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn](https://www.linkedin.com) - LinkedIn is pretty awful for SEO developers. The only way you can check is through sharing directly and seeing the results. What is really frustrating is their aggressive caching policy. This means so you can't easily retest anything without waiting another week. It's best to test in the other three first and then you're likely to have it right.

## Client Side SEO

This project is focused on server side rendering of meta tags, but you may still need to update this on the client side if you're using a SPA, especially if you rely on sharing libraries that read the meta tags. Here is a simple code snippet you can use to update your meta tags.

```javascript
updateMetaTag(attribute, attributeValue, contentValue) {
  let htmlElement: document.querySelector('meta[' + attribute + '=\'' + attributeValue + '\']');
  if (!htmlElement) {
    htmlElement = document.createElement('meta');
    htmlElement.setAttribute(attribute, attributeValue);
    htmlElement.setAttribute('content', contentValue);
    document.head.appendChild(htmlElement);
  } else {
    htmlElement.setAttribute('content', contentValue);
  }
}
```

> **Note**: If you're using React, you might look into NFL's open source project <a target="_blank" title="react-helmet" href="https://github.com/nfl/react-helmet">react-helmet</a>
