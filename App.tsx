import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Unauthorized from './pages/Unauthorized';
import StudentSystem from './StudentSystem';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
   return (
      <Routes>
         {/* Public Routes */}
         <Route path="/login" element={<SignIn />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/unauthorized" element={<Unauthorized />} />

         {/* Protected Routes */}
         <Route path="/*" element={
            <ProtectedRoute>
               <StudentSystem />
            </ProtectedRoute>
         } />
      </Routes>
   );
}

export default App;
