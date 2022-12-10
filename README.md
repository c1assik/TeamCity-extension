# How to build

### Before build project set NODE_OPTIONS variable
Linux and macOS (Windows Git Bash)
```
export NODE_OPTIONS=--openssl-legacy-provider
````
Windows command prompt
```
set NODE_OPTIONS=--openssl-legacy-provider
```

Windows PowerShell
```
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```

## Build project
1. install all the dependencies
```
$ npm install
```

2. Build in production mode
```
$ npm run build
```

3. Build in development mode
```
$ npm run dev
```

