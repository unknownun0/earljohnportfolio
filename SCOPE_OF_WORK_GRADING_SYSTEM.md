# Online Grading Management System — Scope of Work

## 1. Project Summary

Build a web-based grading system for schools where teachers can record, calculate, and manage student grades. Students can view their grades online. The system replaces paper grade sheets and manual computation.

**Tech Stack:** PHP, MySQL, Bootstrap

---

## 2. User Roles

| Role | Can Do |
|------|--------|
| **Admin** (Registrar/Principal) | Create classes, manage teachers and students, view all grades, generate reports |
| **Teacher** | Add/edit grades for their classes, compute final ratings, add comments |
| **Student** | View own grades, print report card |

---

## 3. System Features — Detailed

### 3.1 Login System
- Login page with username/email and password
- Role-based redirect (Admin → Dashboard, Teacher → Classes, Student → Grades)
- Logout button
- Session timeout after inactivity

### 3.2 Admin Features
**Dashboard:**
- Summary cards: total students, teachers, classes, active school year
- Recent activity log

**School Year Management:**
- Add, activate, or close school years (e.g., 2025–2026)
- Set current active school year — all data filters by this

**Class/Subject Management:**
- Create classes (e.g., Grade 7 - Section A)
- Assign teacher to each class
- Add subjects per class (Math, English, Science, etc.)

**Student Management:**
- Add, edit, deactivate students
- Import students via CSV/Excel (bulk upload)
- Search/filter by name, grade level, section

**Teacher Management:**
- Add, edit, deactivate teacher accounts
- Assign teachers to classes and subjects

**Reports:**
- View all students' grades per class
- Generate summary report (list of pass/fail per subject)
- Export reports to PDF or Excel

### 3.3 Teacher Features
**Class List:**
- See assigned classes and subjects

**Grade Entry:**
- Add students to class roster
- Input grades per grading period (Quarter 1, Quarter 2, etc.)
- Input components: Written Work, Performance Task, Quarterly Assessment (per DepEd format)
- Auto-compute final grade based on component weights
- Add remarks (Passed/Failed)

**Class Record:**
- View all students and their grades in a table
- Edit individual grades
- Print class record

### 3.4 Student Features
- Login and view own profile
- View grades per subject per quarter
- View final grade and remarks
- Print/download report card

### 3.5 General Features
**Responsive Design:**
- Works on desktop, tablet, and mobile

**Search & Filter:**
- Search students by name or ID number
- Filter by grade level, section, school year

**Backup & Restore:**
- Admin can export entire database as SQL dump
- Import previous backup if needed

---

## 4. Database Design

### Tables Needed

| Table | Stores |
|-------|--------|
| `users` | All accounts (admin, teacher, student) with role, username, password (hashed) |
| `students` | Student info: name, ID number, grade level, section, status |
| `teachers` | Teacher info: name, employee ID, specialization |
| `classes` | Class/section: name, grade level, adviser teacher |
| `subjects` | Subject: name, code, units |
| `class_subjects` | Which subjects are taught in which class |
| `teacher_subjects` | Which teacher handles which subject in which class |
| `grading_periods` | Quarter 1, Quarter 2, etc. with school year |
| `grades` | Individual student scores per subject per component per period |
| `school_years` | School year records (2025–2026) |
| `remarks` | Passed/Failed, honors list |

---

## 5. Development Phases

### Phase 1: Database & Login
- [ ] Set up PHP project (plain PHP or Laravel)
- [ ] Create MySQL database and all tables
- [ ] Build login/registration page
- [ ] Implement role-based access control
- [ ] Session management

### Phase 2: Admin Module
- [ ] Dashboard with summary stats
- [ ] School year CRUD
- [ ] Class CRUD
- [ ] Subject CRUD
- [ ] Student CRUD (with CSV import)
- [ ] Teacher CRUD
- [ ] Assign teachers to classes/subjects

### Phase 3: Teacher Module
- [ ] View assigned classes
- [ ] Class roster / student list
- [ ] Grade entry form per component (Written Work, Performance Task, Quarterly Assessment)
- [ ] Auto-computation of final grade
- [ ] Edit/update grades
- [ ] Print class record

