import React, { useState } from 'react';
import RoleSelection from './components/RoleSelection';
import StudentList from './components/StudentList';
import Profile from './components/Profile';
import Login from './components/Login';
import CollegeDetails from './components/CollegeDetails';
import Admissions from './components/Admissions';
import { Role, Student, ViewState } from './types';
import { INITIAL_STUDENTS } from './services/mockData';
import { MapPin, Phone, GraduationCap, Globe } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';

const StudentSystem: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewState>('HOME');
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
    const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

    const { t, language, setLanguage } = useLanguage();
    const { logout, user } = useAuth();

    // --- Handlers ---

    const handleNavigate = (view: ViewState) => {
        setCurrentView(view);
        if (view === 'HOME') {
            setCurrentStudent(null);
        }
    };

    const handleLogin = (id: string, role: Role) => {
        if (role === Role.ADMIN) {
            // Simple mock admin check
            setCurrentView('DASHBOARD_STAFF');
        } else {
            // Find student
            const student = students.find(s => s.regNo.toLowerCase() === id.toLowerCase());
            if (student) {
                setCurrentStudent(student);
                setCurrentView('DASHBOARD_STUDENT');
            } else {
                alert('Student Registration Number not found!');
            }
        }
    };

    const handleLogout = () => {
        setCurrentView('HOME');
        setCurrentStudent(null);
    };

    const handleStudentSelect = (student: Student) => {
        setCurrentStudent(student);
        setCurrentView('DASHBOARD_STAFF');
    };

    const handleSaveStudent = (updatedStudent: Student) => {
        setStudents((prev) =>
            prev.map((s) => s.id === updatedStudent.id ? updatedStudent : s)
        );
        setCurrentStudent(updatedStudent);
    };

    const handleSignOut = async () => {
        try {
            await logout();
            // Router will handle redirect
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // --- Render Content Based on View ---

    const renderContent = () => {
        switch (currentView) {
            case 'HOME':
                return <RoleSelection onNavigate={handleNavigate} />;

            case 'COLLEGE_DETAILS':
                return (
                    <div className="relative">
                        <button onClick={() => setCurrentView('HOME')} className="absolute top-4 left-4 z-50 bg-white/80 p-2 rounded-full shadow hover:bg-white">&larr; {t('backHome')}</button>
                        <CollegeDetails />
                    </div>
                );

            case 'ADMISSIONS':
                return (
                    <div className="relative">
                        <button onClick={() => setCurrentView('HOME')} className="absolute top-4 left-4 z-50 bg-white/80 p-2 rounded-full shadow hover:bg-white">&larr; {t('backHome')}</button>
                        <Admissions />
                    </div>
                );

            case 'LOGIN_STAFF':
                return <Login role={Role.ADMIN} onLogin={(id) => handleLogin(id, Role.ADMIN)} onBack={() => setCurrentView('HOME')} />;

            case 'LOGIN_STUDENT':
                return <Login role={Role.STUDENT} onLogin={(id) => handleLogin(id, Role.STUDENT)} onBack={() => setCurrentView('HOME')} />;

            case 'DASHBOARD_STUDENT':
                if (!currentStudent) return <div>Error: No student loaded</div>;
                return (
                    <Profile
                        student={currentStudent}
                        role={Role.STUDENT}
                        onBack={handleLogout}
                        onSave={() => { }}
                    />
                );

            case 'DASHBOARD_STAFF':
                if (currentStudent) {
                    return (
                        <Profile
                            student={currentStudent}
                            role={Role.ADMIN}
                            onBack={() => setCurrentStudent(null)}
                            onSave={handleSaveStudent}
                        />
                    );
                }
                return (
                    <StudentList
                        students={students}
                        onSelectStudent={handleStudentSelect}
                        onLogout={handleLogout}
                    />
                );

            default:
                return <div>Page Not Found</div>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Global Top Header */}
            <header className="bg-slate-900 text-white shadow-lg z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
                                <GraduationCap className="w-8 h-8 text-indigo-900" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold tracking-tight">{t('headerTitle')}</h1>
                                <p className="text-xs text-slate-400 uppercase tracking-widest">{t('headerSubtitle')}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-300">
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <MapPin className="w-4 h-4 text-indigo-400" />
                                    <span>{t('location')}</span>
                                </div>
                                <div className="hidden sm:block text-slate-600">|</div>
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <Phone className="w-4 h-4 text-indigo-400" />
                                    <span>{t('contact')}</span>
                                </div>
                                <div className="hidden sm:block text-slate-600">|</div>
                                {/* Logout Button */}
                                <button onClick={handleSignOut} className="text-red-400 hover:text-red-300">
                                    Sign Out ({user?.email})
                                </button>
                            </div>

                            {/* Language Selector */}
                            <div className="flex items-center gap-2 mt-1">
                                <Globe className="w-4 h-4 text-indigo-400" />
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as any)}
                                    className="bg-slate-800 text-white text-xs border border-slate-700 rounded p-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
                                >
                                    <option value="EN">English</option>
                                    <option value="TA">தமிழ் (Tamil)</option>
                                    <option value="HI">हिंदी (Hindi)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Application Area */}
            <main className="flex-grow">
                {renderContent()}
            </main>
        </div>
    );
};

export default StudentSystem;
