import React from "react";
import { FaPlus } from "react-icons/fa";

const AddTodo = ({ addTodo }) => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: "#4A4A4A",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    plusIcon: {
      fontSize: "32px",
      color: "#FEFEFE",
    },
  };

  const handleAddTodo = () => {
    addTodo();
  };

  return (
    <div style={styles.container} onClick={handleAddTodo}>
      <FaPlus style={styles.plusIcon} />
    </div>
  );
};

export default AddTodo;
