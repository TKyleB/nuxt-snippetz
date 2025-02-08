type Snippet = {
    id: string,
    created_at: string,
    updated_at: string,
    user_id: string,
    username: string,
    language: string,
    snippet_text: string,
    snippet_desc: string,
    snippet_title: string
}
type SnippetsResponse = {
    count: number
    next: string
    previous: string
    results: {
        snippets: Snippet[],
        languages: Record<string, number>
    }
}





