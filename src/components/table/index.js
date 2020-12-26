import React, { useEffect, useReducer, useState } from "react";
import dataset from "../../data/data.json";
import { initialState, actionCreators, reducer } from "../../reducers/table.js";
import usePrevious from "../../custom-hooks/usePrevious";
import isEqual from "lodash.isequal";

function Sort({ label, onSort }) {
  return (
    <th>
      <span onClick={() => onSort({ sortBy: label })}>{label}</span>
      <div>
        <button onClick={() => onSort({ sortBy: label, orderBy: "desc" })}>
          &#9650;
        </button>
        <button onClick={() => onSort({ sortBy: label, orderBy: "asc" })}>
          &#9660;
        </button>
      </div>
    </th>
  );
}

function Row({ id, title, year, publication_date: publicationDate, items }) {
  function handleClick(id) {
    alert(id);
  }

  return (
    <tr>
      <td>
        <button onClick={() => handleClick(id)}>Detail</button>
      </td>
      <td>{title}</td>
      <td>{year}</td>
      <td>{publicationDate}</td>
      <td>{items.join(", ")}</td>
    </tr>
  );
}

export default function Table() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSort({ sortBy, orderBy }) {
    orderBy =
      orderBy !== undefined
        ? orderBy
        : state.orderBy === "desc"
        ? "asc"
        : "desc";

    dispatch(actionCreators.sort({ sortBy, orderBy }));
  }

  useEffect(() => {
    dispatch(actionCreators.add(dataset));
  }, []);

  const deeply = usePrevious(state);

  useEffect(() => {
    if (!isEqual(deeply, state)) {
      dispatch(actionCreators.applySort());
    }
  }, [state, deeply]);

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            <Sort label="Title" onSort={handleSort} />
            <Sort label="Year" onSort={handleSort} />
            <Sort label="Publication date" onSort={handleSort} />
            <Sort label="Items" onSort={handleSort} />
          </tr>
        </thead>
        <tbody>
          {state.data.map((entry) => (
            <Row key={entry.id} {...entry} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
