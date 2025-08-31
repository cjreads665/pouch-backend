If we **don’t set `"moduleResolution": "nodenext"`**, here’s what happens:

---

### ❌ Without `"moduleResolution": "nodenext"`

* TypeScript defaults to `"node"` resolution (CommonJS style).

* That means it expects imports like:

  ```ts
  import express = require("express");
  ```

  instead of:

  ```ts
  import express from "express";
  ```

* With ESM (`"module": "nodenext"`), TypeScript enforces **file extensions in imports** (e.g., `import "./server.js"` after build). Without `nodenext`, it won’t resolve correctly for ESM-style imports.

* You’ll often hit errors like:

  ```
  Cannot find module './server' or its corresponding type declarations
  ```

  or

  ```
  ERR_UNKNOWN_FILE_EXTENSION: Unknown file extension ".ts"
  ```

* In short:

  * `module: nodenext` → says “we are using ESM modules”.
  * `moduleResolution: nodenext` → teaches TS how to resolve imports in ESM-land (with `.ts`/`.js` handling correctly).

---

Here’s the updated **`LEARNINGS.md`** section I’d add:

---

## 🔍 Why `"moduleResolution": "nodenext"` Matters

* Without it, TypeScript assumes **CommonJS resolution** and fails to find modules when using modern ESM-style imports.
* You’ll get errors like:

  * `Cannot find module './x'`
  * `Unknown file extension ".ts"`
* Setting it ensures:

  * ESM imports (`import express from "express"`) work.
  * TypeScript correctly maps `.ts` → `.js` after build.
  * Node.js can run the compiled code without import resolution issues.

✅ Always pair:

```json
"module": "nodenext",
"moduleResolution": "nodenext"
```
---

## 🚀 Why We Need `ts-node-esm`

- By default, **Node.js** doesn’t understand `.ts` files.  
- `ts-node` lets us run TypeScript directly **without building** (`tsc`) each time.  

### The Problem
If you try running with just:
```bash
npx ts-node src/server.ts
```
and your project uses **ESM** (`"module": "nodenext"`), you’ll likely hit:
```
ERR_UNKNOWN_FILE_EXTENSION: Unknown file extension ".ts"
```

### The Fix
Use `ts-node-esm`, which is specifically built for **ESM projects**:
```bash
npx ts-node-esm src/server.ts
```

This ensures:
- TypeScript files run in ESM mode.
- Imports work correctly with `.ts` and `.js` resolution rules.
- You can keep using modern syntax like:
  ```ts
  import express from "express";
  ```

### Bonus: With `nodemon`
In `nodemon.json`:
```json
{
  "watch": ["src"],
  "ext": "ts,js",
  "exec": "ts-node-esm src/server.ts"
}
```

This gives you **auto-reload + ESM + TypeScript** without pre-compiling.  


# Prisma
Prisma is an ORM which is basically a layer that allows us to create, manage and manipulate data base. It allows us to do that using methods instead of writing raw SQL queries.
 We can create tables, edit them using the prisma schema.
 So when you make any change in schema file for prisma, we can run migrations which will modify the tables/database as per the format you have given i nthe schema file.