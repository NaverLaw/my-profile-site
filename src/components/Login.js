import { motion } from "framer-motion";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
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
        onClick={signInWithGoogle}
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