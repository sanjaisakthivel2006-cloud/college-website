import React, { useState } from 'react';
import { Search, ChevronRight, User, Filter } from 'lucide-react';
import { Student, FeeStatus } from '../types';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onLogout: () => void;
}

const DEPARTMENTS = [
  'All Departments',
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Information Technology',
  'Biotechnology',
  'Architecture',
  'Electronics & Communication'
];

const StudentList: React.FC<StudentListProps> = ({ students, onSelectStudent, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const filteredStudents = students.filter(
    (s) => {
      const matchesSearch = 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.regNo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDept = selectedDept === 'All Departments' || s.department === selectedDept;

      return matchesSearch && matchesDept;
    }
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="bg-indigo-600 p-2 rounded-lg">
                <User className="w-5 h-5 text-white" />
             </div>
             <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
          <button 
            onClick={onLogout}
            className="text-sm text-slate-600 hover:text-red-600 font-medium transition-colors"
          >
            Switch Role
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Student Directory</h2>
          <p className="text-slate-500">Select a student to view and edit their comprehensive profile.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow sm:text-sm shadow-sm"
              placeholder="Search by name or registration number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative min-w-[250px]">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Filter className="h-5 w-5 text-slate-400" />
             </div>
             <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl leading-5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm appearance-none cursor-pointer"
             >
                {DEPARTMENTS.map(dept => (
                   <option key={dept} value={dept}>{dept}</option>
                ))}
             </select>
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
             </div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <li key={student.id}>
                  <button
                    onClick={() => onSelectStudent(student)}
                    className="w-full flex items-center justify-between p-4 sm:px-6 hover:bg-indigo-50 transition-colors text-left group"
                  >
                    <div className="flex items-center min-w-0 gap-4">
                      <img
                        className="h-12 w-12 rounded-full object-cover border border-slate-200"
                        src={student.avatarUrl}
                        alt={student.name}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-700">
                          {student.name}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {student.regNo} • {student.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-medium border
                          ${student.feeStatus === FeeStatus.PAID ? 'bg-green-50 text-green-700 border-green-200' : 
                            student.feeStatus === FeeStatus.PENDING ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                            'bg-red-50 text-red-700 border-red-200'
                          }`}>
                          {student.feeStatus}
                       </span>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-500" />
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <li className="p-12 text-center">
                <p className="text-slate-500">No students found matching your search.</p>
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default StudentList;