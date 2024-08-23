import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {}

const baseUrl = import.meta.env.VITE_API_BASE_UR;

const LoginForm: React.FC<LoginFormProps> = () => {
  const [userName, setUserName] = useState<string>("cuzawzawmyint");
  const [password, setPassword] = useState<string>("111111");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl + "/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        // Handle successful login (e.g., redirect, show message)
        alert("Login successful");
        navigate("/");
        localStorage.setItem("currentUser", JSON.stringify(userName));
      } else {
        // Handle login failure
        const errorText = await response.text();
        setError(errorText);
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full sm:w-1/5">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
