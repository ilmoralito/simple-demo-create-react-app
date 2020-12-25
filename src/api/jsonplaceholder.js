const baseurl = "https://jsonplaceholder.typicode.com";

export async function getPosts() {
  const response = await fetch(`${baseurl}/posts`);

  return await response.json();
}
