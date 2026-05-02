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

 ## Questions
 what is dev in migrate?
 ```bash
  npx prisma migrate dev --name add_user_model
  ```


  ## What is Salting, JWT and Why they are needed

  These are great questions. Coming from a QA background, you’ve probably seen these terms in bug reports or network logs, but now you’re the one "building the vault." Let’s break it down simply.

---

### 1. What is "Signing"? (The Wax Seal Analogy)
In this context, **signing** does not mean encrypting. It means **authenticating**.

Imagine you write a letter (the data) and put it in an envelope. Before sending it, you pour hot wax on the back and press your unique ring into it (the **JWT Secret**).
* Anyone can open the envelope and read the letter (it’s public).
* However, if someone tries to change the words in the letter, they would have to break the wax seal.
* Since they don't have your specific ring, they can't reseal it. When the letter gets back to you, you see the seal is broken and know the data was tampered with.



[Image of Digital Signature process]


---

### 2. What is JWT and why is it public?
**JWT (JSON Web Token)** is just a string formatted in three parts: `Header.Payload.Signature`.

* **Why it’s public:** It is encoded in **Base64**, which is like translating English to Pig Latin. Anyone can "translate" it back.
* **The Rule:** Because it is public, **never** put sensitive info like a password or a phone number inside the payload. Only put non-sensitive identifiers like `userId`.
* **Example:**
    * **Payload:** `{ "userId": 123, "role": "admin" }`
    * **The Secret:** `my-super-secure-key-123`
    * **The Result:** A long string like `eyJhbGci...`

---

### 3. Why Salting? (The "Rainbow Table" Defense)
You’re right that it adds a string, but it’s more clever than just "tacking it on the end."

If two users use the password `password123`, the hash would normally be identical. Hackers have huge lists of pre-computed hashes called **Rainbow Tables**. They can look up a hash and instantly know the password is `password123`.

**Salting** adds a unique, random string to *each* user's password before hashing.
* **User A:** `password123` + `salt_xyz` = `Hash_ABC`
* **User B:** `password123` + `salt_abc` = `Hash_DEF`

Even though the passwords are the same, the hashes in your database look completely different. A hacker now has to guess the salt *and* the password for every single user individually.



---

### 4. What are we importing?
* **`bcrypt`**: A library that handles the heavy lifting of salting and hashing. It’s designed to be "slow" to make hacking expensive for the attacker's CPU.
* **`jsonwebtoken`**: The library that creates (signs) and verifies those digital "ID cards" we discussed.
* **`prisma`**: This is your **ORM (Object-Relational Mapper)**.
    * Think of Prisma as a **translator**. You write JavaScript/TypeScript code (`prisma.user.create`), and Prisma translates that into the complex SQL language that the database (PostgreSQL/MySQL) understands.
    * It also gives you "Autofill" (Intellisense) so you don't make typos in your table names.

---

### 5. Where does `JWT_SECRET` come from?
In your code, it says `process.env.JWT_SECRET`.

* This comes from an **Environment Variable**. You usually create a file named `.env` in your project root.
* **Why?** You never want to hardcode your "Secret Ring" (the key) in your code. If you push your code to GitHub, anyone could see it and start forging their own tokens to log into your app as an admin.
* The `|| 'your_jwt_secret_key'` part is just a "fallback" in case you forgot to set the variable, but you should never use that in a real app.

---

These are great questions. Coming from a QA background, you’ve probably seen these terms in bug reports or network logs, but now you’re the one "building the vault." Let’s break it down simply.

---

### 1. What is "Signing"? (The Wax Seal Analogy)
In this context, **signing** does not mean encrypting. It means **authenticating**.

Imagine you write a letter (the data) and put it in an envelope. Before sending it, you pour hot wax on the back and press your unique ring into it (the **JWT Secret**).
* Anyone can open the envelope and read the letter (it’s public).
* However, if someone tries to change the words in the letter, they would have to break the wax seal.
* Since they don't have your specific ring, they can't reseal it. When the letter gets back to you, you see the seal is broken and know the data was tampered with.



[Image of Digital Signature process]


---

### 2. What is JWT and why is it public?
**JWT (JSON Web Token)** is just a string formatted in three parts: `Header.Payload.Signature`.

* **Why it’s public:** It is encoded in **Base64**, which is like translating English to Pig Latin. Anyone can "translate" it back.
* **The Rule:** Because it is public, **never** put sensitive info like a password or a phone number inside the payload. Only put non-sensitive identifiers like `userId`.
* **Example:**
    * **Payload:** `{ "userId": 123, "role": "admin" }`
    * **The Secret:** `my-super-secure-key-123`
    * **The Result:** A long string like `eyJhbGci...`

---

### 3. Why Salting? (The "Rainbow Table" Defense)
You’re right that it adds a string, but it’s more clever than just "tacking it on the end."

If two users use the password `password123`, the hash would normally be identical. Hackers have huge lists of pre-computed hashes called **Rainbow Tables**. They can look up a hash and instantly know the password is `password123`.

**Salting** adds a unique, random string to *each* user's password before hashing.
* **User A:** `password123` + `salt_xyz` = `Hash_ABC`
* **User B:** `password123` + `salt_abc` = `Hash_DEF`

Even though the passwords are the same, the hashes in your database look completely different. A hacker now has to guess the salt *and* the password for every single user individually.



---

### 4. What are we importing?
* **`bcrypt`**: A library that handles the heavy lifting of salting and hashing. It’s designed to be "slow" to make hacking expensive for the attacker's CPU.
* **`jsonwebtoken`**: The library that creates (signs) and verifies those digital "ID cards" we discussed.
* **`prisma`**: This is your **ORM (Object-Relational Mapper)**.
    * Think of Prisma as a **translator**. You write JavaScript/TypeScript code (`prisma.user.create`), and Prisma translates that into the complex SQL language that the database (PostgreSQL/MySQL) understands.
    * It also gives you "Autofill" (Intellisense) so you don't make typos in your table names.

---

### 5. Where does `JWT_SECRET` come from?
In your code, it says `process.env.JWT_SECRET`.

* This comes from an **Environment Variable**. You usually create a file named `.env` in your project root.
* **Why?** You never want to hardcode your "Secret Ring" (the key) in your code. If you push your code to GitHub, anyone could see it and start forging their own tokens to log into your app as an admin.
* The `|| 'your_jwt_secret_key'` part is just a "fallback" in case you forgot to set the variable, but you should never use that in a real app.

---
