import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import OurWork from "./pages/OurWork";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Media from "./pages/Media";
import GetInvolved from "./pages/GetInvolved";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./components/admin/AdminLayout";
import AdminContentManager from "./components/admin/AdminContentManager";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public NGO site */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/media" element={<Media />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
      </Route>

      {/* Admin auth (no sidebar) */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/reset-password/:token" element={<ResetPassword />} />

      {/* Admin console (protected, with sidebar) */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
         <Route path="/admin/dashboard" element={<Dashboard />} />

         {/* Admin content management (admin role only) */}
         <Route
           path="/admin/banners"
           element={
             <ProtectedRoute allowedRoles={["admin"]}>
               <AdminContentManager resource="banners" title="Image Slider" />
             </ProtectedRoute>
           }
         />
         <Route
           path="/admin/vision-mission"
           element={
             <ProtectedRoute allowedRoles={["admin"]}>
               <AdminContentManager resource="vision-mission" title="Vision & Mission" />
             </ProtectedRoute>
           }
         />
         <Route
           path="/admin/statistics"
           element={
             <ProtectedRoute allowedRoles={["admin"]}>
               <AdminContentManager resource="statistics" title="Statistics" />
             </ProtectedRoute>
           }
         />
         <Route
           path="/admin/initiatives"
           element={
             <ProtectedRoute allowedRoles={["admin"]}>
               <AdminContentManager resource="initiatives" title="Initiatives" />
             </ProtectedRoute>
           }
         />
         <Route
           path="/admin/content"
           element={
             <ProtectedRoute allowedRoles={["admin"]}>
               <AdminContentManager resource="page-content" title="Page Content" />
             </ProtectedRoute>
           }
         />
       </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
