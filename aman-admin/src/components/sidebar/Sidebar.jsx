import "./sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Sidebar({ showSideBar }) {
  const sideBar = useRef();

  useEffect(() => {
    if (!showSideBar) {
      gsap.to(sideBar.current, 0.3, {
        x: -sideBar.current.offsetWidth,
        onComplete: () => {
          sideBar.current.style.display = "none";
        },
      });
    } else {
      sideBar.current.style.display = "block";
      gsap.to(sideBar.current, 0.6, {
        x: 0,
      });
    }
  }, [showSideBar]);

  return (
    <div className="sidebar" ref={sideBar}>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyleIcon className="sidebarIcon" />
                <span>Home</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                <span>Admins</span>
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                <span>Products</span>
              </li>
            </Link>
            <Link to="/orders" className="link">
            <li className="sidebarListItem">
              <AttachMoneyIcon className="sidebarIcon" />
              <span>Orders</span>
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <SettingsIcon className="sidebarIcon" />
              <span>Settings</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
