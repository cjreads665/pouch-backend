export interface Article {
  url: string;
  title: string | null;
  excerpt: string | null;
  textContent: string | null;
  content: string | null;  // Cleaned HTML
  length: number | null;
}
