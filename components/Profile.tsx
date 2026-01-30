import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, X, BookOpen, GraduationCap, 
  Calendar, CreditCard, Mail, Phone, MapPin, 
  CheckCircle, AlertCircle, TrendingUp, Plus
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Student, Role, FeeStatus, SubjectResult } from '../types';
import { delay } from '../services/mockData';

interface ProfileProps {
  student: Student;
  role: Role;
  onBack: () => void;
  onSave: (updatedStudent: Student) => void;
}

const DEPARTMENTS = [
  'Computer Science',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Information Technology',
  'Biotechnology',
  'Architecture',
  'Electronics & Communication'
];

const Profile: React.FC<ProfileProps> = ({ student: initialStudent, role, onBack, onSave }) => {
  const [student, setStudent] = useState<Student>(initialStudent);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubject, setNewSubject] = useState<SubjectResult>({
    code: '', name: '', marks: 0, maxMarks: 100, grade: '', status: 'PASS'
  });

  // Reset state if initial student changes
  useEffect(() => {
    setStudent(initialStudent);
    setMessage(null);
    setIsAddingSubject(false);
  }, [initialStudent]);

  const canEdit = role === Role.ADMIN;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleResultChange = (index: number, field: keyof SubjectResult, value: string | number) => {
     const newResults = [...student.results];
     newResults[index] = {
        ...newResults[index],
        [field]: value
     };
     setStudent(prev => ({ ...prev, results: newResults }));
  };

  const handleAddSubject = () => {
    if (!newSubject.code || !newSubject.name) return;
    setStudent(prev => ({
      ...prev,
      results: [...prev.results, newSubject]
    }));
    setNewSubject({ code: '', name: '', marks: 0, maxMarks: 100, grade: '', status: 'PASS' });
    setIsAddingSubject(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      await delay(800); // Simulate network
      onSave(student);
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setIsSaving(false);
      // Auto-hide success message
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const attendanceData = [
    { name: 'Attended', value: student.attendedClasses, color: '#4F46E5' }, // Indigo-600
    { name: 'Missed', value: student.totalClasses - student.attendedClasses, color: '#E2E8F0' }, // Slate-200
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Sticky Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">{student.name}</h1>
              <p className="text-xs text-slate-500">{student.regNo}</p>
            </div>
          </div>
          
          {canEdit && (
             <div className="flex items-center gap-3">
               {message && (
                  <span className={`text-sm font-medium animate-fade-in ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {message.text}
                  </span>
               )}
               <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
               >
                 {isSaving ? (
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   <Save className="w-4 h-4" />
                 )}
                 <span>Save Changes</span>
               </button>
             </div>
          )}
          {!canEdit && (
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-100 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Student View
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Identity Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center lg:col-span-1">
            <div className="relative mb-4">
              <img 
                src={student.avatarUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-md"
              />
              <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center
                ${student.feeStatus === FeeStatus.PAID ? 'bg-green-500' : 'bg-red-500'}`}
                title={`Fees: ${student.feeStatus}`}
              >
                 {student.feeStatus === FeeStatus.PAID ? <CheckCircle className="w-3 h-3 text-white" /> : <AlertCircle className="w-3 h-3 text-white" />}
              </div>
            </div>
            
            {canEdit ? (
               <div className="w-full space-y-3">
                 <input 
                    name="name"
                    value={student.name}
                    onChange={handleInputChange}
                    className="w-full text-center text-xl font-bold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none bg-transparent transition-colors px-1"
                    placeholder="Student Name"
                 />
                 <input 
                    name="regNo"
                    value={student.regNo}
                    onChange={handleInputChange}
                    className="w-full text-center text-sm text-slate-500 border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none bg-transparent transition-colors px-1"
                    placeholder="Registration No"
                 />
               </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
                <p className="text-slate-500 font-medium">{student.regNo}</p>
              </>
            )}

            <div className="mt-6 w-full grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Sem</p>
                {canEdit ? (
                  <input type="number" name="semester" value={student.semester} onChange={handleInputChange} className="w-full text-center font-bold text-slate-700 bg-slate-50 rounded mt-1"/>
                ) : (
                  <p className="text-lg font-bold text-slate-700">{student.semester}</p>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">CGPA</p>
                {canEdit ? (
                  <input type="number" step="0.1" name="cgpa" value={student.cgpa} onChange={handleInputChange} className="w-full text-center font-bold text-indigo-600 bg-indigo-50 rounded mt-1"/>
                ) : (
                  <p className="text-lg font-bold text-indigo-600">{student.cgpa}</p>
                )}
              </div>
            </div>
          </div>

          {/* Details Form Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <UserCardIcon className="w-5 h-5 text-indigo-500" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {/* Department Dropdown / Field */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-4 h-4" /> Department
                </label>
                {canEdit ? (
                   <select 
                      name="department" 
                      value={student.department} 
                      onChange={handleInputChange}
                      className="w-full p-2 text-sm text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all bg-slate-50 focus:bg-white"
                   >
                      {DEPARTMENTS.map(dept => (
                         <option key={dept} value={dept}>{dept}</option>
                      ))}
                   </select>
                ) : (
                   <p className="text-sm font-medium text-slate-800 py-2 border-b border-transparent">{student.department}</p>
                )}
              </div>

              <InfoField label="Year" icon={<Calendar className="w-4 h-4" />} value={student.year} name="year" type="number" isEditable={canEdit} onChange={handleInputChange} />
              <InfoField label="Email" icon={<Mail className="w-4 h-4" />} value={student.email} name="email" isEditable={canEdit} onChange={handleInputChange} />
              <InfoField label="Phone" icon={<Phone className="w-4 h-4" />} value={student.contact} name="contact" isEditable={canEdit} onChange={handleInputChange} />
              <div className="sm:col-span-2">
                 <InfoField label="Address" icon={<MapPin className="w-4 h-4" />} value={student.address} name="address" isEditable={canEdit} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid: Attendance & Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Attendance Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                Attendance Overview
              </h3>
              <span className={`text-sm font-bold px-2 py-1 rounded bg-slate-100 text-slate-600`}>
                {Math.round((student.attendedClasses / student.totalClasses) * 100)}% Overall
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
               <div className="w-40 h-40 flex-shrink-0 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={75}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        paddingAngle={5}
                        cornerRadius={5}
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-xs text-slate-400 font-medium">Present</span>
                     <span className="text-2xl font-bold text-slate-800">{student.attendedClasses}</span>
                     <span className="text-xs text-slate-400">of {student.totalClasses}</span>
                  </div>
               </div>
               
               <div className="flex-1 w-full space-y-4">
                  {canEdit && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Attended</label>
                        <input type="number" name="attendedClasses" value={student.attendedClasses} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Total</label>
                        <input type="number" name="totalClasses" value={student.totalClasses} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Student has maintained {student.attendancePercentage >= 75 ? 'good' : 'poor'} attendance record this semester. 
                    {student.attendancePercentage < 75 && ' Requires improvement to meet eligibility criteria.'}
                  </p>
               </div>
            </div>
          </div>

          {/* Fees Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-500" />
                Financial Status
              </h3>
              <StatusBadge status={student.feeStatus} />
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-500 font-medium">Total Fees</span>
                  <span className="text-slate-900 font-bold">${student.totalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-500 font-medium">Paid Amount</span>
                  {canEdit ? (
                     <div className="flex items-center gap-1">
                       <span className="text-slate-400">$</span>
                       <input 
                        type="number" 
                        name="paidFee" 
                        value={student.paidFee} 
                        onChange={handleInputChange} 
                        className="w-24 text-right p-1 text-sm border-b border-slate-300 focus:border-indigo-500 bg-transparent focus:outline-none"
                      />
                     </div>
                  ) : (
                    <span className="text-green-600 font-bold">${student.paidFee.toLocaleString()}</span>
                  )}
                </div>
                <div className="h-px bg-slate-200 my-3"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-800 font-bold">Pending</span>
                  <span className="text-red-500 font-bold">${(student.totalFee - student.paidFee).toLocaleString()}</span>
                </div>
              </div>

              {canEdit && (
                <div className="flex items-center gap-2 text-sm">
                   <span className="text-slate-600">Status Override:</span>
                   <select 
                      name="feeStatus" 
                      value={student.feeStatus} 
                      onChange={handleInputChange}
                      className="border border-slate-300 rounded-md p-1 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                   >
                      <option value={FeeStatus.PAID}>PAID</option>
                      <option value={FeeStatus.PENDING}>PENDING</option>
                      <option value={FeeStatus.OVERDUE}>OVERDUE</option>
                   </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Academic Results Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-500" />
              Academic Performance
            </h3>
            {canEdit && !isAddingSubject && (
              <button 
                onClick={() => setIsAddingSubject(true)}
                className="text-sm flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <Plus className="w-4 h-4" /> Add Subject
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Marks</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Grade</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {student.results.map((result, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{result.code}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{result.name}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      {canEdit ? (
                        <input 
                          type="number"
                          value={result.marks}
                          onChange={(e) => handleResultChange(idx, 'marks', parseInt(e.target.value) || 0)}
                          className="w-16 text-center border border-slate-200 rounded p-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                      ) : (
                        <span className="font-semibold text-slate-700">{result.marks}</span>
                      )}
                      <span className="text-xs text-slate-400 ml-1">/ {result.maxMarks}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                       {canEdit ? (
                        <input 
                          type="text"
                          value={result.grade}
                          onChange={(e) => handleResultChange(idx, 'grade', e.target.value)}
                          className="w-12 text-center border border-slate-200 rounded p-1 focus:ring-1 focus:ring-indigo-500 focus:outline-none uppercase"
                        />
                      ) : (
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold
                          ${['A', 'A+', 'O'].includes(result.grade) ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}
                        `}>
                          {result.grade}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className={`px-2 py-1 text-xs font-bold rounded
                          ${result.status === 'PASS' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}
                       `}>
                          {result.status}
                       </span>
                    </td>
                  </tr>
                ))}
                
                {/* Add Subject Row */}
                {isAddingSubject && (
                  <tr className="bg-indigo-50/50">
                    <td className="px-6 py-4">
                      <input 
                        placeholder="Code" 
                        value={newSubject.code}
                        onChange={(e) => setNewSubject(p => ({...p, code: e.target.value}))}
                        className="w-full text-sm p-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        placeholder="Subject Name" 
                        value={newSubject.name}
                        onChange={(e) => setNewSubject(p => ({...p, name: e.target.value}))}
                        className="w-full text-sm p-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="number"
                        placeholder="Marks" 
                        value={newSubject.marks}
                        onChange={(e) => setNewSubject(p => ({...p, marks: parseInt(e.target.value)}))}
                        className="w-full text-center text-sm p-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        placeholder="Grade" 
                        value={newSubject.grade}
                        onChange={(e) => setNewSubject(p => ({...p, grade: e.target.value}))}
                        className="w-full text-center text-sm p-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                       <button onClick={handleAddSubject} className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700">Add</button>
                       <button onClick={() => setIsAddingSubject(false)} className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded hover:bg-slate-300">Cancel</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Components
const UserCardIcon: React.FC<{className?: string}> = (props) => (
   <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const InfoField = ({ label, value, icon, isEditable, onChange, name, type = 'text' }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
      {icon} {label}
    </label>
    {isEditable ? (
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange}
        className="w-full p-2 text-sm text-slate-900 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all bg-slate-50 focus:bg-white"
      />
    ) : (
      <p className="text-sm font-medium text-slate-800 py-2 border-b border-transparent">{value}</p>
    )}
  </div>
);

const StatusBadge = ({ status }: { status: FeeStatus }) => {
  const styles = {
    [FeeStatus.PAID]: 'bg-green-100 text-green-700 border-green-200',
    [FeeStatus.PENDING]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    [FeeStatus.OVERDUE]: 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
};

export default Profile;