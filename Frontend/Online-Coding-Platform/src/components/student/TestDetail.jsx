
// src/pages/student/TestDetail.jsx (UPDATED)
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaClock, FaListOl, FaFileAlt, FaArrowLeft, FaPlayCircle } from 'react-icons/fa';

const MOCK_TEST_DETAIL = {
  test_id: 101,
  test_name: 'Frontend Developer Assessment',
  company_name: 'Tech Innovations Inc.',
  description: 'This test assesses your skills in modern frontend technologies. Once you begin, a timer will start and you cannot pause it. Ensure you have a stable internet connection.',
  duration_minutes: 90,
  problems: [ { q_id: 1, points: 25 }, { q_id: 2, points: 15 }, { q_id: 3, points: 20 }]
};

const TestDetail = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = MOCK_TEST_DETAIL;
  const totalPoints = test.problems.reduce((sum, p) => sum + p.points, 0);

  const handleStartTest = () => {
    // Clear any previous statuses for this test's problems
    test.problems.forEach(p => localStorage.removeItem(`problem_${p.q_id}_status`));
    navigate(`/student/attempt/${test.test_id}`);
  };

  return (
    <div>
      <Link to="/student/upcoming" className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 mb-6">
        <FaArrowLeft /> Back to Upcoming Tests
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">{test.test_name}</h1>
        <p className="text-slate-400 text-lg">By {test.company_name}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 flex items-center gap-4"><FaClock className="text-2xl text-indigo-400" /><div><p className="text-slate-400 text-sm">Duration</p><p className="font-bold text-white">{test.duration_minutes} minutes</p></div></div>
        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 flex items-center gap-4"><FaListOl className="text-2xl text-indigo-400" /><div><p className="text-slate-400 text-sm">Total Problems</p><p className="font-bold text-white">{test.problems.length}</p></div></div>
        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 flex items-center gap-4"><FaFileAlt className="text-2xl text-indigo-400" /><div><p className="text-slate-400 text-sm">Total Points</p><p className="font-bold text-white">{totalPoints}</p></div></div>
      </div>
      <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700 mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Instructions</h2>
        <p className="text-slate-300">{test.description}</p>
      </div>
      <div className="text-center">
        <button onClick={handleStartTest} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg flex items-center gap-3 mx-auto">
          <FaPlayCircle /> Start Test
        </button>
      </div>
    </div>
  );
};

export default TestDetail;
