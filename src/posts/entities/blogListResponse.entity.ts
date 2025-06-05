export class PostListItem {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    authorImage?: string;
    category: string;
    tags: string[];
    date: string;
}

export class BlogListResponse {
    posts: PostListItem[];
    totalPages: number;
    currentPage: number;
}
