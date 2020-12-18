import React, { useEffect, useReducer } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { getPosts } from "../../api/jsonplaceholder";
import { actionCreators, initialState, reducer } from "../../reducers/posts";
import styles from "./index.module.scss";
import ThemedButton from "../commons/themed-button";

export default function Posts() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const match = useRouteMatch();

  useEffect(() => {
    async function fetchPosts() {
      dispatch(actionCreators.loading());

      try {
        const posts = await getPosts();

        dispatch(actionCreators.success(posts));
      } catch (error) {
        dispatch(actionCreators.failure());
      }
    }

    fetchPosts();
  }, []);

  function handleFilter(filterText) {
    dispatch(actionCreators.filter(filterText));
  }

  const { posts, loading, error } = state;

  const postList = posts.filter((post) =>
    post.title.toLowerCase().includes(state.filterText)
  );

  if (loading) {
    return <p>Is loading...</p>;
  }

  if (error) {
    return <p>Failed to load posts</p>;
  }

  return (
    <div>
      <h1>
        Posts {postList.length}/{posts.length}
      </h1>
      <ThemedButton>Click me to toggle the theme</ThemedButton>
      <div style={{ display: "flex" }}>
        <div>
          <FilterPosts filterText={state.filterText} onFilter={handleFilter} />
          <ul>
            {postList.map((post) => (
              <li key={post.id} className={styles.post}>
                {post.title} <Link to={`${match.url}/${post.id}`}>Detail</Link>
              </li>
            ))}
          </ul>
        </div>
        <Switch>
          <Route
            path={`${match.url}/:id`}
            render={({ match }) => {
              const post = posts.find((post) => post.id === +match.params.id);

              return <Post {...post} />;
            }}
          ></Route>
        </Switch>
      </div>
    </div>
  );
}

function FilterPosts({ filterText, onFilter }) {
  return (
    <input
      type="text"
      onChange={(event) => onFilter(event.target.value)}
      value={filterText}
    />
  );
}

function Post({ id, userId, title, body }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>ID</td>
          <td>{id}</td>
        </tr>
        <tr>
          <td>User ID</td>
          <td>{userId}</td>
        </tr>
        <tr>
          <td>Title</td>
          <td>{title}</td>
        </tr>
        <tr>
          <td>Body</td>
          <td>{body}</td>
        </tr>
      </tbody>
    </table>
  );
}
