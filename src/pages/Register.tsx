import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    setError("");
    setLoading(true);

    try {
      await api.post("register/", { username, email, password });
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f1e7] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#efe7d6] border-none shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">Create Account</CardTitle>
          <CardDescription>Join NotesApp and start managing your notes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm text-center">
              ⚠️ {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#f6f1e7] border-[#ddd2bc]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#f6f1e7] border-[#ddd2bc]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#f6f1e7] border-[#ddd2bc]"
            />
          </div>
          <Button onClick={registerUser} disabled={loading} className="w-full bg-black hover:bg-gray-800">
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/" className="font-semibold text-black hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}