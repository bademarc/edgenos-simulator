import React, { useEffect, useRef, useState } from 'react';
import 'winbox/dist/css/themes/modern.min.css';
import 'winbox/dist/css/winbox.min.css';

const ReactWinBox = ({
  title,
  width,
  height,
  x,
  y,
  className,
  children,
  isOpen,
  onClose,
  onMinimize,
  onFocus
}) => {
  const winboxRef = useRef(null);
  const contentRef = useRef(null);
  const [isWinboxLoaded, setIsWinboxLoaded] = useState(false);
  const [isContentRendered, setIsContentRendered] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(!!window.WinBox);
  const instanceIdRef = useRef(`winbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Load WinBox script if not already loaded
  useEffect(() => {
    // Check if WinBox is already loaded
    if (window.WinBox && !isScriptLoaded) {
      console.log('WinBox already loaded in window object');
      setIsScriptLoaded(true);
      return;
    }

    if (!window.WinBox && !isScriptLoaded) {
      console.log('Loading WinBox script...');
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/winbox@0.2.82/dist/winbox.bundle.min.js';
      script.async = true;

      script.onload = () => {
        console.log('WinBox script loaded successfully');

        // Patch WinBox to prevent auto-closing and fix issues
        if (window.WinBox) {
          // Store the original WinBox constructor
          const originalWinBox = window.WinBox;

          // Create a new constructor that wraps the original
          window.WinBox = function(params) {
            // Force autoclose to false and add other fixes
            const newParams = {
              ...params,
              autoclose: false,
              max: false // Disable maximize button
            };

            // Create the WinBox instance
            const instance = new originalWinBox(newParams);

            // Add custom properties to track this instance
            instance._id = instanceIdRef.current;
            instance._title = params.title || 'Window';

            // Override the close method to prevent accidental closing
            const originalClose = instance.close;
            instance.close = function(force) {
              if (force === true) {
                return originalClose.call(this);
              }
              // Just hide the window instead of closing it
              this.hide();
              return this;
            };

            // Override the minimize method
            const originalMinimize = instance.minimize;
            instance.minimize = function(force) {
              console.log(`Custom minimize called for ${instance._title}`);
              if (params.onminimize) {
                params.onminimize();
              }
              return this;
            };

            return instance;
          };

          // Copy prototype and properties
          window.WinBox.prototype = originalWinBox.prototype;
          Object.setPrototypeOf(window.WinBox, originalWinBox);

          console.log('WinBox patched to prevent auto-closing and fix issues');
        }

        setIsScriptLoaded(true);
      };

      script.onerror = (error) => {
        console.error('Error loading WinBox script:', error);
      };

      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [isScriptLoaded]);

  // Create or destroy WinBox instance based on isOpen state
  useEffect(() => {
    // Only proceed if WinBox is loaded
    if (!window.WinBox) {
      console.log('WinBox not loaded yet, waiting...');
      return;
    }

    if (isOpen && !winboxRef.current) {
      try {
        console.log(`Creating window: ${title}`);

        // Create content container if it doesn't exist
        if (!contentRef.current) {
          contentRef.current = document.createElement('div');
          contentRef.current.className = `window-content ${className || ''}`;
          contentRef.current.id = `winbox-content-${instanceIdRef.current}`;

          // Add event listeners to prevent event propagation
          contentRef.current.addEventListener('click', (e) => {
            e.stopPropagation();
          });

          document.body.appendChild(contentRef.current);
        }

        // Create WinBox instance with specific options to prevent auto-closing
        winboxRef.current = new window.WinBox({
          title: title || 'Window',
          width: width || 500,
          height: height || 400,
          x: x || 'center',
          y: y || 'center',
          class: `${className || ''} no-full`,
          mount: contentRef.current,
          autoclose: false, // Prevent auto-closing
          max: false, // Disable maximize button
          onclose: () => {
            console.log(`Window close button clicked: ${title}`);
            if (onClose) {
              onClose();
            }
            return false; // Prevent default close behavior
          },
          onminimize: () => {
            console.log(`Window minimize button clicked: ${title}`);
            if (onMinimize) {
              onMinimize();
            }
            return false; // Prevent default minimize behavior
          },
          onfocus: () => {
            console.log(`Window focused: ${title}`);
            if (onFocus) {
              onFocus();
            }
          }
        });

        // Set a flag on the window to identify it
        if (winboxRef.current) {
          winboxRef.current._id = instanceIdRef.current;
          winboxRef.current._title = title;

          // Remove the maximize button
          const winboxElement = document.querySelector(`.wb-${instanceIdRef.current}`);
          if (winboxElement) {
            const maxButton = winboxElement.querySelector('.wb-max');
            if (maxButton) {
              maxButton.style.display = 'none';
            }
          }
        }

        setIsWinboxLoaded(true);

        // Render content after WinBox is created
        if (contentRef.current && typeof children === 'function') {
          console.log(`Rendering content for: ${title}`);

          // Add a wrapper to prevent event propagation
          const wrapper = document.createElement('div');
          wrapper.className = 'winbox-content-wrapper';
          wrapper.style.width = '100%';
          wrapper.style.height = '100%';
          wrapper.style.overflow = 'auto';

          // Add event listeners to prevent event propagation
          wrapper.addEventListener('click', (e) => {
            e.stopPropagation();
          });

          contentRef.current.appendChild(wrapper);

          // Call the children function with the wrapper
          children(wrapper);
          setIsContentRendered(true);
        }
      } catch (error) {
        console.error(`Error creating WinBox for ${title}:`, error);
      }
    } else if (!isOpen && winboxRef.current) {
      try {
        console.log(`Closing window: ${title}`);
        winboxRef.current.close(true); // Force close
        winboxRef.current = null;
        setIsWinboxLoaded(false);
        setIsContentRendered(false);
      } catch (error) {
        console.error(`Error closing WinBox for ${title}:`, error);
      }
    }

    // Clean up when component unmounts
    return () => {
      if (winboxRef.current) {
        try {
          console.log(`Cleaning up window: ${title}`);
          winboxRef.current.close(true); // Force close
          winboxRef.current = null;
        } catch (error) {
          console.error(`Error cleaning up WinBox for ${title}:`, error);
        }
      }

      // Only remove the content element if we're actually unmounting
      if (contentRef.current && contentRef.current.parentNode) {
        contentRef.current.parentNode.removeChild(contentRef.current);
        contentRef.current = null;
      }
    };
  }, [isOpen, isScriptLoaded, title, width, height, x, y, className, onClose, onMinimize, onFocus]);

  // Update content when children changes
  useEffect(() => {
    if (isWinboxLoaded && contentRef.current && typeof children === 'function' && isOpen) {
      console.log(`Updating content for: ${title}`);
      try {
        // Find the wrapper element
        const wrapper = contentRef.current.querySelector('.winbox-content-wrapper');
        if (wrapper) {
          // Clear the wrapper
          wrapper.innerHTML = '';

          // Call the children function with the wrapper
          children(wrapper);
        } else {
          console.error(`Wrapper element not found for ${title}`);
        }
      } catch (error) {
        console.error(`Error updating content for ${title}:`, error);
      }
    }
  }, [isWinboxLoaded, children, title, isOpen]);

  // This component doesn't render anything directly
  return null;
};

export default ReactWinBox;
