// // src/pages/student/UpcomingTests.jsx
// import React, { useState, useMemo } from 'react';
// import { FaSearch, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

// // Mock Data for Upcoming Tests (replace with an API call)
// const MOCK_UPCOMING_TESTS = [
//   { test_id: 103, test_name: 'Algorithm Mastery Test', company_name: 'Binary Brains LLC', deadline: '2025-08-15T23:59:59Z' },
//   { test_id: 105, test_name: 'Advanced SQL Test', company_name: 'DataDriven Co.', deadline: '2025-08-20T23:59:59Z' },
//   { test_id: 106, test_name: 'React Hooks In-Depth', company_name: 'UI Wizards', deadline: '2025-08-05T18:00:00Z' },
//   { test_id: 107, test_name: 'System Design Principles', company_name: 'ScaleUp Inc.', deadline: '2025-09-01T12:00:00Z' },
// ];

// // Helper function to calculate days remaining
// const calculateDaysRemaining = (deadline) => {
//   const now = new Date();
//   const deadLineDate = new Date(deadline);
//   const diffTime = deadLineDate - now;
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays;
// };

// const UpcomingTests = () => {
//   const [tests] = useState(MOCK_UPCOMING_TESTS);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredTests = useMemo(() => {
//     return tests.filter(t =>
//       t.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.company_name.toLowerCase().includes(searchTerm.toLowerCase())
//     ).sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // Sort by nearest deadline first
//   }, [tests, searchTerm]);

//   return (
//     <div>
//       <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-white">Upcoming Tests</h1>
//           <p className="text-slate-400">Stay on top of your pending assessments and deadlines.</p>
//         </div>
//       </header>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative w-full md:max-w-xs">
//           <input
//             type="text"
//             placeholder="Search upcoming tests..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full py-2 px-4 pl-10 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
//         </div>
//       </div>

//       {/* Upcoming Tests List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredTests.map(test => {
//           const daysRemaining = calculateDaysRemaining(test.deadline);
//           return (
//             <div key={test.test_id} className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700 p-5 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300">
//               <div>
//                 <h3 className="font-semibold text-white text-lg">{test.test_name}</h3>
//                 <p className="text-sm text-slate-400 mb-4">{test.company_name}</p>
//               </div>
//               <div className="flex flex-col space-y-4">
//                  <div className="text-sm text-indigo-300 flex items-center gap-2">
//                     <FaCalendarAlt />
//                     <span>Due in <strong>{daysRemaining}</strong> days</span>
//                  </div>
//                  <button className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold transition-colors flex items-center justify-center gap-2">
//                     View Details <FaInfoCircle className="text-xs" />
//                  </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       {filteredTests.length === 0 && (
//         <div className="p-8 text-center text-slate-400 bg-slate-800/50 rounded-xl">
//           No upcoming tests found.
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpcomingTests;
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaPlayCircle, FaLock } from 'react-icons/fa';

const MOCK_UPCOMING_TESTS = [
  { test_id: 103, test_name: 'Algorithm Mastery Test', company_name: 'Binary Brains LLC', start_time: '2025-08-01T10:00:00Z', deadline: '2025-08-15T23:59:59Z' },
  { test_id: 105, test_name: 'Advanced SQL Test', company_name: 'DataDriven Co.', start_time: '2025-08-02T12:00:00Z', deadline: '2025-08-20T23:59:59Z' },
  { test_id: 106, test_name: 'React Hooks In-Depth', company_name: 'UI Wizards', start_time: '2025-07-30T18:00:00Z', deadline: '2025-08-05T18:00:00Z' },
];

const UpcomingTests = () => {
  const [tests] = useState(MOCK_UPCOMING_TESTS);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sortedTests = useMemo(() => {
    return tests.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  }, [tests]);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Upcoming Tests</h1>
        <p className="text-slate-400">Your scheduled assessments. Good luck!</p>
      </header>

      <div className="space-y-4">
        {sortedTests.map(test => {
          const startTime = new Date(test.start_time);
          const isTestActive = currentTime >= startTime;
          
          const ActionButton = () => (
            <button
              disabled={!isTestActive}
              className={`w-full text-center px-4 py-2 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                isTestActive
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isTestActive ? (
                <>
                  <FaPlayCircle /> Attempt Test
                </>
              ) : (
                <>
                  <FaLock /> Scheduled
                </>
              )}
            </button>
          );

          return (
            <div key={test.test_id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="font-semibold text-white">{test.test_name}</h3>
                <p className="text-sm text-slate-400">{test.company_name}</p>
              </div>
              <div className="flex items-center gap-4 mt-3 sm:mt-0 w-full sm:w-auto">
                <div className="text-sm text-slate-400 flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>Starts: {startTime.toLocaleString()}</span>
                </div>
                {isTestActive ? (
                  <Link to={`/student/tests/${test.test_id}`} className="w-full sm:w-auto">
                    <ActionButton />
                  </Link>
                ) : (
                  <div className="w-full sm:w-auto">
                    <ActionButton />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingTests;
