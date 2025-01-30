// Outlet from react-router-dom
import { Outlet } from "react-router-dom";

// Shadcn Imports
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function MainLayout() {
  const isMobile = false;

  return (
    <div className="w-full h-screen flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          Left Side bar
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
        <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}> 
          Friends Activity
        </ResizablePanel>
      </ResizablePanelGroup>

    </div>
  )
}
