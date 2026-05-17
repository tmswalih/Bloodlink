import { useState } from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {/* We pass the toggle function down via a custom event or we can wrap the trigger button in children */}
      {/* For now, we'll let components trigger the toggle via a window event or similar if needed, 
          but a better way for this project scale is to just use a global click listener or pass it down. 
          In this case, since we need to modify Home/Login/Register anyway, let's keep it simple. */}
      {children(toggleSidebar)}
    </>
  );
}

export default Layout;
