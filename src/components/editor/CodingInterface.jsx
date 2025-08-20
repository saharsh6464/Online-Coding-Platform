import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaUpload, FaCog } from 'react-icons/fa';
import { FindQuestionById } from '../../api/question';
import { FindTestCase } from '../../api/Testcase';

const CodingInterface = () => {
  const { testId, problemId } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState('// Write your code here...');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [combined, setCombined] = useState({});

  useEffect(() => {
    const getProblems = async () => {
      const data = await FindQuestionById(problemId);
      const testcase = await FindTestCase(problemId);
      const combinedData = {
        ...data,
        Testcase_detail: testcase,
      };
      setCombined(combinedData);
    };
    getProblems();
  }, [problemId]);

  useEffect(() => {
    if (combined) {
      console.log("Combined Data of Question and TestCase:", combined);
    }
  }, [combined]);

  // Panel resizing logic
  const [leftPanelWidth, setLeftPanelWidth] = useState(40);
  const isResizing = useRef(false);

  const handleMouseDown = (e) => {
    isResizing.current = true;
    e.preventDefault();
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 25 && newWidth < 75) {
      setLeftPanelWidth(newWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleSubmit = () => {
    localStorage.setItem(`problem_${problemId}_status`, 'submitted');
    window.dispatchEvent(new Event('storage'));
    if (testId) {
      navigate(`/student/attempt/${testId}`);
    } else {
      navigate('/student/resources');
    }
  };

  // Loading placeholder
  if (!combined?.title) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      <header className="flex-shrink-0 p-3 border-b border-slate-700 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300"
        >
          <FaArrowLeft /> Back to Problem List
        </button>
        <span className="text-lg font-bold">{combined.title}</span>
        <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1.5 px-4 rounded-lg text-sm flex items-center gap-2">
          <FaUpload /> Submit & Go Back
        </button>
      </header>

      <div className="flex-grow flex overflow-hidden">
        {/* Left Panel */}
        <div className="overflow-y-auto p-6" style={{ width: `${leftPanelWidth}%` }}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">{combined.title}</h1>
            <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
              combined.difficulty === 'easy' ? 'bg-green-500/10 text-green-400' :
              combined.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
              'bg-red-500/10 text-red-400'
            }`}>{combined.difficulty}</span>
          </div>

          <div className="flex gap-4 text-xs text-slate-400 mb-4">
            <span>Time: <strong>{combined.timeComplexity || 'N/A'}</strong></span>
            <span>Space: <strong>{combined.spaceComplexity || 'N/A'}</strong></span>
            <span>Avg Time: <strong>10 min</strong></span>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
            <p>{combined.description}</p>

            <h3 className="text-white font-semibold">Input Format:</h3>
            <pre className="bg-slate-800 p-3 rounded-lg text-sm">
              {combined?.Testcase_detail?.inputFormat}
            </pre>

            <h3 className="text-white font-semibold">Output Format:</h3>
            <pre className="bg-slate-800 p-3 rounded-lg text-sm">
              {combined?.Testcase_detail?.outputFormat}
            </pre>
          </div>

          <h2 className="text-lg font-semibold text-white mt-6 mb-2">Sample Test Case File</h2>
          <div className="bg-slate-800 p-4 rounded-lg text-sm text-slate-300 whitespace-pre-wrap">
            {combined?.Testcase_detail?.isSample || 'No sample test case available.'}
          </div>
        </div>

        {/* Resizer */}
        <div onMouseDown={handleMouseDown} className="w-1.5 cursor-col-resize bg-slate-700 hover:bg-indigo-500 transition-colors flex-shrink-0"></div>

        {/* Right Panel */}
        <div className="flex flex-col" style={{ width: `${100 - leftPanelWidth}%` }}>
          <div className="flex-shrink-0 p-2 border-b border-slate-700 flex justify-between items-center">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="py-1 px-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none text-sm">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
            <button className="p-2 text-slate-400 hover:text-white"><FaCog /></button>
          </div>

          <div className="flex-grow bg-[#1e1e1e]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-white font-mono p-4 resize-none border-none outline-none"
              spellCheck="false"
            />
          </div>

          <div className="flex-shrink-0 h-1/3 border-t border-slate-700 flex flex-col">
            <div className="p-2 flex justify-end gap-2 border-b border-slate-700">
              <button className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1.5 px-4 rounded-lg text-sm flex items-center gap-2">
                <FaPlay /> Run Code
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 bg-slate-900">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                {output || 'Run your code to see the output here.'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingInterface;
