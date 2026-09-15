import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import OurWork from "./pages/public/OurWork";
import Projects from "./pages/public/Projects";
import ProjectDetail from "./pages/public/ProjectDetail";
import Media from "./pages/public/Media";
import GetInvolved from "./pages/public/GetInvolved";
import Blog from "./pages/public/Blog";
import BlogPost from "./pages/public/BlogPost";
import Contact from "./pages/public/Contact";
import Donate from "./pages/public/Donate";
import NotFound from "./pages/public/NotFound";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";
import ContentMgmt from "./pages/admin/ContentMgmt";
import ProjectMgmt from "./pages/admin/ProjectMgmt";
import DonationMgmt from "./pages/admin/DonationMgmt";
import MediaMgmt from "./pages/admin/MediaMgmt";
import EventMgmt from "./pages/admin/EventMgmt";
import VolunteerMgmt from "./pages/admin/VolunteerMgmt";
import BlogMgmt from "./pages/admin/BlogMgmt";
import EnquiryMgmt from "./pages/admin/EnquiryMgmt";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
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

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/reset-password/:token" element={<ResetPassword />} />

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/content" element={<ContentMgmt />} />
        <Route path="/admin/projects" element={<ProjectMgmt />} />
        <Route path="/admin/donations" element={<DonationMgmt />} />
        <Route path="/admin/media" element={<MediaMgmt />} />
        <Route path="/admin/events" element={<EventMgmt />} />
        <Route path="/admin/volunteers" element={<VolunteerMgmt />} />
        <Route path="/admin/blog" element={<BlogMgmt />} />
        <Route path="/admin/enquiries" element={<EnquiryMgmt />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}