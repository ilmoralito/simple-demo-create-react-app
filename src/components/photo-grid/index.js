import React, { useEffect, useReducer } from "react";
import { getWindowWidth } from "../../helpers/collector";
import { formatPhotoUri, getList } from "../../api/picsum";
import { initialState, actionCreators, reducer } from "../../reducers/photos";

export function PhotoGrid({ numberOfColumns = 3 }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const width = getWindowWidth();
  const size = width / numberOfColumns;

  const { photos, nextPage, loading, error } = state;

  async function fetchPhotos() {
    dispatch(actionCreators.loading());

    try {
      const nextPhotos = await getList(nextPage);

      dispatch(actionCreators.success(nextPhotos, nextPage));
    } catch (error) {
      dispatch(actionCreators.failure());
    }
  }

  useEffect(() => fetchPhotos(), []);

  if (photos.length === 0) {
    if (loading) {
      return <p>Loading...</p>;
    }
  }

  if (error) {
    return <p>Failed to fetch photos</p>;
  }

  return (
    <ul>
      {photos.map((photo) => (
        <li key={1} style={{ width: size, height: size }}>
          <img src={formatPhotoUri(1, size, size)} alt="" />
        </li>
      ))}
    </ul>
  );
}
