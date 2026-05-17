import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Welcome() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");

  // Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const features = [
    { icon: "📝", title: "Create & Organize", desc: "Write notes and organize them with smart categories" },
    { icon: "🔒", title: "Secure Access", desc: "Your notes are safe with JWT authentication" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f1e7]">
      
      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
          <div className="text-3xl group-hover:scale-110 transition transform">📝</div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            NotesApp
          </h1>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")}
            className="border-black hover:bg-black hover:text-white"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => navigate("/register")}
            className="bg-black hover:bg-gray-800"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Section 1: Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="bg-black/10 backdrop-blur-sm text-black px-5 py-2 rounded-full text-sm font-medium">
              ✨ Welcome to NotesApp
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
            Your Thoughts,
            <br />
            Organized Beautifully
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {greeting}! Create, organize, and access your notes from anywhere.
            Simple, fast, and beautifully designed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/register")}
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-lg"
            >
              Start Writing ✨
            </Button>
            <Button 
              onClick={() => navigate("/login")}
              size="lg"
              variant="outline"
              className="border-2 border-black hover:bg-black hover:text-white px-8 py-6 text-lg"
            >
              I Already Have an Account
            </Button>
          </div>
        </div>
      </div>

      {/* Section 2: Features Section (2 features only) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose NotesApp?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to manage your notes in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-[#efe7d6] border-none text-center p-6 hover:scale-105 transition cursor-pointer"
              onClick={() => navigate(index === 0 ? "/register" : "/login")}
            >
              <CardHeader>
                <div className="text-6xl mb-4">{feature.icon}</div>
                <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  {feature.desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="border-black hover:bg-black hover:text-white"
                >
                  {index === 0 ? "Get Started →" : "Learn More →"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-300 py-8 text-center text-gray-500">
        <div className="max-w-7xl mx-auto px-6">
          <p>&copy; 2026 NotesApp. All rights reserved. Made with ❤️ for note-takers.</p>
        </div>
      </footer>
    </div>
  );
}