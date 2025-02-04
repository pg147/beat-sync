// Outlet from react-router-dom
import { Outlet } from "react-router-dom";

// Shadcn Imports
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

// Components
import { FriendsActivity, LeftSideBar } from "@/components";
import PlaybackControls from "@/components/PlaybackControls";

export default function MainLayout() {
  const isMobile = false;

  return (
    <div className="w-full h-screen flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={20}>
          <LeftSideBar />
        </ResizablePanel>

        {/* Control for resizing */}
        <ResizableHandle />
        
        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {/* Control for resizing */}
        <ResizableHandle />

        {/* Friends Activity */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={20} collapsedSize={0}> 
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>

      <PlaybackControls />
    </div>
  )
}
