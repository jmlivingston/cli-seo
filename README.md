# cli-seo

This project provides a barebones SEO integration with CLI projects like <a target="_blank" title="create-react-app" href="https://github.com/facebookincubator/create-react-app">create-react-app</a> and <a target="_blank" title="angular-cli" href="https://github.com/angular/angular-cli">angular-cli</a>. Both of these projects are excellent and will build a static site, but neither one provides a way to render meta tags. This means search engines like Google and Bing and social sites like LinkedIn, Facebook, Twitter, etc. won't be able to use them for indexing or sharing content appropriately. This project provides some some patterns and code for getting this to work properly.

## Installation

> **Note** While you can install and run this project by itself, it is really meant to be integrated with other CLI tools that generate static sites. (See below)

```
npm install
```

---

## Running the project

```bash
npm run server-install
```

```bash
npm run start-deploy
```

---

## Integration and Running on CLI projects

The following are based on <a target="_blank" title="create-react-app" href="https://github.com/facebookincubator/create-react-app">create-react-app</a> or <a target="_blank" title="angular-cli" href="https://github.com/angular/angular-cli">angular-cli</a>, but you can use similar steps with other CLI projects or static site generators. Essentially anything that builds out an index.html and related minified and compressed files.

### Installing

After creating your using <a target="_blank" title="create-react-app" href="https://github.com/facebookincubator/create-react-app">create-react-app</a> or <a target="_blank" title="angular-cli" href="https://github.com/angular/angular-cli">angular-cli</a>, do the following:

- Copy the **server** directory
- Copy the **scripts** values from package.json
- Copy **build.js**
- Add the following to .gitignore:

```bash
/deploy
/server/node_modules
```

- Install fs-extra for coping directories.

```bash
npm install fs-extra --save-dev
```

- Optional - To test basic routing, copy and paste the links in build\index.html

### Running

- Run the following scripts. Both CLIs use the first for building. The second two are for testing the Express app locally.

```bash
npm run build
npm run server-install
npm run start-deploy
```

### Building

```bash
npm run build
npmr run build-deploy
```

---

## File Structure

---

### build.js

Creates a deploy directory using files copied from the client build directory and server directory

> **Attention** See notes in code. By default this handles either <a target="_blank" title="create-react-app" href="https://github.com/facebookincubator/create-react-app">create-react-app</a> or <a target="_blank" title="angular-cli" href="https://github.com/angular/angular-cli">angular-cli</a>, but this code should be removed if you know what you're using.

---

### package.json

Three npm scripts are used by the project:

1. **build-deploy** - creates a **deploy** folder and copies the CLI build folder and the server folder. This is your deployment package.
2. **server-install** - (optional) - installs server packages to test locally.
3. **start-deploy** - builds and starts locally. Run previous step if using this option.

---

### server directory

Contains all server side Express code:

**app.js** - Express server which relies on a custom view engine (seoViewEngine.js) for rendering the meta tags. (Note: I kept this as minimal as possible. Consider <a target="_blank" title="Express Generator" href="https://expressjs.com/en/starter/generator.html">Express Generator</a> or <a target="_blank" title="Koa" href="http://koajs.com/">Koa</a> for something more sophisticated.)

> **Note**: You may need to tweak the **isStatic** method as necessary depending on the underlying tool you're using.

**seoViewEngine.js** - custom Express view engine for reading from the **seoData.js** file and adding meta tags to index.html.

> **Note** -  If your SEO data is static, you could make this more performant by adding simple caching logic here.

**seoData.js** - This contains a title prefix and then URL paths that specify a title and meta properties for each. All paths inherit from the default path, so they can override or ignore specific properties.

---

## Deployment

One you have built the project, deployment should be pretty straight-forward. The package.json includes a postinstall npm script and an engines configuration which you can tweak.

> **Heroku**: If you are using Heroku's awesome GitHub integration, you can simply push a subtree to your GitHub repository, and then use manual or automatic deployments. I typically use the following script which creates a **deploy** subtree which I can deploy with.

