import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

const SingleTodo = ({ todo, openHandler, deleteHandler, isDeleteLoading }) => {
  const [backgroundColor, setBackgroundColor] = useState("#F8F8F8"); // Default background color

  useEffect(() => {
    // Array of available background colors
    const backgroundColors = ["#FFECE4", "#F0EBFF", "#EAFFFE", "#FFF8EC", "#ECEFFE"];

    // Get a random index to pick a background color
    const randomIndex = Math.floor(Math.random() * backgroundColors.length);

    // Set the random background color
    setBackgroundColor(backgroundColors[randomIndex]);
  }, []); // The effect runs only once when the component mounts

  const getDateInMonthDay = (date) => {
    const d = new Date(date);
    const options = {
      month: "long",
      day: "numeric",
    };
    const n = d.toLocaleDateString("en-US", options);
    const replaced = n.replace(/,/g, " ");
    return replaced;
  };

  const styles = {
    container: {
      position: "relative",
      maxWidth: "300px",
      borderWidth: "1px",
      borderRadius: "8px",
      overflow: "hidden",
      padding: "16px",
      cursor: "pointer",
      backgroundColor: backgroundColor, // Use the state variable for background color
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "1.25rem",
      marginTop: "8px",
      marginBottom: "8px",
    },
    date: {
      position: "absolute",
      bottom: "8px",
      left: "8px",
      color: "#888",
      fontSize: "0.875rem",
    },
    hr: {
      margin: "8px 0",
      border: "none",
      borderBottom: "1px solid #EEE",
    },
    description: {
      color: "#333",
      fontSize: "0.875rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    deleteButton: {
      marginTop: "16px",
      fontSize: "0.875rem",
      color: "#4A4A4A",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    FaCheck: {
      marginBottom: "-0.2rem",
      margin: "0px 0.25rem",
    },
  };

  return (
    <div style={styles.container} onClick={() => openHandler(todo)}>
      <h2 style={styles.title}>{todo.title}</h2>
      <p style={styles.date}>{getDateInMonthDay(todo.dueDate)}</p>
      <hr style={styles.hr} />
      <p style={styles.description}>{todo.description}</p>
      <div style={styles.buttonContainer}>
        <button
          style={styles.deleteButton}
          onClick={(event) => {
            event.stopPropagation();
            deleteHandler(todo.id);
          }}
          disabled={isDeleteLoading}
        >
          <FaCheck style={styles.FaCheck} />
        </button>
      </div>
    </div>
  );
};

export default SingleTodo;
