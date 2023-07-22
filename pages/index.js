import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ManageTodo from "../components/ManageTodo";
import Navbar from "../components/Navbar";
import SingleTodo from "../components/SingleTodo";
import AddTodo from "../components/AddTodo";
import { supabaseClient } from "../lib/client";

const Home = () => {
  const initialRef = useRef();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const user = supabaseClient.auth.user();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      supabaseClient
        .from("todos")
        .select("*")
        .eq("user_id", user?.id)
        .order("id", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setTodos(data);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    const todoListener = supabaseClient
      .from("todos")
      .on("*", (payload) => {
        if (payload.eventType !== "DELETE") {
          const newTodo = payload.new;
          setTodos((oldTodos) => {
            const exists = oldTodos.find((todo) => todo.id === newTodo.id);
            let newTodos;
            if (exists) {
              const oldTodoIndex = oldTodos.findIndex(
                (obj) => obj.id === newTodo.id
              );
              oldTodos[oldTodoIndex] = newTodo;
              newTodos = oldTodos;
            } else {
              newTodos = [...oldTodos, newTodo];
            }
            newTodos.sort((a, b) => b.id - a.id);
            return newTodos;
          });
        }
      })
      .subscribe();

    return () => {
      todoListener.unsubscribe();
    };
  }, []);

  const openHandler = (clickedTodo) => {
    setTodo(clickedTodo);
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const addTodoHandler = () => {
    setTodo(null);
    setIsOpen(true);
  };

  const deleteHandler = async (todoId) => {
    setIsDeleteLoading(true);
    const { error } = await supabaseClient
      .from("todos")
      .delete()
      .eq("id", todoId);
    if (!error) {
      setTodos(todos.filter((todo) => todo.id !== todoId));
    }
    setIsDeleteLoading(false);
  };

  return (
    <div style={{ backgroundColor: "#252525", minHeight: "100vh" }}>
      <Head>
        <title>TodoApp</title>
        <meta
          name="description"
          content="Awesome todoapp to store your awesome todos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar onOpen={() => setIsOpen(true)} />
        <ManageTodo
          isOpen={isOpen}
          onClose={closeHandler}
          initialRef={initialRef}
          todo={todo}
          setTodo={setTodo}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
            margin: "10px",
          }}
        >
          <div>
            {/* The AddTodo component is rendered only once */}
            <AddTodo addTodo={addTodoHandler} />
          </div>
          {todos.map((todo, index) => (
            <div key={index}>
              {/* The SingleTodo component is rendered for each todo */}
              <SingleTodo
                todo={todo}
                openHandler={openHandler}
                deleteHandler={deleteHandler}
                isDeleteLoading={isDeleteLoading}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
