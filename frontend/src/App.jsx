import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";


function App() {
  return (
    <BrowserRouter>
      {/* Navbar - Clean Dark Theme */}
      <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center">
              <div className="w-8 h-8 bg-white rounded mr-3 flex items-center justify-center">
                <span className="text-black font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-semibold text-white">
                Aether
              </span>
            </NavLink>

            {/* Navigation */}
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white text-sm font-medium"
                      : "text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white text-sm font-medium"
                      : "text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  }
                >
                  For Developers
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Copyright />
    </BrowserRouter>
  );
}

// Landing Page
function Landing() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              AI-Powered Technical
              <br />
              <span className="text-gray-300">Recruitment Platform</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Rethink how hiring works in the AI era. Connect exceptional developers with innovative companies through intelligent matching and seamless recruitment workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <NavLink
                to="/signup"
                className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-100 transition-colors"
              >
                Join as Developer
              </NavLink>
              <NavLink
                to="/login"
                className="px-8 py-3 border border-gray-600 text-white font-semibold rounded hover:bg-gray-900 transition-colors"
              >
                Sign In
              </NavLink>
            </div>

            {/* Platform Preview */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                        <span className="text-white font-bold text-xs">A</span>
                      </div>
                      <span className="text-gray-900 font-semibold">Developer Dashboard</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">John Doe</span>
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Active Applications</span>
                        <span className="text-2xl font-bold text-gray-900">5</span>
                      </div>
                      <div className="text-xs text-gray-500">2 interviews pending</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Match Score</span>
                        <span className="text-2xl font-bold text-gray-900">94%</span>
                      </div>
                      <div className="text-xs text-gray-500">Above average</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Profile Complete</span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">100%</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Skills Verified</span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">React, Node.js, Python</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Next Interview</span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Tomorrow, 2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-lg font-medium text-gray-400 mb-8">
              Trusted by developers and companies worldwide
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <Stat number="10K+" label="Developers Registered" />
            <Stat number="500+" label="Companies Hiring" />
            <Stat number="95%" label="Successful Placements" />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">
              How Aether Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple, secure, and effective recruitment process designed for the modern tech industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Step
              number="1"
              title="Create Your Profile"
              description="Sign up with secure email authentication and build a comprehensive profile showcasing your technical skills and experience."
            />
            <Step
              number="2"
              title="Get Matched"
              description="Our AI analyzes your profile and matches you with relevant opportunities based on skills, experience, and preferences."
            />
            <Step
              number="3"
              title="Start Your Journey"
              description="Connect with companies, schedule interviews, and track your applications through our intuitive dashboard."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to revolutionize your hiring?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join Aether today and experience the future of technical recruitment powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/signup"
              className="px-8 py-4 bg-white text-black font-semibold rounded hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </NavLink>
            <NavLink
              to="/login"
              className="px-8 py-4 border border-gray-600 text-white font-semibold rounded hover:bg-gray-900 transition-colors"
            >
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

// Components
function Feature({ title, description, icon }) {
  return (
    <div className="p-6">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div className="text-4xl font-bold text-white mb-2">{number}</div>
      <div className="text-lg text-gray-400">{label}</div>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-6">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

// Copyright notice
const Copyright = () => (
  <div className="text-center text-gray-500 text-sm py-8 bg-black border-t border-gray-900">
    © 2025 Aether, Inc. All rights reserved.
  </div>
);

export default App;