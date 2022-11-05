import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CreatePostPage from './pages/CreatePostPage';
import RegisterPage from './pages/RegisterPage';
import MyPostsPage from './pages/MyPostsPage';
import SinglePostPage from './pages/SinglePostPage';
import RegisterDataPage from './pages/RegisterDataPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutPage from './pages/LogoutPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/:token" element={<RegisterDataPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/posts" element={<MyPostsPage />} />
            <Route path="/post/:id" element={<SinglePostPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