### Phase 4: Student Module
- [ ] Student dashboard
- [ ] View grades per subject and quarter
- [ ] View final rating and remarks
- [ ] Print report card

### Phase 5: Reports & Export
- [ ] Summary of grades per class
- [ ] Pass/fail list
- [ ] Honor roll list
- [ ] Export to PDF
- [ ] Export to Excel

### Phase 6: Testing & Deployment
- [ ] Test all user flows (Admin, Teacher, Student)
- [ ] Test grade computation accuracy
- [ ] Test on desktop and mobile browsers
- [ ] Fix bugs
- [ ] Deploy to hosting with domain

---

## 6. File Structure (Suggested)

```
grading-system/
├── index.php                 # Login page / entry point
├── config/
│   ├── database.php          # DB connection
│   └── session.php           # Session config
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── admin/
│   ├── dashboard.php
│   ├── students.php
│   ├── teachers.php
│   ├── classes.php
│   ├── subjects.php
│   ├── school-years.php
│   └── reports.php
├── teacher/
│   ├── dashboard.php
│   ├── class-list.php
│   ├── grade-entry.php
│   └── class-record.php
├── student/
│   ├── dashboard.php
│   └── my-grades.php
├── includes/
│   ├── header.php
│   ├── footer.php
│   ├── sidebar.php
│   └── functions.php
├── api/
│   ├── login.php
│   ├── logout.php
│   └── get-students.php
└── database/
    └── schema.sql            # Database setup script
```

---

## 7. User Interface Screens

### Login Page
- Clean login form with username and password
- Role selection dropdown or auto-detect from account
- Error messages for invalid credentials

### Admin Dashboard
- Top: school year selector
- Cards: Total Students, Teachers, Classes, Subjects
- Table: recent activity or student list

### Grade Entry Screen (Teacher)
- Select class and subject from dropdown
- Table rows: students, columns: written work, performance task, quarterly assessment
- Auto-calculated final grade column
- Save button per row or per page

### Student Grades Screen
- Table: subject, Q1, Q2, Q3, Q4, Final Grade, Remarks
- Print-friendly layout

---

## 8. Grade Computation Formula

Based on DepEd standard:

| Component | Weight |
|-----------|--------|
| Written Work | 30% |
| Performance Task | 50% |
| Quarterly Assessment | 20% |

```
Final Grade = (Written Work × 0.30) + (Performance Task × 0.50) + (Quarterly Assessment × 0.20)
```

Grading scale:
| Score Range | Grade | Remarks |
|-------------|-------|---------|
| 90–100 | Outstanding | Passed |
| 85–89 | Very Satisfactory | Passed |
| 80–84 | Satisfactory | Passed |
| 75–79 | Fairly Satisfactory | Passed |
| Below 75 | Did Not Meet Expectations | Failed |

---

## 9. Testing Checklist

- [ ] Login works for Admin, Teacher, Student roles
- [ ] Wrong password shows error
- [ ] Admin can create/edit/delete students
- [ ] Admin can create/edit/delete classes
- [ ] Admin can assign teacher to class
- [ ] Teacher sees only assigned classes
- [ ] Teacher can input grades for all components
- [ ] Final grade auto-computes correctly
- [ ] Student can log in and see only their grades
- [ ] Student can print report card
- [ ] Reports show correct data
- [ ] CSV import works (valid and invalid data)
- [ ] Export to PDF downloads correctly
- [ ] Mobile layout works for grade viewing
- [ ] All pages load within 3 seconds

---

## 10. Who Does What

| Person | Responsibility |
|--------|---------------|
| **Developer** | Builds the system, designs database, writes code, tests, deploys |
| **School Admin/Client** | Provides grading formula, student data sample, feature approval, testing feedback |

---

## 11. Future Enhancements (Optional)

- SMS/Email notifications for grade release
- Parent/Guardian login to view child's grades
- Attendance tracking module
- Online grade submission with digital signature
- Integration with existing school management system (SIS)
- Mobile app version
