This is the "Big Four" of backend architecture.
---

### 1. `routes/` (The Front Door / Receptionist)
**The Job:** To define which URL leads to which logic. 
*   **Analogy:** The signage in a building. "If you want to Save a Link, go to Room 302."
*   **QA View:** This is what you see in your Swagger docs or Postman. 
*   **Example:**
    `router.post('/save-bookmark', BookmarkController.create);`

### 2. `middleware/` (The Security Guard / Inspector)
**The Job:** To check the request **before** it hits the main logic. This is where your JWT verification lives!
*   **Analogy:** The bouncer at a club checking your ID (the token) and your bag (the data) before letting you in.
*   **QA View:** This is where we catch "401 Unauthorized" or "403 Forbidden" errors.
*   **Example:**
    `router.post('/save-bookmark', verifyJWT, BookmarkController.create);`
    *(Here, `verifyJWT` is the middleware).*

### 3. `controllers/` (The Floor Manager)
**The Job:** To handle the Request and Response (`req`, `res`). The controller doesn't know *how* to save to a database; it just knows how to talk to the user.
*   **Analogy:** A waiter. They take your order (Request), give it to the kitchen (Service), and bring you your food (Response).
*   **Tasks:** 
    *   Pulling the `userId` out of the JWT.
    *   Grabbing the `url` from the request body.
    *   Sending back a `200 OK` or a `500 Error`.

### 4. `services/` (The Specialist / The Kitchen)
**The Job:** This is where the "Heavy Lifting" or "Business Logic" happens. This is where you put your Prisma calls or your Web Scraper code.
*   **Analogy:** The chef. They don't care who the customer is; they just know how to take a raw URL and turn it into a Bookmark in the database.
*   **Why separate it?** So you can use the same logic in different places. You might want to "Scrape a Title" when a user adds a link via the Web App *and* via a Mobile App.

---



### The Flow Example
Imagine Alex clicks **"Save Bookmark."**

1.  **`routes/`**: Sees a `POST` request to `/bookmarks`. It hands it off to the...
2.  **`middleware/`**: Checks the JWT. Is the signature valid? (The "Math" we discussed). Yes? Proceed to the...
3.  **`controllers/`**: The controller says: "Okay, I see Alex (ID: 99) wants to save `google.com`. Hey **Service**, can you handle the details?"
4.  **`services/`**: The service runs the **Web Scraper**, gets the title "Google," and uses **Prisma** to save it to the database.
5.  **`controllers/`**: The service tells the controller "Done!" and the controller sends a `201 Created` message back to Alex's screen.

---

When you were testing, you might have found a bug like: *"The app crashes when I save a dead link."*
*   If the crash is in the **Route**, the URL is wrong.
*   If the crash is in the **Middleware**, the Auth logic is broken.
*   If the crash is in the **Service**, the Scraper or Database code has a bug.

