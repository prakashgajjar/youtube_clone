import "./index.css";
import "./App.css";
import HomePage from "./components/Pages/HomePage";
import UserSign from "./components/components/UserSign";
import { AppProvider } from "./Hooks/AppContext";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ChannelPage from "./components/Pages/ChannelPage";
import LeftSide from "./components/Main/LeftSide";
import Header from "./components/headers/Header";
import NotFound404 from "./components/components/NotFound404";
import VideoUploadPage from "./components/Pages/VideoUploadPage";
import AuthUser from "./components/components/AuthUser";
import SteamVideoPage from "./components/Pages/SteamVideoPage";
import GroupHistoryVideo from "./components/WatchHistory/GroupHistoryVideo";
import GroupYourVideo from "./components/YourVideos/GroupYourVideo";
import GroupLikedVideo from "./components/LikedVideos/GroupLikedVideo";
import GroupWatchVideo from "./components/WatchLater/GroupWatchVideo";
import GropuSearchVideos from "./components/Search/GropuSearchVideos";
import SubscriptionVideoGroup from "./components/Subscriptions/SubscriptionVideoGroup";
import GroupShorts from "./components/Shorts/GroupShorts";
import ChannelVideos from "./components/channelSubPages/ChannelVideos";
import ChannelShorts from "./components/channelSubPages/ChannelShorts";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check token on every route change
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [location.pathname]);


  const isAuthPage = location.pathname === "/";
  const isVideoRunning = /^\/video\/[a-zA-Z0-9]+$/.test(location.pathname);
  const isUploadPage = location.pathname === "/upload/video";
  const isNotFoundPage =
    location.pathname === "/404" || location.pathname === "/notfound";

  // ✅ Protected route
  const ProtectedRoute = ({ element }) =>
    isAuthenticated ? element : <Navigate to="/" replace />;

  // ✅ Public route (for login page)
  const PublicRoute = ({ element }) =>
    !isAuthenticated ? element : <Navigate to="/home" replace />;

  // ✅ Hide layout on auth/upload/video/notfound pages
  const hideLayout =
    isAuthPage || isUploadPage || isVideoRunning || isNotFoundPage;

  // ✅ if not authenticated and tries ANY other route (even wrong one)
  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  return (
    <AppProvider>
      <div className="w-screen h-screen overflow-hidden main">
        <AuthUser />

        {/* Header */}
        {!hideLayout && <Header />}

        <div className="mt-1 flex">
          {/* Sidebar */}
          {!hideLayout && (
            <div className="h-full w-[264px] px-4 -mt-1">
              <LeftSide />
            </div>
          )}

          {/* Routes */}
          <Routes>
            {/* Public */}
            <Route path="/" element={<PublicRoute element={<UserSign />} />} />

            {/* Protected */}
            <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
            <Route
              path="/video/:id"
              element={<ProtectedRoute element={<SteamVideoPage />} />}
            />

            <Route
              path="/channel/:id"
              element={<ProtectedRoute element={<ChannelPage />} />}
            >
              <Route index element={<Navigate to="videos" replace />} />
              <Route
                path="videos"
                element={<ProtectedRoute element={<ChannelVideos />} />}
              />
              <Route
                path="shorts"
                element={<ProtectedRoute element={<ChannelShorts />} />}
              />
            </Route>

            <Route
              path="/upload/video"
              element={<ProtectedRoute element={<VideoUploadPage />} />}
            />
            <Route
              path="/my/history"
              element={<ProtectedRoute element={<GroupHistoryVideo />} />}
            />
            <Route
              path="/my/myvideos"
              element={<ProtectedRoute element={<GroupYourVideo />} />}
            />
            <Route
              path="/my/likedvideos"
              element={<ProtectedRoute element={<GroupLikedVideo />} />}
            />
            <Route
              path="/my/watchlater"
              element={<ProtectedRoute element={<GroupWatchVideo />} />}
            />
            <Route
              path="/results/search"
              element={<ProtectedRoute element={<GropuSearchVideos />} />}
            />
            <Route
              path="/feed/subscriptions"
              element={<ProtectedRoute element={<SubscriptionVideoGroup />} />}
            />
            <Route
              path="/shorts/:id"
              element={<ProtectedRoute element={<GroupShorts />} />}
            />

            {/* 404 - only for authenticated users */}
            <Route path="*" element={<ProtectedRoute element={<NotFound404 />} />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
