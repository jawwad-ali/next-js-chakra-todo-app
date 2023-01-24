import React from "react";
import {
  Box,
  Button,
  CheckboxGroup,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";

const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // getting user creds from google
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // Signed-in user info
        const user = result.user;
        user?.displayName;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <Box
      position={{base:"relative" , lg:"fixed"}}
      // top="5%"
      right={{ base: "0", lg: "2" }}
      top={{ base: "2", lg: "5%" }}
    >
      <Button onClick={() => toggleColorMode()}>
        {colorMode == "dark" ? <FaSun /> : <FaMoon />}
      </Button>

      {/* If user is logged in */}
      {isLoggedIn && (
        <>
          <Text color="green.500">{user?.email}</Text>
          <Link color="red.500" onClick={() => auth.signOut()}>
            Logout
          </Link>
        </>
      )}
      {!isLoggedIn && (
        <Button marginLeft="5" leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
          Login with Google
        </Button>
      )}
    </Box>
  );
};

export default Auth;
