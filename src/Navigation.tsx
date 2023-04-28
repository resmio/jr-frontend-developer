import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import App from "./App";

export default function Navigation () {
    const { pathname } = useLocation();

    // scroll to top of page after navigation
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
    <Routes>
        {/* #4 set up routing and redirect to '/new' from non-existing routes */}
        <Route path="*" element={<Navigate to="/new" replace />} />
        <Route path="/new" element={<App isLikedPage={false} />} />
        <Route path="/liked" element={<App isLikedPage={true} />} />
    </Routes>
    )
}