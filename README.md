# 🚀 Full-Stack Coding Platform

A real-time **online coding platform** where companies can create coding tests and students can solve problems with instant evaluation.

---

## 📌 Project Overview
This project is a **full-stack coding assessment system** that allows companies to host coding tests and students to attempt them in a real-time coding environment with automated evaluation.

---

## 🔑 Key Features
- 🔒 **Role-based access** (Company, Student, Admin) with JWT authentication  
- 🏢 **Companies** can create tests with custom coding problems  
- 👨‍🎓 **Students** solve problems in **Monaco Editor** with real-time execution  
- ⚡ **Live code execution** powered by **Piston API**  
- ✅ **Automatic test case evaluation** and scoring system  
- 🗄️ **Well-structured database schema** with clear entity relationships  

---

## 🛠 Tech Stack
- **Frontend:** ReactJS, TailwindCSS, Monaco Editor  
- **Backend:** Spring Boot, REST APIs, JWT Authentication  
- **Database:** SQL  
- **Code Execution:** Piston API  

---

## 📖 Database Schema
### Tables
- **User** (id, username, email, password, role)  
- **Company** (id, user_id, company_name, description)  
- **Test** (test_id, company_id, test_name, description, duration_minutes, start_time, end_time, ...)  
- **Question** (problem_id, title, description, difficulty, ...)  
- **TestProblem** (id, test_id, q_id, points, order_id_test)  
- **TestCase** (test_id, problem_id, input_file, sample_input_file)  
- **TestAttempt** (test_id, userId, start_time, end_time, status, total_score)  
- **Submission** (submission_id, attempt_id, qId, submitted_code, language, status, score, test_case_results)  

---

## 🏗 How It Works
- **Company:** Login → Create coding tests → Share test links with students  
- **Student:** Open test link → Solve coding problems → Submit solutions  
- **Platform:** Executes code → Evaluates test cases → Stores results → Provides instant feedback  

---

## ✨ Highlights
- Clean **role-based structure** (Company, Student, Admin)  
- Real-time **coding experience** like competitive platforms  
- Structured DB schema for **submissions, test attempts, scoring**  

---

## 👨‍💻 Author
Built with ❤️ by **Saharsh**
