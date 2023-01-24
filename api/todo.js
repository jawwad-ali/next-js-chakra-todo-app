import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// adding todo to the cloud firestore
const addTodo = async ({ userId, title, description, status }) => {
  try {
    await addDoc(collection(db, "todo"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      createdAt: new Date().getTime(),
    });
  } catch (err) {
    console.log(err);
  }
};

// Updating the todo status
const toggleTodoStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (docId) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef); 
  } catch (err) {
    console.log(err);
  }
};

export { addTodo, deleteTodo, toggleTodoStatus };
