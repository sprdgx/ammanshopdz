import "./topbar.css";
import SettingsIcon from "@mui/icons-material/Settings";
import MN from '../../assets/MN.png'
import { Link, useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { useState } from "react";



export default function TopBar() {

  const location = useLocation();
  const isOrdersPage = location.pathname === '/orders';
  const [showText, setShowText] = useState(true);

  const handleClick = () => {
    setShowText(!showText);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="logo">
            <img
            src={MN}
            alt=""
            className="topLogo"
          />
          </div>
        </div>
        <div className="topCenter">
        <div>
            <Link
              to={isOrdersPage ? '/' : '/orders'}
              className="link"
              onClick={handleClick}
            >
                <span>
                  <CSSTransition
                    in={showText}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                  >
                    <span className="text">Orders</span>
                  </CSSTransition>
                  <CSSTransition
                    in={!showText}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                  >
                    <span className="text">Products</span>
                  </CSSTransition>
                </span>
            </Link>
          </div>
        </div>
      <div className="topRight">
          <div className="topbarIconContainer">
          <SettingsIcon/>
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
