## CHECKLIST
1. Create repo
  - README.md (top README)
  - git ignore (NODE)
  - MIT License

2. Github Actions
  - setup actions so that github performs tests when code is pushed to the repo
  - ensure continuous intergration/deployment
    - code will be signaled 'pass' or 'fail'
  - select Node.js workflow
    - create a 'filename'.is.yml file
    - ultimate creates a directory '.github/workflows'

3. build SCAFFOLD
  - `touch server.js`
  - `touch index.js`
  - `mkdir` handlers
    - function handlers
    - 404.js
    - 500.js
  - mkdir middleware
    - place to store middleware
  - mkdir `__tests__` in root folder
    - when using supertest/jest, targets this folder and looks for tests to run

4. create package.json
  - package.json provides meta information and lists dependencies
  - `npm init -y`
    - creates package.json
  - `cat package.json` shows contents
  - `npm install` packages

5. ACP to github

## TIPS
```
express@4.17.1
50 other packages installed 

4 = major update
17 = minor update
- with express (which we downloaded) 50 other packages were downloaded that express uses as well
- within the node module folder, you can click into express and you can see that express has its own package.json as well as its own dependencies
- node is all about a package ecosystem
```
