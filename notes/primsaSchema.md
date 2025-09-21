
## @updatedAt

* `@updatedAt` is a **special Prisma attribute**.
* When you put it on a `DateTime` field, Prisma will **automatically update that column with the current timestamp whenever the row is updated**.

Example from your schema:

```prisma
updatedAt DateTime @updatedAt
```

This means:

* When you first insert a record → Prisma sets `updatedAt` to `now()`.
* When you later update that record (say, change the title of a bookmark) → Prisma automatically changes `updatedAt` to the new current time.
* You don’t need to set it manually in your code.

---

It looks repetitive (field name = `updatedAt`, attribute = `@updatedAt`), but they serve **different roles**:

* `updatedAt` (left side) → the **field/column name** in your model/database.
* `@updatedAt` (right side) → Prisma’s instruction to auto-update this field whenever the row changes.

You could call the field something else, like:

```prisma
lastModified DateTime @updatedAt
```

Here, the column name is `lastModified`, but Prisma still updates it automatically because of `@updatedAt`.

---

👉 So the `@updatedAt` is not a label, it’s a **directive** to Prisma.

