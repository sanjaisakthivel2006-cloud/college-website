import React from 'react';
import { MapPin, Phone, Mail, Award, BookOpen, Users } from 'lucide-react';

const CollegeDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* About Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="relative h-64 sm:h-80">
             <img 
               src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop" 
               alt="College Campus" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-8">
                   <h1 className="text-4xl font-bold text-white mb-2">TVR College of Engineering and Technology</h1>
                   <p className="text-slate-200 text-lg">Excellence in Education since 1995</p>
                </div>
             </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
             <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                   <BookOpen className="w-6 h-6 text-indigo-600" />
                   About Our Institution
                </h2>
                <p className="text-slate-600 leading-relaxed">
                   TVR College of Engineering and Technology is a premier institution dedicated to imparting quality technical education. 
                   Situated in the heart of Edu City, our sprawling campus offers state-of-the-art laboratories, a digital library, 
                   and world-class sports facilities. We believe in holistic development, fostering innovation, and preparing 
                   students for global challenges.
                </p>
                <p className="text-slate-600 leading-relaxed">
                   With over 5000+ alumni working in top MNCs globally, TVR College stands as a beacon of knowledge and skill development.
                </p>
             </div>
             <div className="bg-indigo-50 p-6 rounded-xl space-y-6">
                <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                   <Award className="w-5 h-5" />
                   Key Highlights
                </h3>
                <ul className="space-y-3">
                   <li className="flex gap-3 text-slate-700 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></div>
                      <span>NAAC 'A+' Grade Accredited</span>
                   </li>
                   <li className="flex gap-3 text-slate-700 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></div>
                      <span>100% Placement Assistance</span>
                   </li>
                   <li className="flex gap-3 text-slate-700 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></div>
                      <span>Research & Innovation Hub</span>
                   </li>
                </ul>
             </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Users className="w-5 h-5 text-emerald-600" />
                 Our Vision
              </h2>
              <p className="text-slate-600 italic">
                 "To be a globally recognized institution of excellence in engineering education and research, producing socially responsible and innovative leaders."
              </p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Award className="w-5 h-5 text-amber-600" />
                 Our Mission
              </h2>
              <p className="text-slate-600 italic">
                 "To provide a conducive learning environment, foster industry-institute interaction, and instill ethical values to create competent professionals."
              </p>
           </div>
        </section>

        {/* Gallery */}
        <section>
           <h2 className="text-2xl font-bold text-slate-800 mb-6 pl-2 border-l-4 border-indigo-600">Campus Gallery</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group relative overflow-hidden rounded-xl aspect-square">
                 <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Library" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">Library</div>
              </div>
              <div className="group relative overflow-hidden rounded-xl aspect-square">
                 <img src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Labs" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">Laboratories</div>
              </div>
              <div className="group relative overflow-hidden rounded-xl aspect-square">
                 <img src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Sports" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">Sports Complex</div>
              </div>
              <div className="group relative overflow-hidden rounded-xl aspect-square">
                 <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Events" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">Cultural Events</div>
              </div>
           </div>
        </section>

        {/* Contact Strip */}
        <section className="bg-slate-800 text-white rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
              <h3 className="text-xl font-bold mb-2">Visit Us Today</h3>
              <div className="space-y-1 text-slate-300">
                 <p className="flex items-center gap-2"><MapPin className="w-4 h-4"/> 123 Knowledge Hwy, Edu City, ST 12345</p>
                 <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> +91 98765 43210</p>
                 <p className="flex items-center gap-2"><Mail className="w-4 h-4"/> admissions@tvrcollege.edu</p>
              </div>
           </div>
           <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              Contact Administration
           </button>
        </section>
      </div>
    </div>
  );
};

export default CollegeDetails;
