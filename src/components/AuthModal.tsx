import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom"; // Correct import here

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Hardcoded test credentials
  const testEmail = "test@test.com";
  const testPassword = "123";

  // Use navigate from React Router to redirect after successful login
  const navigate = useNavigate(); // Correct hook usage

  const handleSignInWithEmail = () => {
    if (email === testEmail && password === testPassword) {
      alert("Logged in successfully!");
      onClose(); // Close the modal on successful login

      // Redirect to the checkout page
      navigate("/checkout");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-xl font-semibold">
            Sign In to Proceed
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-600">
            You need to sign in to proceed with checkout.
          </Dialog.Description>
          <div className="mt-6">
            <button
              onClick={() => alert("Sign In with Google")}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Sign In with Google
            </button>
            <div className="mt-4">
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-full mt-2 px-4 py-2 border rounded-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-600 mt-2">{errorMessage}</p>
              )}
              <button
                onClick={handleSignInWithEmail}
                className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900"
              >
                Sign In with Email
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthModal;
