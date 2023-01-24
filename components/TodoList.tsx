import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<[]>([]);
  const { user } = useAuth();
  const toast = useToast();

  const refreshData = () => {
    if (!user) {
      setTodos([]);
    }
  };

  //   Query to display todos to associated user
  const q = query(collection(db, "todo"), where("user", "==", user?.uid));
  onSnapshot(q, (querySnapShot) => {
    let ar:any = [];
    querySnapShot.docs.forEach((doc) => {
      ar.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setTodos(ar);
  });

  useEffect(() => {
    refreshData();
  }, []);

  //   Function for del todo
  const handleDeleteTodo = async (id: number) => {
    if (confirm("Are you sure you want to delete todo?")) {
      deleteTodo(id);
      toast({
        title: "Todo deleted",
        status: "success",
      });
    }
  };

  const handleToggle = async (id: number, status: string) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    await toggleTodoStatus({
      docId: id,
      status: newStatus,
    });

    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus == "completed" ? "success" : "warning",
    });
  };

  return (
    <Box mt="5">
      <SimpleGrid columns={{ base: 1, md: 2 , lg:3 }} spacing={8}>
        {todos &&
          todos.map((todo: Todo) => (
            <Box
              p="3"
              boxShadow={"2xl"}
              // shadow="dark-lg"
              transition={"0.2s"}
              _hover={{ boxShadow: "Sm" }}
            >
              <Heading as="h3" fontSize="xl">
                {todo?.title} {/* delete todo badge */}
                <Badge
                  color="red.500"
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <FaTrash />
                </Badge>
                {/* Complete status badge */}
                <Badge
                  color={todo.status == "pending" ? "gray.500" : "green.500"}
                  bg="inherit"
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleToggle(todo.id, todo.status)}
                >
                  {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                </Badge>
                <Badge
                  float="right"
                  opacity="0.8"
                  bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                >
                  {todo.status}
                </Badge>
              </Heading>
              <Text mt="5">{todo.description}</Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default TodoList;
