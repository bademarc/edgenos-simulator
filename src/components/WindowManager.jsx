import React, { useEffect, useRef } from 'react';
import 'winbox/dist/css/themes/modern.min.css';
import 'winbox/dist/css/winbox.min.css';

// Create a WindowManager component that uses the WinBox library
const WindowManager = ({ 
  windowType, 
  isOpen, 
  onClose, 
  onMinimize, 
  onFocus,
  children,
  config
}) => {
  const winboxRef = useRef(null);
  const contentRef = useRef(null);

  // Initialize WinBox when the component mounts or when isOpen changes
  useEffect(() => {
    // Only create a window if it's supposed to be open and doesn't already exist
    if (isOpen && !winboxRef.current) {
      // Create a container for the window content
      const contentElement = document.createElement('div');
      contentElement.className = `window-content ${windowType}-window`;
      contentRef.current = contentElement;

      // Dynamically import WinBox
      import('winbox').then(WinBoxModule => {
        const WinBox = WinBoxModule.default;
        
        // Create the WinBox instance
        winboxRef.current = new WinBox({
          title: config.title,
          width: config.width,
          height: config.height,
          x: config.x,
          y: config.y,
          class: config.class,
          mount: contentElement,
          onclose: () => {
            onClose(windowType);
            return false; // Prevent default close behavior
          },
          onminimize: () => {
            onMinimize(windowType);
            return false; // Prevent default minimize behavior
          },
          onfocus: () => {
            onFocus(windowType);
          }
        });

        // Render the content
        if (contentRef.current) {
          // If children is a function, call it with the content element
          if (typeof children === 'function') {
            children(contentRef.current);
          }
        }
      }).catch(error => {
        console.error('Failed to load WinBox:', error);
      });
    }

    // Clean up when the component unmounts or when isOpen changes to false
    return () => {
      if (winboxRef.current) {
        winboxRef.current.close();
        winboxRef.current = null;
      }
    };
  }, [isOpen, windowType, config, onClose, onMinimize, onFocus, children]);

  // Handle focus and restore
  useEffect(() => {
    if (isOpen && winboxRef.current) {
      winboxRef.current.focus();
    }
  }, [isOpen]);

  // This component doesn't render anything directly
  return null;
};

export default WindowManager;
