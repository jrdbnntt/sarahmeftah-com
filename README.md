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

Add google cloud folder with static files to project root
```
ln -s  /mnt/hgfs/google_drive/Development/sarahmeftah-com cloud
```

## Building project
Build static files and images
```
npm run gulp
```

Run locally
```
npm run demo
```

Publish update (to github pages)
```
npm run deploy
```
