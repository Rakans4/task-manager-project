import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";


export type AuthFormProps = {
  onAuthSuccess: (token: string) => void;
};

const AuthForm = ({ onAuthSuccess }: AuthFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = `http://localhost:3000/api/auth/${isLogin ? "login" : "signup"}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      onAuthSuccess(data.token);
      toast.success("Success");
      alert("Authentication successful");
    } else {
      alert("Authentication failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-4">
      <h2 className="text-xl font-semibold text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <Input
        type="text"
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
      <Button type="button" variant="default" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Sign Up" : "Login"}
      </Button>
    </form>
  );
};

export default AuthForm;
