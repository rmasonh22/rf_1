import SidebarContent from "./SidebarContent";

function DesktopSideBar() {
  return (
    /* Static sidebar for desktop */
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <SidebarContent />
    </div>
  );
}

export default DesktopSideBar;
