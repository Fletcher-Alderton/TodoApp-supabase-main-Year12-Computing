import React, { useEffect, useState } from "react";
import { supabaseClient } from "../lib/client";

const ManageTodo = ({ isOpen, onClose, initialRef, todo, setTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDueDate(todo.dueDate);
    }
  }, [todo]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (description.length <= 10) {
      setErrorMessage("Description must have more than 10 characters");
      return;
    }
    setIsLoading(true);
    const user = supabaseClient.auth.user();
    let supabaseError;
    if (todo) {
      const { error } = await supabaseClient
        .from("todos")
        .update({ title, description, dueDate, user_id: user.id })
        .eq("id", todo.id);
      supabaseError = error;
    } else {
      const { error } = await supabaseClient
        .from("todos")
        .insert([{ title, description, dueDate, user_id: user.id }]);
      supabaseError = error;
    }

    setIsLoading(false);
    if (supabaseError) {
      setErrorMessage(supabaseError.message);
    } else {
      closeHandler();
    }
  };

  const closeHandler = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setTodo(null);
    onClose();
  };

  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
    backgroundColor: "#252525",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
  };

  const backdropStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 9998,
  };

  return (
    <div>
      {isOpen && (
        <div>
          <div style={backdropStyles} onClick={closeHandler} />
          <div style={modalStyles}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center",
                color: "#FEFEFE",
              }}
            >
              {todo ? "Update Todo" : "Add Todo"}
            </h1>
            {errorMessage && (
              <div
                style={{
                  color: "red",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </div>
            )}
            <form onSubmit={submitHandler}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="title"
                  style={{
                    color: "#FEFEFE",
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Add your title here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    color: "#FEFEFE",
                    border: "none",
                    outline: "none",
                    backgroundColor: "#4A4A4A",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    color: "#FEFEFE",
                  }}
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Add your description here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    color: "#FEFEFE",
                    border: "none",
                    outline: "none",
                    backgroundColor: "#4A4A4A",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    color: "#FEFEFE",
                  }}
                  htmlFor="dueDate"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    color: "#FEFEFE",
                    border: "none",
                    outline: "none",
                    backgroundColor: "#4A4A4A",
                  }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: "120px",
                    padding: "6px",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    backgroundColor: "#3B82F6",
                    color: "#FEFEFE",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={closeHandler}
                  type="button"
                  disabled={isLoading}
                  style={{
                    width: "120px",
                    padding: "6px",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    marginTop: "1rem",
                    marginLeft: "2.5rem",
                    backgroundColor: "#EF4444",
                    color: "#FEFEFE",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTodo;
