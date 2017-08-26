## Thirsty for consumers
This reposity is for the Thirsty App for consumers

## Getting Started
1. Clone to your workspace.
2. Open in visual studio code or whatever terminal your using
3. Run these commands in the following order in the terminal
```bash
npm install
ionic cordova prepare
```
4. Run one of these commands to test locally in your browser. Some plugins may not work because of beening run in browser not on actual device.
```bash
ionic serve
ionic lab
```

## Basic Usage
1. Enviornment Variables 
I added the ability to have different setting depending on if we want to build for local, dev, prod. The setting exist in src/environments should be easy to tell which files are for which environments. To build for the different enviornments use these commands
 ```bash
npm run cordova:build:dev
npm run cordova:build:prod
//runs in browser with default settings
ionic serve
//runs in browser with dev settings
npm run ionic:serve:dev
//runs in browser with prod settings
npm run ionic:serve:prod
```

## Prerequisites
1. Make sure node.js is installed (https://nodejs.org/en/)
2. Once nodejs is installed run the following command in cmd
```bash
npm install -g cordova ionic
```
3. Install visual studio code (or some other editor) (https://code.visualstudio.com/download)
4. For android use make sure to install Android studio (https://developer.android.com/studio/index.html) make sure it exists on your main drive because you will need command line functions to work properly. (at least in my experience i needed to do that)


[Ionic Docs](http://ionicframework.com/docs/)