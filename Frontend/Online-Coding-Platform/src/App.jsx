  // src/App.jsx
  // NOTE: I have updated this file to include the new Admin routes.

  import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
  import StudentRoutes from './routes/StudentRoutes';
  import CompanyRoutes from './routes/CompanyRoutes';
  import AdminRoutes from './routes/AdminRoutes'; // Import AdminRoutes
  import './index.css';
  import { useContext } from 'react';
  import { ContextProvider } from './context/AuthContext';

  const LandingPage = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-2 text-indigo-400">EduPortal</h1>
      <p className="text-slate-400 mb-8">Select your dashboard view</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link to="/student" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors text-center">
          Student Dashboard
        </Link>
        <Link to="/company" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors text-center">
          Company Dashboard
        </Link>
        <Link to="/admin" className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors text-center">
          Admin Dashboard
        </Link>
      </div>
    </div>
  );

  function App() {
    return (
    
      <BrowserRouter>
        <ContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student/*" element={<StudentRoutes />} />
          <Route path="/company/*" element={<CompanyRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} /> {/* Add Admin Route */}
        </Routes>
        </ContextProvider>
      </BrowserRouter>
    
    );
  }

  export default App;
