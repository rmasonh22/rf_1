import MobileNavBar from "./MobileNavBar";
import DesktopSideBar from "./DesktopSideBar";
import MobileSideBar from "./MobileSideBar";

function NavigationContainer({ children }) {
  return (
    <div>
      <MobileSideBar />

      <DesktopSideBar />
      <div className="flex flex-1 flex-col md:pl-64">
        <MobileNavBar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default NavigationContainer;
