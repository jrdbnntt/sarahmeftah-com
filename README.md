Sarah Meftah's Personal Website
===============================
Built by Jared Bennett


## Project Setup

Install Node.js (`node`, `npm`), easiest method is using [nvm](https://github.com/nvm-sh/nvm).
```
nvm install --lts
```

Install system package dependencies for image processing:
```
sudo apt install imagemagick graphicsmagick
```

Then install local packages
```
npm install
```

## Building project
Normal static files
```
npm run gulp
```

Images
```
npm run gulp:img
```
```
npm run gulp:img:generate:cover
```

Run locally
```
npm run demo
```

Publish update (to github pages)
```
npm run deploy
```
