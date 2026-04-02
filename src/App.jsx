import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Courses from './pages/Courses';
import CoursePlayer from './pages/CoursePlayer';
import Certificates from './pages/Certificates';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Landing />} />

        {/* Dashboard Routes with Layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Courses />} />
          <Route path="courses/:id" element={<CoursePlayer />} />
          <Route path="projects" element={<Projects />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
