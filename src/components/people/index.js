import React, { useEffect, useReducer, useState } from "react";
import { initialState, actionCreators, reducer } from "../../reducers/people";
import {
  getPeople,
  getPerson,
  postPerson,
  updatePerson,
} from "../../api/people";
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
// @ts-ignore
import styles from "./index.module.scss";

function PersonForm({ handleSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    if (!firstName || !lastName) {
      alert("First name and last name are requireds");
    }

    handleSubmit({ firstName, lastName });

    setFirstName("");
    setLastName("");
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

function Person() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();

  useEffect(() => {
    async function fetchPerson() {
      try {
        dispatch(actionCreators.loading());

        const person = await getPerson(params.id);

        // set local state
        setFirstName(person.firstName);
        setLastName(person.lastName);

        // add custom property
        person.isEditing = false;

        dispatch(actionCreators.successFetchingPerson(person));
      } catch (error) {
        dispatch(actionCreators.failure());
      }
    }

    fetchPerson();
  }, [params.id]);

  /**
   *
   * @param {number} id
   */
  function handleEdit(id) {
    dispatch(actionCreators.edit(id));
  }

  /**
   *
   * @param {number} id
   */
  function handleCancel(id) {
    dispatch(actionCreators.cancel(id));
  }

  /**
   *
   * @param {number} id
   */
  async function handleUpdate(id) {
    const person = await updatePerson({ id, firstName, lastName });

    dispatch(actionCreators.update(person));
  }

  const { person } = state;

  return (
    <div>
      <h1>Person</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>First name</strong>
            </td>
            <td>
              {person.isEditing ? (
                <input
                  type="text"
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                />
              ) : (
                person.firstName
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Last name</strong>
            </td>
            <td>
              {person.isEditing ? (
                <input
                  type="text"
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                />
              ) : (
                person.lastName
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {person.isEditing ? (
        <div>
          <button onClick={() => handleCancel(person.id)}>Cancel</button>
          <button onClick={() => handleUpdate(person.id)}>Update</button>
        </div>
      ) : (
        <button onClick={() => handleEdit(person.id)}>Edit</button>
      )}
    </div>
  );
}

export default function People() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const match = useRouteMatch();

  useEffect(() => {
    async function init() {
      dispatch(actionCreators.loading());

      try {
        const people = await getPeople();

        dispatch(actionCreators.success(people));
      } catch (error) {
        dispatch(actionCreators.failure());
      }
    }

    init();
  }, []);

  /**
   *
   * @param {Object} payload
   */
  async function handlePostPerson(payload) {
    const person = await postPerson(payload);

    dispatch(actionCreators.add(person));
  }

  const { people, loading, error } = state;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>People</h1>
        <ul>
          {people._embedded.people.map((person, index) => (
            <li key={index}>
              <Link to={`${match.path}/${person.id}`}>
                {person.firstName} {person.lastName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Switch>
          <Route path={`${match.url}/:id`}>
            <Person />
          </Route>
        </Switch>
      </div>

      <div>
        <PersonForm handleSubmit={handlePostPerson} />
      </div>
    </div>
  );
}
