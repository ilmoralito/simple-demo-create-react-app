import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  NavLink,
  useHistory,
} from "react-router-dom";
import styles from "./index.module.css";

export default function About() {
  const { url, path } = useRouteMatch();

  return (
    <div>
      <h1>About</h1>
      <nav style={{ width: "100%" }}>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <NavLink to={url} activeClassName={styles.active}>
              me
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to={`${url}/projects`} activeClassName={styles.active}>
              Projects
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to={`${url}/hobbies`} activeClassName={styles.active}>
              Hobbies
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={`${path}`} exact>
          <Me />
        </Route>
        <Route path={`${path}/projects`}>
          <Projects />
        </Route>
        <Route path={`${path}/hobbies`}>
          <Hobbies />
        </Route>
      </Switch>
    </div>
  );
}

function Me() {
  const history = useHistory();

  return (
    <div>
      <h2>Mi name is Mario</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At reiciendis
        quae modi aliquid suscipit cupiditate neque perspiciatis repellat minima
        dicta delectus explicabo, dolorum necessitatibus nemo facere harum
        incidunt quia animi?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At reiciendis
        quae modi aliquid suscipit cupiditate neque perspiciatis repellat minima
        dicta delectus explicabo, dolorum necessitatibus nemo facere harum
        incidunt quia animi?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At reiciendis
        quae modi aliquid suscipit cupiditate neque perspiciatis repellat minima
        dicta delectus explicabo, dolorum necessitatibus nemo facere harum
        incidunt quia animi?
      </p>

      <button onClick={() => history.push("/")}>Go home</button>
    </div>
  );
}

function Projects() {
  return (
    <div>
      <h2>Projects</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius accusamus
        laborum sapiente quod, omnis, dolorem pariatur quasi alias voluptatibus
        deleniti hic fuga. Vel magnam dolorem pariatur dolore quidem eum
        laudantium.
      </p>
    </div>
  );
}

function Hobbies() {
  return (
    <div>
      <h2>Hobbies</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum odit nemo
        id beatae, hic commodi debitis dolor libero consequatur sequi, molestiae
        dolorum. Iusto quibusdam non harum suscipit quasi neque repudiandae.
      </p>
    </div>
  );
}
