
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      // Redirect handled in the login function
    } catch (error) {
      toast.error("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="bg-maroon-700 inline-flex p-4 rounded-full mb-4">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-maroon-800">Benkyō</h1>
          <p className="text-muted-foreground mt-2">Your personal AI-powered learning companion</p>
        </div>
        
        <Card className="w-full border-maroon-300">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-maroon-700">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-maroon"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-maroon"
                />
              </div>
              
              {/* <div className="text-sm">
                <p className="text-muted-foreground">
                  For demo purposes, use:
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  student@example.com / staff@example.com / admin@example.com
                </p>
                <p className="text-xs text-muted-foreground">
                  with password: "password"
                </p>
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full bg-maroon-700 hover:bg-maroon-800 text-white" 
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>
              <div className="mt-4 text-sm text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-maroon-700 hover:underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
