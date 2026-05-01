import { Post } from "@/types/post";

type JsonPlaceholderPost = {
  id: number;
  title: string;
  body: string;
};

const POSTS_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(POSTS_ENDPOINT);

  if (!response.ok) {
    throw new Error("Unable to fetch posts.");
  }

  const data = (await response.json()) as JsonPlaceholderPost[];
  return data.map((post) => ({
    id: post.id,
    title: post.title,
    subtitle: post.body,
  }));
}
