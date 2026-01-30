export enum Role {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  NONE = 'NONE'
}

export enum FeeStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE'
}

export interface SubjectResult {
  code: string;
  name: string;
  marks: number;
  maxMarks: number;
  grade: string;
  status: 'PASS' | 'FAIL';
}

export interface Student {
  id: string;
  name: string;
  regNo: string;
  email: string;
  department: string;
  year: number;
  semester: number;
  avatarUrl: string;
  contact: string;
  address: string;
  
  // Attendance
  attendancePercentage: number;
  totalClasses: number;
  attendedClasses: number;

  // Fees
  feeStatus: FeeStatus;
  totalFee: number;
  paidFee: number;
  pendingFee: number;

  // Academic
  results: SubjectResult[];
  cgpa: number;
}

export type ViewState = 
  | 'HOME' 
  | 'LOGIN_STAFF' 
  | 'LOGIN_STUDENT' 
  | 'DASHBOARD_STAFF' 
  | 'DASHBOARD_STUDENT' 
  | 'COLLEGE_DETAILS' 
  | 'ADMISSIONS';