```bash
git subtree push --prefix dist origin deploy
```

---

## Testing

Testing SEO can often be tricky due to caching, but the following SEO Validators are very helpful. I would highly recommend validating some variable dummy paths first until you can get it right.

- <a target="_blank" title="Facebook - Sharing Debugger" href="https://developers.facebook.com/tools/debug/">Facebook - Sharing Debugger"</a>
- <a target="_blank" title="Google - Structured Data Testing Tool" href="https://search.google.com/structured-data/testing-tool">Google - Structured Data Testing Tool</a>
- <a target="_blank" title="Twitter - Card Validator" href="https://cards-dev.twitter.com/validator">Twitter - Card Validator</a>
- <a target="_blank" title="LinkedIn" href="https://www.linkedin.com">LinkedIn</a> - LinkedIn is pretty awful for SEO developers from a testing perspective. The only way you can check is through sharing directly and seeing the results. What is really frustrating is their aggressive caching policy. This means you can't easily retest anything without waiting another week. It's best to test in the other three first and then you're likely to have it right.

---

## Client Side SEO

This project is focused on server side rendering of meta tags, but you still need to update this on the client side if you're using a SPA. You will want to update the title and may rely on sharing libraries that read the meta tags. Here are two code snippets for you can use to integrate with client side routing events.

> **Note** - Since this project does not handle this, you will notice in SPAS that the values don't update when changing the page. You can refresh the page to see the server rendered change.

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

updateTitle(title) {
    this.title.setTitle(title);
    let htmlElement: document.querySelector('meta[title]');
    if (!htmlElement) {
      htmlElement = document.createElement('meta');
      htmlElement.setAttribute('title', title);
    } else {
      htmlElement.setAttribute('title', title);
    }
  }
```

> **Note**: If you're using React, checkout NFL's open source project <a target="_blank" title="react-helmet" href="https://github.com/nfl/react-helmet">react-helmet</a>

---

## Screenshot

<img title="screenshot" src="https://firebasestorage.googleapis.com/v0/b/firebase-johnlivingston.appspot.com/o/blogImages%2Fcli-seo%2Fscreenshot.png?alt=media&token=69cbe323-9aa6-4e12-ab97-5e8d4ed80c3b" />

---

## Source Code

<div class="text-align-center">
<a class="button" target="_blank" title="cli-seo" href="https://github.com/jmlivingston/cli-seo">cli-seo</a>
</div>

### CLI Specific Examples

The following are two basic examples using **<a target="_blank" title="create-react-app" href="https://github.com/facebookincubator/create-react-app">create-react-app</a>** and **<a target="_blank" title="angular-cli" href="https://github.com/angular/angular-cli">angular-cli</a>**.

<div class="text-align-center">
<a  class="button" target="_blank" title="cli-seo-angular-cli" href="https://github.com/jmlivingston/cli-seo-angular-cli">cli-seo-angular-cli</a>

<a  class="button" target="_blank" title="cli-seo-create-react-app" href="https://github.com/jmlivingston/cli-seo-create-react-app">cli-seo-create-react-app</a>
</div>

---

## CLI Recommendations

There are many ways to handle SEO and if you'd prefer a server rendered or isomorphic app, you might check out <a target="_blank" title="Zeit Next" href="https://zeit.co/blog/next">Zeit Next</a> for React or <a target="_blank" title="Angular's Universal" href="https://github.com/angular/universal">Angular's Universal</a>. Both of these are great alternatives, though as of this date, neither integrates with the CLI platforms above.

I'd also recommend checking Angular's issue tracker and React's documentation for other recommendations. This project is similar to what you'll find in React's recommendation.

<a target="_blank" title="Angular CLI - SEO Guidance and/or Solution?" href="https://github.com/angular/angular-cli/issues/3013">
  Angular CLI - SEO Guidance and/or Solution?
</a>

<a target="_blank" title="React - Generating Dynamic Meta Tags on the Server" href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#generating-dynamic-meta-tags-on-the-server">
  React - Generating Dynamic Meta Tags on the Server
</a>
