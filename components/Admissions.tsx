import React, { useState } from 'react';
import { FileText, CreditCard, CheckCircle, Upload } from 'lucide-react';
import { delay } from '../services/mockData';

const Admissions: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await delay(1500); // Simulate processing
    setStep(2);
    setIsSubmitting(false);
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    await delay(2000); // Simulate payment gateway
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-lg w-full">
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
           </div>
           <h2 className="text-2xl font-bold text-slate-800 mb-2">Application Submitted!</h2>
           <p className="text-slate-600 mb-8">
              Thank you for applying to TVR College. Your application reference number is <span className="font-mono font-bold text-slate-800">TVR-{Math.floor(1000 + Math.random() * 9000)}</span>. 
              We will contact you shortly via email.
           </p>
           <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 w-full"
            >
              Back to Home
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Online Application 2024</h1>
          <p className="text-slate-500">Join TVR College of Engineering and Technology</p>
        </div>

        {step === 1 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-indigo-600 p-6 text-white">
               <h2 className="text-xl font-bold flex items-center gap-2">
                 <FileText className="w-6 h-6" />
                 Step 1: Applicant Details
               </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                     <input required type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Enter your full name" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                     <input required type="date" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                     <input required type="email" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="you@example.com" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                     <input required type="tel" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="+91 00000 00000" />
                  </div>
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Course Applied For</label>
                  <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                     <option>Computer Science Engineering</option>
                     <option>Mechanical Engineering</option>
                     <option>Civil Engineering</option>
                     <option>Electronics & Communication</option>
                     <option>Information Technology</option>
                     <option>Biotechnology</option>
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Upload Documents (Grade Sheet/ID)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                     <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                     <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                     <p className="text-xs text-slate-400 mt-1">PDF, JPG up to 5MB</p>
                  </div>
               </div>

               <div className="flex justify-end pt-4">
                  <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                     {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                  </button>
               </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-emerald-600 p-6 text-white">
               <h2 className="text-xl font-bold flex items-center gap-2">
                 <CreditCard className="w-6 h-6" />
                 Step 2: Application Fee Payment
               </h2>
            </div>
            <div className="p-8 space-y-6">
               <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                     <p className="text-sm text-slate-500">Application Fee</p>
                     <p className="text-2xl font-bold text-slate-800">$50.00</p>
                  </div>
                  <div className="text-right">
                     <p className="text-xs text-slate-400 mb-1">Transaction ID</p>
                     <p className="font-mono text-sm">PENDING-8X92</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="font-medium text-slate-700">Select Payment Method</p>
                  <div className="grid grid-cols-3 gap-4">
                     <button className="p-4 border border-indigo-600 bg-indigo-50 text-indigo-700 font-bold rounded-lg text-sm text-center">Credit Card</button>
                     <button className="p-4 border border-slate-200 hover:border-indigo-300 rounded-lg text-sm text-slate-600 text-center">Net Banking</button>
                     <button className="p-4 border border-slate-200 hover:border-indigo-300 rounded-lg text-sm text-slate-600 text-center">UPI</button>
                  </div>
               </div>

               <div className="flex justify-between items-center pt-6">
                  <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-800">Back</button>
                  <button 
                     onClick={handlePayment}
                     disabled={isSubmitting}
                     className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                     {isSubmitting ? 'Processing...' : 'Pay & Submit'}
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admissions;
