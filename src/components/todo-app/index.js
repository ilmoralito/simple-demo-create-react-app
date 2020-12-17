import React, { useState, useReducer } from "react";
import Errors from "../commons/Errors";
import { hasEntries } from "../../helpers/collector";
import { initialState, actionCreators, reducer } from "../../reducers/todo-app";
import styles from "./index.module.scss";

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(task) {
    dispatch(actionCreators.add(task));
  }

  function handleDelete(id) {
    dispatch(actionCreators.remove(id));
  }

  function handleToggle(id) {
    dispatch(actionCreators.toggle(id));
  }

  function handleCancel(id) {
    dispatch(actionCreators.cancel(id));
  }

  function handleEdit(id) {
    dispatch(actionCreators.edit(id));
  }

  function handleConfirm({ id, task }) {
    dispatch(actionCreators.confirm(id, task));
  }

  return (
    <div className={styles.container}>
      <h1>Todo app</h1>
      <TodoForm onSbmit={handleSubmit} />
      <TodoList
        todos={state.items}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onCancel={handleCancel}
        onEdit={handleEdit}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

function TodoForm({ onSbmit }) {
  const [task, setTask] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const errorList = {};

    if (!task) {
      errorList.task = "Task is required";
    }

    if (hasEntries(errorList)) {
      setErrors(errorList);

      return;
    }

    onSbmit(task);

    setTask("");
  }

  return (
    <div>
      {hasEntries(errors) > 0 && <Errors errors={Object.values(errors)} />}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Add task"
            onChange={(event) => setTask(event.target.value)}
            value={task}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

function TodoList({ todos, onToggle, onDelete, onCancel, onEdit, onConfirm }) {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onCancel={onCancel}
          onEdit={onEdit}
          onConfirm={onConfirm}
        />
      ))}
    </ul>
  );
}

function Todo({
  id,
  title,
  done,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onCancel,
  onConfirm,
}) {
  const [task, setTask] = useState(title);

  function handleConfirm() {
    if (!task) {
      return;
    }

    onConfirm({ id, task });
  }

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
      ) : (
        <span style={{ textDecoration: done ? "line-through" : "" }}>
          {title}
        </span>
      )}

      <button onClick={() => onToggle(id)} disabled={isEditing}>
        Toggle
      </button>
      {isEditing ? (
        <div>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={() => onCancel(id)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => onEdit(id)} disabled={done}>
          Edit
        </button>
      )}
      <button onClick={() => onDelete(id)} disabled={done || isEditing}>
        Delete task
      </button>
    </li>
  );
}
