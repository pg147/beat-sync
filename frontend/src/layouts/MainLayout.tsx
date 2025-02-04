// React imports
import { useEffect, useState } from "react";

// Outlet from react-router-dom
import { Outlet } from "react-router-dom";

// Shadcn Imports
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

// Components
import { FriendsActivity, LeftSideBar, PlaybackControls } from "@/components";
import MobileNavbar from "@/components/MobileNavbar";

export default function MainLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [])

  return (
    <div className="w-full h-screen flex flex-col">
      {isMobile && <MobileNavbar />}

      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
        {!isMobile && (
          <>
            {/* Left Sidebar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={20}>
              <LeftSideBar />
            </ResizablePanel>

            {/* Control for resizing */}
            <ResizableHandle />
          </>
        )}

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 100 : 60}>
          <Outlet />
        </ResizablePanel>

        {!isMobile && (
          <>
            {/* Control for resizing */}
            <ResizableHandle />

            {/* Friends Activity */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={20} collapsedSize={0}>
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <PlaybackControls />
    </div>
  )
}
