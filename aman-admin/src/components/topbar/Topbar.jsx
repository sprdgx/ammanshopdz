import "./topbar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
export default function TopBar({ handleSideBarClick, showSideBar }) {
  const cssProperties = {
    width: "44px",
    height: "40px",
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="logo">
            {" "}
            {showSideBar ? (
              <CloseIcon
                className="menuIcon"
                style={cssProperties}
                onClick={handleSideBarClick}
              />
            ) : (
              <MenuIcon
                className="menuIcon"
                style={cssProperties}
                onClick={handleSideBarClick}
              />
            )}{" "}
            {/* <AddShoppingCartIcon
              style={{
                position: "relative",
                top: "4px",
                width: "44px",
                height: "40px",
              }}
            />{" "} */}
            <span>Aman Shop</span>
          </div>
        </div>
{/*         <div className="topRight">
          <div className="topbarIconContainer">
          <SettingsIcon/>
          </div>

          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div> */}
      </div>
    </div>
  );
}
