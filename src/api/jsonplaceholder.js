const baseurl = "https://jsonplaceholder.typicode.com";

export async function getPosts() {
  const response = await fetch(`${baseurl}/posts`);
  const posts = await response.json();

  return posts;
}
