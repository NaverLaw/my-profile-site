import { motion } from "framer-motion";
import { auth, googleProvider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const loadUserProfile = async (userUID) => {
  try {
    const userDocRef = doc(db, "profiles", userUID);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("Profile not found!");
    }
  } catch (error) {
    console.error("Error loading profile:", error.message);
  }
};

const updateUserProfile = async (userUID, updatedData) => {
  try {
    const userDocRef = doc(db, "profiles", userUID);
    await updateDoc(userDocRef, updatedData);
    console.log("Profile updated!");
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
};

const viewUserProfile = async (userUID) => {
  try {
    const userDocRef = doc(db, "profiles", userUID);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data(); // Повертаємо дані профілю для перегляду
    } else {
      console.error("Profile not found!");
    }
  } catch (error) {
    console.error("Error viewing profile:", error.message);
  }
};

function Login() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if profile exists in Firestore
      const userDocRef = doc(db, "profiles", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If profile does not exist, create a new one
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          phone: "",
          contacts: [],
        });
        console.log("New profile created!");
      } else {
        console.log("Profile loaded:", userDoc.data());
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <motion.h1
        className="text-6xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Protect Your Data
      </motion.h1>
      <motion.button
        onClick={handleGoogleSignIn}
        className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Sign in with Google
      </motion.button>
    </div>
  );
}

export default Login;