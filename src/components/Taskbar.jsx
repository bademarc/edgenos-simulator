import React, { useState, useEffect } from 'react';
import './Taskbar.css';

const Taskbar = ({ openWindows, toggleWindow, minimizedWindows }) => {
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const handleWindowClick = (window) => {
    toggleWindow(window);
    // Close start menu when opening a window
    setStartMenuOpen(false);
  };

  // Format window title for display
  const formatWindowTitle = (key) => {
    switch(key) {
      case 'node':
        return 'Run Node';
      case 'tasks':
        return 'Verification Tasks';
      case 'stats':
        return 'Network Stats';
      case 'explorer':
        return 'File Explorer';
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  return (
    <div className="taskbar">
      <div className="taskbar-start">
        <button
          className={`start-button ${startMenuOpen ? 'active' : ''}`}
          onClick={toggleStartMenu}
        >
          <span className="start-logo">E</span>
          <span style={{color: "white", fontWeight: "bold"}}>Start</span>
        </button>

        {startMenuOpen && (
          <div className="start-menu">
            <div className="start-menu-header">
              <span className="start-menu-title">edgenOS</span>
            </div>
            <div className="start-menu-items">
              <div className="menu-category">Applications</div>
              <div className="menu-item" onClick={() => handleWindowClick('node')}>
                <div className="menu-icon node-icon"></div>
                <span>Run Node</span>
              </div>
              <div className="menu-item" onClick={() => handleWindowClick('tasks')}>
                <div className="menu-icon tasks-icon"></div>
                <span>Verification Tasks</span>
              </div>
              <div className="menu-item" onClick={() => handleWindowClick('wallet')}>
                <div className="menu-icon wallet-icon"></div>
                <span>Wallet</span>
              </div>
              <div className="menu-item" onClick={() => handleWindowClick('stats')}>
                <div className="menu-icon stats-icon"></div>
                <span>Stats</span>
              </div>
              <div className="menu-item" onClick={() => handleWindowClick('explorer')}>
                <div className="menu-icon explorer-icon"></div>
                <span>File Explorer</span>
              </div>
              <div className="menu-item" onClick={() => handleWindowClick('terminal')}>
                <div className="menu-icon terminal-icon"></div>
                <span>Terminal</span>
              </div>

              <div className="menu-divider"></div>
              <div className="menu-category">System</div>
              <div className="menu-item" onClick={() => handleWindowClick('settings')}>
                <div className="menu-icon settings-icon"></div>
                <span>Settings</span>
              </div>
              <div className="menu-item" onClick={() => handleWindowClick('help')}>
                <div className="menu-icon help-icon"></div>
                <span>Help</span>
              </div>
              <div className="menu-divider"></div>
              <div className="menu-item">
                <div className="menu-icon power-icon"></div>
                <span>Power Off</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="taskbar-windows">
        {Object.entries(openWindows).map(([key, isOpen]) => {
          if (isOpen || minimizedWindows[key]) {
            return (
              <div
                key={key}
                className={`taskbar-window ${isOpen ? 'active' : ''}`}
                onClick={() => toggleWindow(key)}
              >
                <div className={`window-icon ${key}-icon`}></div>
                <span>{formatWindowTitle(key)}</span>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="taskbar-tray">
        <div className="tray-icon network-icon" title="Network Connected"></div>
        <div className="tray-icon volume-icon" title="Volume"></div>
        <div className="taskbar-time" title={time.toDateString()}>{formatTime()}</div>
      </div>
    </div>
  );
};

export default Taskbar;
