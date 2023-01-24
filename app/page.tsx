"use client";
import { Inter } from "@next/font/google";
import { Box, Button, Flex } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Container maxW="7xl" marginBottom={5}>
        <Auth />
        <AddTodo />
        <TodoList />
      </Container>
    </>
  );
}
