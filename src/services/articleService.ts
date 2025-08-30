import fetch from 'node-fetch'
import { JSDOM } from 'jsdom' //JSDOM lets us create a simulated DOM (like a browser environment) from raw HTML
import { Readability } from '@mozilla/readability'// Readability is Mozilla’s library (used in Firefox Reader Mode) to extract article content


// 'Article' is only a TypeScript type, not a runtime value.
// When "verbatimModuleSyntax" is enabled, type-only imports must use "import type".
// Even though the file is Article.ts, we must import with a `.js` extension in ESM.
import type { Article } from "../interfaces/Article.js"; 

export async function fetchArticle(url: string): Promise<Article | null> {
    try {
        const res = await fetch(url)
        // ✅ .text() reads the full response body and converts it into a string of raw HTML
        const html = await res.text()

        // Create a virtual DOM from the HTML string.
        // First arg = HTML content, second arg = options object.
        // We pass { url } so relative links inside the HTML know the correct base URL.
        const dom = new JSDOM(html, { url }) 

        // ✅ Create a Readability instance, which needs a DOM Document to parse
        const reader = new Readability(dom.window.document)
        const article = reader.parse()

        // ✅ If parsing failed - return null
        if (!article) return null
        // Use nullish coalescing (??) so that missing values become null instead of undefined.
        return {
            url,
            title: article.title ?? null,
            content: article.content ?? null,
            textContent: article.textContent ?? null,
            excerpt: article.excerpt ?? null,
            length: article.length ?? null,
        }

    } catch (error) {
        console.error('Error fetching article:', error)
        return null
    }
}
