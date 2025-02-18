import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';

const HomePage = React.lazy(() => import('./components/HomePage'));
const QuizPlatform = React.lazy(() => import('./components/QuizPlatform'));
const QuizHistory = React.lazy(() => import('./components/QuizHistory'));

//Note:- Old routing setup
const App = () => {
  return (
    <Router Router >
      <Suspense fallback={<div className='w-full h-screen flex items-center justify-center animate-pulse'>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPlatform />} />
          <Route path="/history" element={<QuizHistory />} />
        </Routes>
      </Suspense>
    </Router >
  );
};

export default App;
