import React from 'react';
import { slide as Menu } from 'react-burger-menu';

// Example Tailwind classes for custom styles
const styles = {
  bmBurgerButton: {
    position: 'relative',
    width: '20px',
    height: '20px',
    left: '0px',
    top: '0px',
  },
  bmBurgerBars: {
    background: '#4B5563', // Tailwind's gray-700
  },
  bmBurgerBarsHover: {
    background: '#EF4444', // Tailwind's red-500
  },
  bmCrossButton: {
    height: '20px',
    width: '20px',
  },
  bmCross: {
    background: '#D1D5DB', // Tailwind's gray-300
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#1F2937', // Tailwind's gray-800
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#1F2937',
  },
  bmItemList: {
    color: '#E5E7EB', // Tailwind's gray-100
    padding: '0.8em',
  },
  bmItem: {
    display: 'block',
    padding: '10px 0',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

function SlideMenu() {
  return (
    <div id="outer-container">
      {/* Sidebar Menu */}
      <Menu styles={styles} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
        <a id="home" className="menu-item text-gray-200 hover:text-red-500" href="/">
          Home
        </a>
        <a id="about" className="menu-item text-gray-200 hover:text-red-500" href="/about">
          About
        </a>
        <a id="contact" className="menu-item text-gray-200 hover:text-red-500" href="/contact">
          Contact
        </a>
      </Menu>

    </div>
  );
}

export default SlideMenu;
