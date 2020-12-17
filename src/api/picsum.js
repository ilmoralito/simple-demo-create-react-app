const BASE_URL = "https://picsum.photos";

export async function getList(page = 1) {
  const response = await fetch(`${BASE_URL}/v2/list?page=${page}`);
  const photos = await response.json();

  return photos;
}

export function formatPhotoUri(id, width, height) {
  return `${BASE_URL}/id/${id}/${Math.floor(width)}/${Math.floor(height)}`;
}
