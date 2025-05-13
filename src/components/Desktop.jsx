import React, { useState, useEffect, useRef } from 'react';
import { NodeIcon, TasksIcon, WalletIcon, StatsIcon, MerkleIcon } from './Icons';
import Taskbar from './Taskbar';
import './Desktop.css';
import ReactWinBox from './ReactWinBox';
import SoundEffects from '../utils/SoundEffects';
import AnimationEffects from '../utils/AnimationEffects';

const Desktop = () => {
  // State for window visibility
  const [windows, setWindows] = useState({
    node: false,
    tasks: false,
    wallet: false,
    stats: false,
    terminal: false,
    settings: false,
    help: false,
    explorer: false,
    verification: false,
    distribution: false,
    merkle: false
  });

  // State for minimized windows
  const [minimizedWindows, setMinimizedWindows] = useState({
    node: false,
    tasks: false,
    wallet: false,
    stats: false,
    terminal: false,
    settings: false,
    help: false,
    explorer: false,
    verification: false,
    distribution: false,
    merkle: false
  });

  // User profile state
  const [user, setUser] = useState({
    loggedIn: false,
    username: '',
    avatar: '',
    level: 1,
    experience: 0
  });

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Application states
  const [cpuUsage, setCpuUsage] = useState(5);
  const [memoryUsage, setMemoryUsage] = useState(100);
  const [walletBalance, setWalletBalance] = useState(0);
  const [networkStats, setNetworkStats] = useState({
    activeNodes: 1000,
    totalVerifications: 5000,
    blockHeight: 12345,
    hashRate: 500,
    verifiedProofs: 2500,
    pendingAggregation: 150,
    anchoredToL1: 1200
  });

  // Enhanced task system with verification thresholds
  const [tasks, setTasks] = useState([
    {
      id: 1,
      status: 'Pending',
      reward: 0.1,
      difficulty: 'Easy',
      description: 'Verify transaction proof segment A-1',
      verificationThreshold: 5,
      currentVerifications: 0,
      verifiers: []
    },
    {
      id: 2,
      status: 'Pending',
      reward: 0.2,
      difficulty: 'Medium',
      description: 'Verify smart contract execution proof B-7',
      verificationThreshold: 7,
      currentVerifications: 2,
      verifiers: ['Node192', 'Node375']
    },
    {
      id: 3,
      status: 'Pending',
      reward: 0.3,
      difficulty: 'Hard',
      description: 'Verify ZK-proof segment C-3',
      verificationThreshold: 10,
      currentVerifications: 4,
      verifiers: ['Node047', 'Node128', 'Node512', 'Node601']
    },
    {
      id: 4,
      status: 'Completed',
      reward: 0.15,
      difficulty: 'Medium',
      description: 'Verify transaction batch D-9',
      verificationThreshold: 5,
      currentVerifications: 5,
      verifiers: ['Node192', 'Node375', 'Node047', 'Node128', 'Node601']
    }
  ]);

  // Task distribution system
  const [distributionQueue, setDistributionQueue] = useState([
    { id: 101, type: 'Transaction Proof', segments: 8, priority: 'High', status: 'Distributing' },
    { id: 102, type: 'Smart Contract Verification', segments: 12, priority: 'Medium', status: 'Queued' },
    { id: 103, type: 'ZK-Proof Validation', segments: 20, priority: 'Low', status: 'Queued' }
  ]);

  // Aggregation layer state
  const [aggregationStats, setAggregationStats] = useState({
    pendingBatches: 3,
    completedBatches: 17,
    lastAnchorTime: new Date(Date.now() - 1800000).toISOString(),
    nextAnchorEstimate: new Date(Date.now() + 1200000).toISOString(),
    targetChain: 'Bitcoin'
  });

  // User participation stats
  const [participationStats, setParticipationStats] = useState({
    totalParticipants: 2457,
    activeNodes: 1843,
    yourContributions: 0,
    yourRank: 'Unranked',
    topContributors: [
      { id: 'Node047', contributions: 128 },
      { id: 'Node375', contributions: 112 },
      { id: 'Node192', contributions: 97 },
      { id: 'Node601', contributions: 85 },
      { id: 'Node128', contributions: 79 }
    ]
  });

  // File system simulation
  const [files, setFiles] = useState({
    'Documents': {
      type: 'folder',
      children: {
        'edgenOS_whitepaper.txt': { type: 'file', content: 'edgenOS is a revolutionary verification layer...' },
        'rewards.txt': { type: 'file', content: 'Current reward rate: 0.1 EDGEN per verification' },
        'verification_guide.txt': { type: 'file', content: 'Each task requires multiple independent verifications to ensure integrity.' }
      }
    },
    'Applications': {
      type: 'folder',
      children: {
        'Node': { type: 'app', link: 'node' },
        'Wallet': { type: 'app', link: 'wallet' },
        'Tasks': { type: 'app', link: 'tasks' },
        'Verification': { type: 'app', link: 'verification' },
        'Distribution': { type: 'app', link: 'distribution' },
        'Merkle Commitments': { type: 'app', link: 'merkle' }
      }
    },
    'System': {
      type: 'folder',
      children: {
        'config.json': { type: 'file', content: '{"theme":"dark","notifications":true}' },
        'logs.txt': { type: 'file', content: 'System initialized successfully.' },
        'aggregation_config.json': { type: 'file', content: '{"targetChain":"Bitcoin","anchorInterval":3600,"batchSize":100}' }
      }
    }
  });

  // Current directory for file explorer
  const [currentDirectory, setCurrentDirectory] = useState('/');

  // Terminal command history
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');

  // We don't need winboxRefs anymore as we're using contentRefs

  // DOM refs for window content
  const contentRefs = {
    node: useRef(null),
    tasks: useRef(null),
    wallet: useRef(null),
    stats: useRef(null),
    terminal: useRef(null),
    settings: useRef(null),
    help: useRef(null),
    explorer: useRef(null),
    verification: useRef(null),
    distribution: useRef(null),
    merkle: useRef(null)
  };

  // Update CPU usage and memory usage every 2 seconds
  useEffect(() => {
    let interval;
    if (windows.node) {
      interval = setInterval(() => {
        setCpuUsage(Math.floor(Math.random() * 20) + 5);
        setMemoryUsage(Math.floor(Math.random() * 200) + 80);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [windows.node]);

  // Update network stats every 5 seconds
  useEffect(() => {
    let interval;
    if (windows.stats) {
      interval = setInterval(() => {
        setNetworkStats(prev => ({
          ...prev,
          activeNodes: prev.activeNodes + Math.floor(Math.random() * 10) - 3,
          totalVerifications: prev.totalVerifications + Math.floor(Math.random() * 20),
          blockHeight: prev.blockHeight + (Math.random() > 0.7 ? 1 : 0),
          hashRate: prev.hashRate + Math.floor(Math.random() * 20) - 10
        }));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [windows.stats]);

  const handleVerification = (taskId) => {
    // Find the task
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Generate a random node ID for this verification
    const nodeId = `Node${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    // Check if task is already completed
    if (task.status === 'Completed') {
      SoundEffects.playError();
      SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.ERROR);
      addNotification('Task Completed', 'This task has already been verified', 'info');
      return;
    }

    // Check if we've already reached the threshold
    if (task.currentVerifications >= task.verificationThreshold) {
      SoundEffects.playError();
      SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.ERROR);
      addNotification('Verification Limit', 'This task has reached its verification threshold', 'warning');
      return;
    }

    // Add subtle professional feedback
    setTimeout(() => {
      // Find the button that was clicked
      const verifyButton = document.querySelector(`.verify-button[data-task-id="${taskId}"]`);
      if (verifyButton) {
        // Add a professional highlight class
        verifyButton.classList.add('professional-button-highlight');

        // Remove the highlight class after a short time
        setTimeout(() => {
          verifyButton.classList.remove('professional-button-highlight');
        }, 800);
      }
    }, 0);

    // Update task with new verification
    const updatedTask = {
      ...task,
      currentVerifications: task.currentVerifications + 1,
      verifiers: [...task.verifiers, nodeId]
    };

    // Check if we've reached the threshold with this verification
    if (updatedTask.currentVerifications >= updatedTask.verificationThreshold) {
      updatedTask.status = 'Completed';

      // Play completion sound
      SoundEffects.playLevelComplete();
      SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.LEVEL_COMPLETE);

      // Update participation stats with visual feedback
      setParticipationStats(prev => {
        const newContributions = prev.yourContributions + 1;
        const newRank = newContributions < 5 ? 'Beginner' :
                       newContributions < 20 ? 'Contributor' :
                       newContributions < 50 ? 'Validator' : 'Expert';

        // Check if rank changed
        const rankChanged = newRank !== prev.yourRank;

        // If rank changed, show special notification with confetti
        if (rankChanged) {
          setTimeout(() => {
            addNotification('Rank Up!', `You've reached the "${newRank}" rank!`, 'success');

            // No confetti for a more professional look
          }, 1000);
        }

        return {
          ...prev,
          yourContributions: newContributions,
          yourRank: newRank
        };
      });

      // Update aggregation stats
      setAggregationStats(prev => ({
        ...prev,
        pendingBatches: prev.pendingBatches + 1
      }));

      // Show success notification with special effects
      setTimeout(() => {
        addNotification('Task Completed', `Task ${taskId} has been fully verified and will be aggregated`, 'success');

        // No particle effects for a more professional look
      }, 500);
    } else {
      // Play success sound
      SoundEffects.playSuccess();
      SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.SUCCESS);

      // Show notification with progress information
      addNotification('Verification Added', `Added verification ${updatedTask.currentVerifications}/${updatedTask.verificationThreshold} for Task ${taskId}`, 'info');
    }

    // Update tasks
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? updatedTask : t
    );
    setTasks(updatedTasks);

    // Update wallet balance with reward and visual feedback
    const reward = task.reward;
    setWalletBalance(prev => prev + reward);

    // Create subtle professional effect for reward
    setTimeout(() => {
      // Find the wallet balance display if wallet window is open
      const walletBalanceElement = document.querySelector('.balance-amount');
      if (walletBalanceElement) {
        // Add a professional highlight class
        walletBalanceElement.classList.add('professional-value-update');

        // Remove the highlight class after animation completes
        setTimeout(() => {
          walletBalanceElement.classList.remove('professional-value-update');
        }, 1500);
      }
    }, 500);

    // Play reward sound
    SoundEffects.playReward();
    SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.REWARD);

    // Update network stats with visual feedback
    setNetworkStats(prev => {
      const newStats = {
        ...prev,
        totalVerifications: prev.totalVerifications + 1,
        verifiedProofs: prev.verifiedProofs + (updatedTask.status === 'Completed' ? 1 : 0)
      };

      // Add subtle professional effect for stats update
      setTimeout(() => {
        const statsElement = document.querySelector('.winbox-stats');
        if (statsElement) {
          // Add a professional highlight class
          statsElement.classList.add('professional-stats-update');

          // Remove the highlight class after animation completes
          setTimeout(() => {
            statsElement.classList.remove('professional-stats-update');
          }, 800);
        }
      }, 800);

      return newStats;
    });
  };

  // Function to add a notification with enhanced visual effects
  const addNotification = (title, message, type = 'info', autoHide = true) => {
    console.log(`Adding notification: ${title} - ${message}`);

    const newNotification = {
      id: Date.now(),
      title,
      message,
      type,
      timestamp: new Date(),
      read: false,
      animationClass: `notification-${type}-${Math.floor(Math.random() * 3) + 1}` // Random animation variant
    };

    // Play notification sound based on type
    switch(type) {
      case 'success':
        SoundEffects.playSuccess();
        SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.SUCCESS);

        // Show confetti for success notifications
        setTimeout(() => {
          const desktopElement = document.querySelector('.desktop');
          if (desktopElement) {
            AnimationEffects.showConfetti('desktop', 3000, 150);
          }
        }, 300);
        break;
      case 'warning':
        SoundEffects.playClick();
        SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.CLICK);
        break;
      case 'error':
        SoundEffects.playError();
        SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.ERROR);
        break;
      default: // info
        SoundEffects.playClick();
        break;
    }

    // No particle effects for a more professional look

    // Keep only the 10 most recent notifications
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));

    // Auto-hide notification after 5 seconds if autoHide is true
    if (autoHide) {
      setTimeout(() => {
        console.log(`Auto-hiding notification: ${title}`);
        setNotifications(prev =>
          prev.filter(notification => notification.id !== newNotification.id)
        );
      }, 5000);
    }
  };

  // Window configuration based on type
  const windowConfig = {
    node: {
      title: 'Run Node',
      width: 400,
      height: 300,
      x: 'center',
      y: 'center',
      class: 'winbox-node modern'
    },
    tasks: {
      title: 'Verification Tasks',
      width: 450,
      height: 350,
      x: 'center',
      y: 'center',
      class: 'winbox-tasks modern'
    },
    wallet: {
      title: 'Wallet',
      width: 400,
      height: 300,
      x: 'center',
      y: 'center',
      class: 'winbox-wallet modern'
    },
    stats: {
      title: 'Network Stats',
      width: 500,
      height: 400,
      x: 'center',
      y: 'center',
      class: 'winbox-stats modern'
    },
    terminal: {
      title: 'Terminal',
      width: 600,
      height: 400,
      x: 'center',
      y: 'center',
      class: 'winbox-terminal modern'
    },
    settings: {
      title: 'Settings',
      width: 450,
      height: 500,
      x: 'center',
      y: 'center',
      class: 'winbox-settings modern'
    },
    help: {
      title: 'Help',
      width: 500,
      height: 400,
      x: 'center',
      y: 'center',
      class: 'winbox-help modern'
    },
    explorer: {
      title: 'File Explorer',
      width: 600,
      height: 450,
      x: 'center',
      y: 'center',
      class: 'winbox-explorer modern'
    },
    verification: {
      title: 'Threshold Verification',
      width: 550,
      height: 450,
      x: 'center',
      y: 'center',
      class: 'winbox-verification modern'
    },
    distribution: {
      title: 'Task Distribution',
      width: 550,
      height: 450,
      x: 'center',
      y: 'center',
      class: 'winbox-distribution modern'
    },
    merkle: {
      title: 'LayerEdge Merkle Commitments',
      width: 650,
      height: 550,
      x: 'center',
      y: 'center',
      class: 'winbox-merkle modern'
    }
  };

  // Function to create particles
  const createParticles = () => {
    const particles = [];
    const particlesContainer = document.querySelector('.particles-container');

    if (!particlesContainer) return;

    // Clear existing particles
    particlesContainer.innerHTML = '';

    // Create new particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random properties
      const size = Math.random() * 3 + 1;
      const posX = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 10;
      const opacity = Math.random() * 0.5 + 0.3;
      const drift = (Math.random() - 0.5) * 200;

      // Set CSS variables
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.setProperty('--delay', `${delay}s`);
      particle.style.setProperty('--opacity', opacity);
      particle.style.setProperty('--drift', `${drift}px`);

      // Set position and size
      particle.style.left = `${posX}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDelay = `${delay}s`;

      particlesContainer.appendChild(particle);
      particles.push(particle);
    }

    return particles;
  };

  // Initialize particles on component mount
  useEffect(() => {
    createParticles();

    // Recreate particles periodically
    const particleInterval = setInterval(() => {
      createParticles();
    }, 30000);

    return () => clearInterval(particleInterval);
  }, []);

  // Function to open a window with enhanced animations
  const openWindow = (windowType) => {
    console.log(`Opening window: ${windowType}`);

    // Play sound effect
    SoundEffects.playClick();
    SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.CLICK);

    // Update window state
    setWindows(prev => {
      const newState = {
        ...prev,
        [windowType]: true
      };
      console.log(`New windows state after opening ${windowType}:`, newState);
      return newState;
    });

    // Reset minimized state
    setMinimizedWindows(prev => {
      const newState = {
        ...prev,
        [windowType]: false
      };
      console.log(`New minimizedWindows state after opening ${windowType}:`, newState);
      return newState;
    });

    // Add notification for window open - don't auto-hide these notifications
    addNotification('Window Opened', `${windowConfig[windowType].title} has been opened`, 'info', false);

    // Add a safety timeout to ensure the window stays open
    setTimeout(() => {
      setWindows(prev => {
        if (!prev[windowType]) {
          console.log(`Safety check: Ensuring ${windowType} window stays open`);
          return { ...prev, [windowType]: true };
        }
        return prev;
      });
    }, 100);

    // Add subtle, professional window opening animation
    setTimeout(() => {
      // Find the window element
      const windowElement = document.querySelector(`.${windowConfig[windowType].class.split(' ')[0]}`);
      if (windowElement) {
        // Add a professional animation class
        windowElement.classList.add('window-professional-open');

        // Remove the class after animation completes
        setTimeout(() => {
          windowElement.classList.remove('window-professional-open');
        }, 500);
      }
    }, 50); // Minimal delay for better performance
  };

  // Function to close a window with enhanced animations
  const closeWindow = (windowType) => {
    console.log(`Closing window: ${windowType}`);

    // Find the window element before closing it
    const windowElement = document.querySelector(`.${windowConfig[windowType].class.split(' ')[0]}`);

    if (windowElement) {
      // Add a professional closing animation class
      windowElement.classList.add('window-professional-close');
    }

    // Play sound effect
    SoundEffects.playClick();
    SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.CLICK);

    // Delay the actual closing to allow for animation
    setTimeout(() => {
      // Update window state
      setWindows(prev => ({
        ...prev,
        [windowType]: false
      }));

      // Reset minimized state
      setMinimizedWindows(prev => ({
        ...prev,
        [windowType]: false
      }));

      // No particle effects for a more professional look
    }, 300);
  };

  // Function to minimize a window with animation effects
  const minimizeWindow = (windowType) => {
    console.log(`Minimizing window: ${windowType}`);

    // Find the window element and taskbar target
    const windowElement = document.querySelector(`.${windowConfig[windowType].class.split(' ')[0]}`);
    const taskbarTarget = document.querySelector(`.taskbar-window.${windowType}-icon`);

    if (windowElement) {
      // Add professional minimizing animation class
      windowElement.classList.add('window-professional-minimize');
    }

    // Play sound effect
    SoundEffects.playClick();
    SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.CLICK);

    // Delay the actual state change to allow for animation
    setTimeout(() => {
      // Update window states
      setWindows(prev => ({
        ...prev,
        [windowType]: false
      }));

      setMinimizedWindows(prev => ({
        ...prev,
        [windowType]: true
      }));

      // Subtle highlight for the taskbar icon
      if (taskbarTarget) {
        taskbarTarget.classList.add('professional-highlight');
        setTimeout(() => {
          taskbarTarget.classList.remove('professional-highlight');
        }, 800);
      }
    }, 300);
  };

  // Function to toggle a window (open if closed, restore if minimized, focus if open)
  const toggleWindow = (windowType) => {
    // Play sound effect
    SoundEffects.playClick();

    // If window is closed, open it
    if (!windows[windowType] && !minimizedWindows[windowType]) {
      openWindow(windowType);
      return;
    }

    // If window is minimized, restore it
    if (minimizedWindows[windowType]) {
      // Play restore sound
      SoundEffects.playClick();
      SoundEffects.vibrate(SoundEffects.VIBRATION_PATTERNS.CLICK);

      setMinimizedWindows(prev => ({
        ...prev,
        [windowType]: false
      }));

      setWindows(prev => ({
        ...prev,
        [windowType]: true
      }));

      return;
    }

    // If window is open, just focus it (handled by WindowManager)
    // This is a no-op since the WindowManager will handle focusing
  };

  // Function to render content inside a window
  const renderWindowContent = (windowType, contentElement) => {
    try {
      // Use the provided contentElement or fall back to the ref
      const content = contentElement ||
        (contentRefs[windowType] && contentRefs[windowType].current);

      if (!content) {
        console.error(`Content element for ${windowType} is not available`);
        return;
      }

      console.log(`Rendering content for ${windowType} window`);

      // Clear existing content
      content.innerHTML = '';

      switch (windowType) {
      case 'node':
        content.innerHTML = `
          <div class="status-indicator active"></div>
          <h3>Node Status: Running</h3>

          <div class="stats-container">
            <div class="stat-item">
              <div class="stat-label">CPU Usage</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${cpuUsage}%"></div>
              </div>
              <div class="stat-value">${cpuUsage}%</div>
            </div>

            <div class="stat-item">
              <div class="stat-label">Memory Usage</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${memoryUsage / 3}%"></div>
              </div>
              <div class="stat-value">${memoryUsage} MB</div>
            </div>
          </div>

          <div class="node-actions">
            <button class="action-button" id="restart-node">Restart Node</button>
            <button class="action-button" id="configure-node">Configure</button>
          </div>
        `;

        // Add event listeners
        setTimeout(() => {
          const restartBtn = content.querySelector('#restart-node');
          const configureBtn = content.querySelector('#configure-node');

          if (restartBtn) {
            restartBtn.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent event propagation
              addNotification('Node Restarted', 'The node has been restarted successfully', 'success');
            });
          }

          if (configureBtn) {
            configureBtn.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent event propagation
              openWindow('settings');
            });
          }
        }, 0);
        break;

      case 'tasks':
        // Create tasks HTML
        let tasksHTML = '<h3>Available Tasks</h3><div class="tasks-list">';

        tasks.forEach(task => {
          tasksHTML += `
            <div class="task-item ${task.status.toLowerCase()}">
              <div class="task-header">
                <span class="task-title">Task ${task.id}</span>
                <span class="task-status ${task.status.toLowerCase()}">${task.status}</span>
              </div>
              <div class="task-description">${task.description}</div>
              <div class="task-details">
                <div class="task-difficulty">Difficulty: ${task.difficulty}</div>
                <div class="task-reward">Reward: ${task.reward} EDGEN</div>
              </div>
              <div class="verification-progress">
                <div class="verification-text">Verifications: ${task.currentVerifications}/${task.verificationThreshold}</div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${(task.currentVerifications / task.verificationThreshold) * 100}%"></div>
                </div>
              </div>
              ${task.status === 'Pending' ?
                `<button class="verify-button" data-task-id="${task.id}">Verify</button>` :
                '<div class="completed-message">Verification complete</div>'}
            </div>
          `;
        });

        tasksHTML += '</div>';
        content.innerHTML = tasksHTML;

        // Add event listeners
        setTimeout(() => {
          const verifyButtons = content.querySelectorAll('.verify-button');

          verifyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent event propagation
              const taskId = parseInt(button.getAttribute('data-task-id'));
              handleVerification(taskId);
              renderWindowContent('tasks', contentRefs['tasks'].current);
              renderWindowContent('wallet', contentRefs['wallet'].current);

              // Update stats window if open
              if (windows['stats']) {
                renderWindowContent('stats', contentRefs['stats'].current);
              }
            });
          });
        }, 0);
        break;

      case 'wallet':
        content.innerHTML = `
          <div class="wallet-balance">
            <h3>Balance</h3>
            <div class="balance-amount">${walletBalance.toFixed(1)} <span>EDGEN</span></div>
          </div>

          <div class="reward-system">
            <h4>Reward System</h4>
            <p class="reward-description">
              Earn EDGEN tokens for contributing to network security through verification tasks.
            </p>
            <div class="reward-rates">
              <div class="reward-rate">
                <div class="reward-difficulty">Easy</div>
                <div class="reward-amount">0.1 EDGEN</div>
              </div>
              <div class="reward-rate">
                <div class="reward-difficulty">Medium</div>
                <div class="reward-amount">0.2 EDGEN</div>
              </div>
              <div class="reward-rate">
                <div class="reward-difficulty">Hard</div>
                <div class="reward-amount">0.3 EDGEN</div>
              </div>
            </div>
            <div class="reward-stats">
              <div class="reward-stat">
                <div class="stat-label">Your Contributions</div>
                <div class="stat-value">${participationStats.yourContributions}</div>
              </div>
              <div class="reward-stat">
                <div class="stat-label">Your Rank</div>
                <div class="stat-value">${participationStats.yourRank}</div>
              </div>
            </div>
          </div>

          <div class="wallet-history">
            <h4>Transaction History</h4>
            <div class="transaction-list">
              ${walletBalance > 0 ?
                Array.from({ length: Math.ceil(walletBalance / 0.1) }).map((_, i) => `
                  <div class="transaction-item">
                    <div class="transaction-icon income"></div>
                    <div class="transaction-details">
                      <div class="transaction-title">Verification Reward #${i+1}</div>
                      <div class="transaction-date">Today</div>
                    </div>
                    <div class="transaction-amount">+0.1 EDGEN</div>
                  </div>
                `).join('') :
                '<div class="no-transactions">No transactions yet</div>'}
            </div>
          </div>

          <div class="wallet-actions">
            <button class="action-button" id="view-tasks-wallet-btn">View Available Tasks</button>
          </div>
        `;

        // Add event listeners
        setTimeout(() => {
          const viewTasksBtn = content.querySelector('#view-tasks-wallet-btn');
          if (viewTasksBtn) {
            viewTasksBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              openWindow('tasks');
            });
          }
        }, 0);
        break;

      case 'stats':
        content.innerHTML = `
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon nodes-icon"></div>
              <div class="stat-info">
                <div class="stat-value">${networkStats.activeNodes.toLocaleString()}</div>
                <div class="stat-label">Active Nodes</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon verifications-icon"></div>
              <div class="stat-info">
                <div class="stat-value">${networkStats.totalVerifications.toLocaleString()}</div>
                <div class="stat-label">Total Verifications</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon blocks-icon"></div>
              <div class="stat-info">
                <div class="stat-value">${networkStats.blockHeight.toLocaleString()}</div>
                <div class="stat-label">Block Height</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon hashrate-icon"></div>
              <div class="stat-info">
                <div class="stat-value">${networkStats.hashRate.toLocaleString()} TH/s</div>
                <div class="stat-label">Hash Rate</div>
              </div>
            </div>
          </div>

          <div class="aggregation-section">
            <h4>Aggregation Layer</h4>
            <div class="aggregation-stats">
              <div class="aggregation-row">
                <div class="aggregation-label">Verified Proofs:</div>
                <div class="aggregation-value">${networkStats.verifiedProofs.toLocaleString()}</div>
              </div>
              <div class="aggregation-row">
                <div class="aggregation-label">Pending Aggregation:</div>
                <div class="aggregation-value">${networkStats.pendingAggregation.toLocaleString()}</div>
              </div>
              <div class="aggregation-row">
                <div class="aggregation-label">Anchored to L1:</div>
                <div class="aggregation-value">${networkStats.anchoredToL1.toLocaleString()}</div>
              </div>
              <div class="aggregation-row">
                <div class="aggregation-label">Target Chain:</div>
                <div class="aggregation-value">${aggregationStats.targetChain}</div>
              </div>
              <div class="aggregation-row">
                <div class="aggregation-label">Last Anchor Time:</div>
                <div class="aggregation-value">${new Date(aggregationStats.lastAnchorTime).toLocaleTimeString()}</div>
              </div>
              <div class="aggregation-row">
                <div class="aggregation-label">Next Anchor Estimate:</div>
                <div class="aggregation-value">${new Date(aggregationStats.nextAnchorEstimate).toLocaleTimeString()}</div>
              </div>
            </div>
          </div>

          <div class="network-visualization">
            <h4>Network Activity</h4>
            <div class="visualization-container">
              <div class="pulse-animation"></div>
              <div class="node-network">
                ${Array.from({ length: 20 }).map((_, i) => `
                  <div
                    class="network-node node-${i}"
                    style="
                      left: ${Math.random() * 100}%;
                      top: ${Math.random() * 100}%;
                      animation-delay: ${Math.random() * 5}s
                    "
                  ></div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        break;

      case 'terminal':
        content.innerHTML = `
          <div class="terminal-container">
            <div class="terminal-output" id="terminal-output">
              <div class="terminal-line">Welcome to edgenOS Terminal v1.0</div>
              <div class="terminal-line">Type 'help' for a list of commands</div>
            </div>
            <div class="terminal-input-container">
              <span class="terminal-prompt">edgen@os:~$</span>
              <input type="text" class="terminal-input" id="terminal-input" autofocus />
            </div>
          </div>
        `;

        // Add event listeners
        setTimeout(() => {
          const terminalInput = content.querySelector('#terminal-input');
          const terminalOutput = content.querySelector('#terminal-output');

          if (terminalInput) {
            // Prevent clicks from propagating
            terminalInput.addEventListener('click', (e) => {
              e.stopPropagation();
            });

            // Handle keydown events
            terminalInput.addEventListener('keydown', (e) => {
              e.stopPropagation(); // Prevent event propagation

              if (e.key === 'Enter') {
                const command = terminalInput.value.trim();

                // Add command to output
                terminalOutput.innerHTML += `
                  <div class="terminal-line">
                    <span class="terminal-prompt">edgen@os:~$</span> ${command}
                  </div>
                `;

                // Process command
                processTerminalCommand(command, terminalOutput);

                // Clear input
                terminalInput.value = '';

                // Add to history
                setCommandHistory(prev => [...prev, command]);

                // Scroll to bottom
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
              }
            });

            // Focus input
            terminalInput.focus();
          }

          // Prevent clicks on the terminal output from propagating
          if (terminalOutput) {
            terminalOutput.addEventListener('click', (e) => {
              e.stopPropagation();
            });
          }
        }, 0);
        break;

      case 'settings':
        content.innerHTML = `
          <div class="settings-container">
            <h3>User Settings</h3>

            <div class="settings-section">
              <h4>Profile</h4>
              <div class="profile-settings">
                <div class="profile-avatar">
                  <div class="avatar-placeholder"></div>
                  <button class="change-avatar-btn">Change</button>
                </div>
                <div class="profile-info">
                  <div class="form-group">
                    <label>Username</label>
                    <input type="text" id="username-input" value="${user.username || 'User'}" />
                  </div>
                  <div class="form-group">
                    <label>Level</label>
                    <div class="level-display">Level ${user.level}</div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${(user.experience % 100)}%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="settings-section">
              <h4>Appearance</h4>
              <div class="form-group">
                <label>Theme</label>
                <select id="theme-select">
                  <option value="dark" selected>Dark</option>
                  <option value="light">Light</option>
                  <option value="matrix">Matrix</option>
                </select>
              </div>
              <div class="form-group">
                <label>Animation Speed</label>
                <select id="animation-speed">
                  <option value="fast">Fast</option>
                  <option value="normal" selected>Normal</option>
                  <option value="slow">Slow</option>
                </select>
              </div>
            </div>

            <div class="settings-section">
              <h4>Notifications</h4>
              <div class="form-group checkbox">
                <input type="checkbox" id="enable-notifications" checked />
                <label for="enable-notifications">Enable Notifications</label>
              </div>
              <div class="form-group checkbox">
                <input type="checkbox" id="sound-notifications" checked />
                <label for="sound-notifications">Sound Notifications</label>
              </div>
            </div>

            <div class="settings-actions">
              <button id="save-settings" class="primary-button">Save Settings</button>
              <button id="reset-settings">Reset to Default</button>
            </div>
          </div>
        `;

        // Add event listeners
        setTimeout(() => {
          const saveButton = content.querySelector('#save-settings');

          if (saveButton) {
            saveButton.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent event propagation
              e.preventDefault(); // Prevent default button behavior

              const username = content.querySelector('#username-input').value;

              // Update user
              setUser(prev => ({
                ...prev,
                username,
                loggedIn: true
              }));

              addNotification('Settings Saved', 'Your settings have been saved successfully', 'success');
            });
          }

          // Add event listeners to all form elements to prevent propagation
          const formElements = content.querySelectorAll('input, select, button');
          formElements.forEach(element => {
            element.addEventListener('click', (e) => {
              e.stopPropagation();
            });

            element.addEventListener('change', (e) => {
              e.stopPropagation();
            });
          });
        }, 0);
        break;

      case 'help':
        content.innerHTML = `
          <div class="help-container">
            <h3>edgenOS Help</h3>

            <div class="help-section">
              <h4>Getting Started</h4>
              <p>Welcome to edgenOS, a revolutionary verification layer for blockchain security. Here's how to get started:</p>
              <ul>
                <li><strong>Run Node</strong> - Start your verification node to participate in the network</li>
                <li><strong>Verification Tasks</strong> - Complete tasks to earn EDGEN tokens</li>
                <li><strong>Wallet</strong> - View your balance and transaction history</li>
                <li><strong>Stats</strong> - Monitor network statistics and activity</li>
                <li><strong>Merkle Commitments</strong> - Learn how LayerEdge anchors proofs to Bitcoin</li>
              </ul>
            </div>

            <div class="help-section">
              <h4>Commands</h4>
              <p>The Terminal supports the following commands:</p>
              <ul>
                <li><code>help</code> - Display available commands</li>
                <li><code>open [app]</code> - Open an application (node, tasks, wallet, stats, settings, explorer)</li>
                <li><code>close [app]</code> - Close an application</li>
                <li><code>status</code> - Display system status</li>
                <li><code>balance</code> - Show wallet balance</li>
                <li><code>verify</code> - Run verification task</li>
                <li><code>clear</code> - Clear terminal output</li>
              </ul>
            </div>

            <div class="help-section">
              <h4>Keyboard Shortcuts</h4>
              <ul>
                <li><strong>Alt+N</strong> - Open Node</li>
                <li><strong>Alt+T</strong> - Open Tasks</li>
                <li><strong>Alt+W</strong> - Open Wallet</li>
                <li><strong>Alt+S</strong> - Open Stats</li>
                <li><strong>Alt+X</strong> - Open Terminal</li>
                <li><strong>Alt+F</strong> - Open File Explorer</li>
                <li><strong>Alt+H</strong> - Open Help</li>
                <li><strong>Alt+M</strong> - Open Merkle Commitments</li>
              </ul>
            </div>
          </div>
        `;
        break;

      case 'explorer':
        // Generate file explorer HTML
        let explorerHTML = `
          <div class="explorer-container">
            <div class="explorer-toolbar">
              <button id="back-btn" class="explorer-btn">Back</button>
              <button id="up-btn" class="explorer-btn">Up</button>
              <button id="refresh-btn" class="explorer-btn">Refresh</button>
              <div class="path-bar">/${currentDirectory}</div>
            </div>

            <div class="explorer-content">
              <div class="folder-view">
        `;

        // Add folders and files
        Object.entries(files).forEach(([name, item]) => {
          if (item.type === 'folder') {
            explorerHTML += `
              <div class="folder-item" data-name="${name}">
                <div class="folder-icon"></div>
                <div class="folder-name">${name}</div>
              </div>
            `;
          } else if (item.type === 'file') {
            explorerHTML += `
              <div class="file-item" data-name="${name}">
                <div class="file-icon"></div>
                <div class="file-name">${name}</div>
              </div>
            `;
          } else if (item.type === 'app') {
            explorerHTML += `
              <div class="app-item" data-link="${item.link}">
                <div class="app-icon ${item.link}-icon"></div>
                <div class="app-name">${name}</div>
              </div>
            `;
          }
        });

        explorerHTML += `
              </div>
            </div>
          </div>
        `;

        content.innerHTML = explorerHTML;

        // Add event listeners
        setTimeout(() => {
          const folderItems = content.querySelectorAll('.folder-item');
          const fileItems = content.querySelectorAll('.file-item');
          const appItems = content.querySelectorAll('.app-item');

          folderItems.forEach(item => {
            item.addEventListener('dblclick', (e) => {
              e.stopPropagation(); // Prevent event propagation
              const folderName = item.getAttribute('data-name');
              setCurrentDirectory(folderName);
              renderWindowContent('explorer', contentRefs['explorer'].current);
            });

            // Also prevent single clicks from propagating
            item.addEventListener('click', (e) => {
              e.stopPropagation();
            });
          });

          fileItems.forEach(item => {
            item.addEventListener('dblclick', (e) => {
              e.stopPropagation(); // Prevent event propagation
              const fileName = item.getAttribute('data-name');
              // Show file content in a new window
              addNotification('File Opened', `Opened ${fileName}`, 'info');
            });

            // Also prevent single clicks from propagating
            item.addEventListener('click', (e) => {
              e.stopPropagation();
            });
          });

          appItems.forEach(item => {
            item.addEventListener('dblclick', (e) => {
              e.stopPropagation(); // Prevent event propagation
              const appLink = item.getAttribute('data-link');
              openWindow(appLink);
            });

            // Also prevent single clicks from propagating
            item.addEventListener('click', (e) => {
              e.stopPropagation();
            });
          });

          // Add event listeners to all buttons in the explorer toolbar
          const explorerButtons = content.querySelectorAll('.explorer-btn');
          explorerButtons.forEach(button => {
            button.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent event propagation
            });
          });

          const backBtn = content.querySelector('#back-btn');
          if (backBtn) {
            backBtn.addEventListener('click', (e) => {
              e.stopPropagation(); // Prevent event propagation
              setCurrentDirectory('/');
              renderWindowContent('explorer', contentRefs['explorer'].current);
            });
          }
        }, 0);
        break;

      case 'verification':
        content.innerHTML = `
          <div class="verification-container">
            <h3>Threshold Verification System</h3>
            <p class="verification-description">
              The edgenOS verification system requires multiple independent verifications to confirm each proof, ensuring integrity and security.
            </p>

            <div class="verification-stats">
              <div class="verification-stat-card">
                <div class="stat-title">Your Contributions</div>
                <div class="stat-value">${participationStats.yourContributions}</div>
              </div>
              <div class="verification-stat-card">
                <div class="stat-title">Your Rank</div>
                <div class="stat-value">${participationStats.yourRank}</div>
              </div>
              <div class="verification-stat-card">
                <div class="stat-title">Total Participants</div>
                <div class="stat-value">${participationStats.totalParticipants.toLocaleString()}</div>
              </div>
            </div>

            <h4>How Threshold Verification Works</h4>
            <div class="verification-steps">
              <div class="verification-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <div class="step-title">Task Assignment</div>
                  <div class="step-description">Tasks are distributed to random verifiers across the network</div>
                </div>
              </div>
              <div class="verification-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <div class="step-title">Multiple Verifications</div>
                  <div class="step-description">Each task requires a threshold number of independent verifications</div>
                </div>
              </div>
              <div class="verification-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <div class="step-title">Consensus</div>
                  <div class="step-description">When threshold is reached, the verification is considered complete</div>
                </div>
              </div>
              <div class="verification-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <div class="step-title">Aggregation</div>
                  <div class="step-description">Completed verifications are aggregated and anchored to Layer 1</div>
                </div>
              </div>
            </div>

            <h4>Top Contributors</h4>
            <div class="contributors-list">
              ${participationStats.topContributors.map((contributor, index) => `
                <div class="contributor-item">
                  <div class="contributor-rank">#${index + 1}</div>
                  <div class="contributor-id">${contributor.id}</div>
                  <div class="contributor-contributions">${contributor.contributions} verifications</div>
                </div>
              `).join('')}
            </div>

            <div class="verification-actions">
              <button class="action-button" id="view-tasks-btn">View Available Tasks</button>
            </div>
          </div>
        `;

        // Add event listeners
        setTimeout(() => {
          const viewTasksBtn = content.querySelector('#view-tasks-btn');
          if (viewTasksBtn) {
            viewTasksBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              openWindow('tasks');
            });
          }
        }, 0);
        break;

      case 'distribution':
        content.innerHTML = `
          <div class="distribution-container">
            <h3>Task Distribution System</h3>
            <p class="distribution-description">
              The edgenOS distribution system breaks down complex verification tasks into small components and distributes them across the network.
            </p>

            <div class="distribution-queue">
              <h4>Current Distribution Queue</h4>
              <div class="queue-list">
                ${distributionQueue.map(item => `
                  <div class="queue-item ${item.status.toLowerCase()}">
                    <div class="queue-header">
                      <div class="queue-id">ID: ${item.id}</div>
                      <div class="queue-status ${item.status.toLowerCase()}">${item.status}</div>
                    </div>
                    <div class="queue-details">
                      <div class="queue-type">Type: ${item.type}</div>
                      <div class="queue-segments">Segments: ${item.segments}</div>
                      <div class="queue-priority">Priority: ${item.priority}</div>
                    </div>
                    <div class="queue-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: ${item.status === 'Distributing' ? '60%' : '0%'}"></div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <h4>How Task Distribution Works</h4>
            <div class="distribution-steps">
              <div class="distribution-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <div class="step-title">Task Segmentation</div>
                  <div class="step-description">Complex proofs are broken down into smaller segments</div>
                </div>
              </div>
              <div class="distribution-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <div class="step-title">Random Assignment</div>
                  <div class="step-description">Segments are randomly assigned to verifiers across the network</div>
                </div>
              </div>
              <div class="distribution-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <div class="step-title">Parallel Verification</div>
                  <div class="step-description">Multiple segments are verified simultaneously by different nodes</div>
                </div>
              </div>
              <div class="distribution-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <div class="step-title">Threshold Completion</div>
                  <div class="step-description">Each segment requires multiple verifications to be considered complete</div>
                </div>
              </div>
            </div>

            <div class="distribution-actions">
              <button class="action-button" id="view-verification-btn">View Verification System</button>
            </div>
          </div>
        `;

        // Add event listeners
        setTimeout(() => {
          const viewVerificationBtn = content.querySelector('#view-verification-btn');
          if (viewVerificationBtn) {
            viewVerificationBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              openWindow('verification');
            });
          }
        }, 0);
        break;

      case 'merkle':
        content.innerHTML = `
          <div class="merkle-container">
            <h3>LayerEdge Merkle Commitments</h3>
            <p class="merkle-description">
              LayerEdge batches thousands of zk-proofs, but only posts a single Merkle root on-chain. This commitment scheme ensures that every proof in the batch is verifiable, auditable, and anchored — without bloating Bitcoin with raw data.
            </p>

            <div class="merkle-visualization">
              <div class="merkle-tree">
                <div class="merkle-node root">
                  <div class="node-content">Merkle Root</div>
                  <div class="node-hash">0x8f41...</div>
                </div>
                <div class="merkle-level level-1">
                  <div class="merkle-node">
                    <div class="node-content">Hash 1-2</div>
                    <div class="node-hash">0x7a32...</div>
                  </div>
                  <div class="merkle-node">
                    <div class="node-content">Hash 3-4</div>
                    <div class="node-hash">0x9c21...</div>
                  </div>
                </div>
                <div class="merkle-level level-2">
                  <div class="merkle-node">
                    <div class="node-content">Hash 1</div>
                    <div class="node-hash">0x3f12...</div>
                  </div>
                  <div class="merkle-node">
                    <div class="node-content">Hash 2</div>
                    <div class="node-hash">0x5e67...</div>
                  </div>
                  <div class="merkle-node">
                    <div class="node-content">Hash 3</div>
                    <div class="node-hash">0x2d45...</div>
                  </div>
                  <div class="merkle-node">
                    <div class="node-content">Hash 4</div>
                    <div class="node-hash">0x8b19...</div>
                  </div>
                </div>
                <div class="merkle-level level-3">
                  <div class="merkle-node proof">
                    <div class="node-content">ZK Proof 1</div>
                    <div class="node-hash">0x1a2b...</div>
                  </div>
                  <div class="merkle-node proof">
                    <div class="node-content">ZK Proof 2</div>
                    <div class="node-hash">0x3c4d...</div>
                  </div>
                  <div class="merkle-node proof">
                    <div class="node-content">ZK Proof 3</div>
                    <div class="node-hash">0x5e6f...</div>
                  </div>
                  <div class="merkle-node proof">
                    <div class="node-content">ZK Proof 4</div>
                    <div class="node-hash">0x7g8h...</div>
                  </div>
                </div>
              </div>
              <div class="merkle-controls">
                <button id="animate-merkle" class="action-button">Animate Proof Inclusion</button>
                <button id="reset-merkle" class="action-button">Reset</button>
              </div>
            </div>

            <div class="merkle-info">
              <h4>How Merkle Commitments Work</h4>
              <div class="merkle-steps">
                <div class="merkle-step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <div class="step-title">Batch Collection</div>
                    <div class="step-description">LayerEdge collects thousands of zk-proofs in a single batch</div>
                  </div>
                </div>
                <div class="merkle-step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <div class="step-title">Merkle Tree Construction</div>
                    <div class="step-description">Each proof becomes a leaf in a Merkle tree, with pairs of nodes hashed together up to a single root</div>
                  </div>
                </div>
                <div class="merkle-step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <div class="step-title">Root Anchoring</div>
                    <div class="step-description">Only the Merkle root is posted on Bitcoin, alongside the recursive proof (πₐgg)</div>
                  </div>
                </div>
                <div class="merkle-step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <div class="step-title">Proof Verification</div>
                    <div class="step-description">Any proof can be verified using just log₂(N) hashes - for 1 million proofs, that's only 20 hashes</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="merkle-benefits">
              <h4>Benefits of Merkle Commitments</h4>
              <div class="benefits-grid">
                <div class="benefit-card">
                  <div class="benefit-icon succinct-icon"></div>
                  <div class="benefit-title">Succinct</div>
                  <div class="benefit-description">Only a single hash needs to be stored on-chain, regardless of batch size</div>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon tamperproof-icon"></div>
                  <div class="benefit-title">Tamper-Proof</div>
                  <div class="benefit-description">Any change to any proof would change the Merkle root</div>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon verifiable-icon"></div>
                  <div class="benefit-title">Verifiable</div>
                  <div class="benefit-description">Anyone can verify any proof's inclusion without revealing the entire batch</div>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon scalable-icon"></div>
                  <div class="benefit-title">Scalable</div>
                  <div class="benefit-description">Perfect for zk-proof networks operating at scale</div>
                </div>
              </div>
            </div>

            <div class="merkle-actions">
              <button class="action-button" id="learn-more-btn">Learn More About ZK Proofs</button>
            </div>
          </div>
        `;

        // Add event listeners and animation
        setTimeout(() => {
          const animateButton = content.querySelector('#animate-merkle');
          const resetButton = content.querySelector('#reset-merkle');
          const learnMoreBtn = content.querySelector('#learn-more-btn');

          if (animateButton) {
            animateButton.addEventListener('click', (e) => {
              e.stopPropagation();

              // Get all the nodes
              const proofNodes = content.querySelectorAll('.proof');
              const level2Nodes = content.querySelectorAll('.level-2 .merkle-node');
              const level1Nodes = content.querySelectorAll('.level-1 .merkle-node');
              const rootNode = content.querySelector('.root');

              // Reset any existing animations
              content.querySelectorAll('.merkle-node').forEach(node => {
                node.classList.remove('highlight', 'active');
              });

              // Highlight a specific proof path (e.g., proof 2)
              const proofIndex = 1; // 0-based index for the second proof

              // Animate the path from leaf to root
              setTimeout(() => {
                proofNodes[proofIndex].classList.add('highlight');
              }, 500);

              setTimeout(() => {
                level2Nodes[Math.floor(proofIndex/2)].classList.add('highlight');
              }, 1500);

              setTimeout(() => {
                level1Nodes[Math.floor(proofIndex/4)].classList.add('highlight');
              }, 2500);

              setTimeout(() => {
                rootNode.classList.add('highlight');
              }, 3500);

              // Show the inclusion path
              setTimeout(() => {
                proofNodes[proofIndex].classList.add('active');
                level2Nodes[Math.floor(proofIndex/2)].classList.add('active');
                level1Nodes[Math.floor(proofIndex/4)].classList.add('active');
                rootNode.classList.add('active');
              }, 4500);
            });
          }

          if (resetButton) {
            resetButton.addEventListener('click', (e) => {
              e.stopPropagation();
              content.querySelectorAll('.merkle-node').forEach(node => {
                node.classList.remove('highlight', 'active');
              });
            });
          }

          if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              addNotification('Coming Soon', 'ZK Proof educational content will be available in a future update', 'info');
            });
          }
        }, 0);
        break;

      default:
        content.innerHTML = `<div class="error-message">Window type "${windowType}" not supported</div>`;
    }
    } catch (error) {
      console.error(`Error rendering content for ${windowType}:`, error);
      if (contentRefs[windowType] && contentRefs[windowType].current) {
        contentRefs[windowType].current.innerHTML = `<div class="error-message">Error loading content: ${error.message}</div>`;
      }
    }
  };

  // Process terminal commands
  const processTerminalCommand = (command, outputElement) => {
    const cmd = command.toLowerCase().trim();

    if (cmd === 'help') {
      outputElement.innerHTML += `
        <div class="terminal-line">Available commands:</div>
        <div class="terminal-line">- help: Display this help message</div>
        <div class="terminal-line">- open [app]: Open an application (node, tasks, wallet, stats, settings, explorer)</div>
        <div class="terminal-line">- close [app]: Close an application</div>
        <div class="terminal-line">- status: Display system status</div>
        <div class="terminal-line">- balance: Show wallet balance</div>
        <div class="terminal-line">- verify: Run verification task</div>
        <div class="terminal-line">- clear: Clear terminal output</div>
      `;
    } else if (cmd.startsWith('open ')) {
      const app = cmd.split(' ')[1];
      if (['node', 'tasks', 'wallet', 'stats', 'terminal', 'settings', 'help', 'explorer', 'verification', 'distribution', 'merkle'].includes(app)) {
        openWindow(app);
        outputElement.innerHTML += `<div class="terminal-line">Opening ${app}...</div>`;
      } else {
        outputElement.innerHTML += `<div class="terminal-line error">Unknown application: ${app}</div>`;
      }
    } else if (cmd.startsWith('close ')) {
      const app = cmd.split(' ')[1];
      if (['node', 'tasks', 'wallet', 'stats', 'terminal', 'settings', 'help', 'explorer', 'verification', 'distribution', 'merkle'].includes(app)) {
        closeWindow(app);
        outputElement.innerHTML += `<div class="terminal-line">Closing ${app}...</div>`;
      } else {
        outputElement.innerHTML += `<div class="terminal-line error">Unknown application: ${app}</div>`;
      }
    } else if (cmd === 'status') {
      outputElement.innerHTML += `
        <div class="terminal-line">System Status:</div>
        <div class="terminal-line">- CPU Usage: ${cpuUsage}%</div>
        <div class="terminal-line">- Memory Usage: ${memoryUsage} MB</div>
        <div class="terminal-line">- Active Nodes: ${networkStats.activeNodes}</div>
        <div class="terminal-line">- Block Height: ${networkStats.blockHeight}</div>
      `;
    } else if (cmd === 'balance') {
      outputElement.innerHTML += `<div class="terminal-line">Wallet Balance: ${walletBalance.toFixed(1)} EDGEN</div>`;
    } else if (cmd === 'verify') {
      const pendingTask = tasks.find(task => task.status === 'Pending');
      if (pendingTask) {
        handleVerification(pendingTask.id);
        outputElement.innerHTML += `<div class="terminal-line success">Verification completed! +${pendingTask.reward} EDGEN</div>`;
      } else {
        outputElement.innerHTML += `<div class="terminal-line">No pending verification tasks available.</div>`;
      }
    } else if (cmd === 'clear') {
      outputElement.innerHTML = '';
    } else {
      outputElement.innerHTML += `<div class="terminal-line error">Unknown command: ${command}</div>`;
    }
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger if Alt key is pressed
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'n':
            toggleWindow('node');
            break;
          case 't':
            toggleWindow('tasks');
            break;
          case 'w':
            toggleWindow('wallet');
            break;
          case 's':
            toggleWindow('stats');
            break;
          case 'x':
            toggleWindow('terminal');
            break;
          case 'f':
            toggleWindow('explorer');
            break;
          case 'h':
            toggleWindow('help');
            break;
          case 'g':
            toggleWindow('settings');
            break;
          case 'm':
            toggleWindow('merkle');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initialize windows on component mount
  useEffect(() => {
    console.log('Initializing desktop component');

    // Initialize content refs but don't create DOM elements yet
    // The actual DOM elements will be created by ReactWinBox

    // Open a default window on startup (optional)
    setTimeout(() => {
      console.log('Opening default window: node');
      openWindow('node');
    }, 1000);

    // Add some debugging
    window.addEventListener('error', (event) => {
      console.error('Global error caught:', event.error);
    });
  }, []);

  // Handle window focus with enhanced visual effects
  const handleWindowFocus = (windowType) => {
    console.log(`Window focus event: ${windowType}`);

    // Only update the state if the window isn't already open or is minimized
    if (!windows[windowType] || minimizedWindows[windowType]) {
      console.log(`Restoring window: ${windowType}`);

      // Update window states
      setWindows(prev => ({
        ...prev,
        [windowType]: true
      }));

      // Clear minimized state if needed
      if (minimizedWindows[windowType]) {
        setMinimizedWindows(prev => ({
          ...prev,
          [windowType]: false
        }));
      }
    }

    // Add subtle professional focus effect
    setTimeout(() => {
      // Find the window element
      const windowElement = document.querySelector(`.${windowConfig[windowType].class.split(' ')[0]}`);
      if (windowElement) {
        // Add a brief professional highlight effect
        windowElement.classList.add('window-professional-focus');

        // Remove the highlight class after animation completes
        setTimeout(() => {
          windowElement.classList.remove('window-professional-focus');
        }, 400);
      }
    }, 50);
  };

  // Handle window close - with debounce to prevent accidental double-closing
  const handleWindowClose = (windowType) => {
    console.log(`Window close handler called for: ${windowType}`);

    // Use setTimeout to debounce the close action
    setTimeout(() => {
      closeWindow(windowType);
    }, 50);
  };

  // Handle window minimize - with debounce to prevent accidental actions
  const handleWindowMinimize = (windowType) => {
    console.log(`Window minimize handler called for: ${windowType}`);

    // Use setTimeout to debounce the minimize action
    setTimeout(() => {
      minimizeWindow(windowType);
    }, 50);
  };

  return (
    <div className="desktop">
      {/* Particles effect */}
      <div className="particles-container"></div>

      {/* Desktop Icons */}
      <div className="desktop-icons">
        <div className="icon" id="run-node-icon" onClick={() => toggleWindow('node')}>
          <NodeIcon />
          <p>Run Node</p>
        </div>

        <div className="icon" id="tasks-icon" onClick={() => toggleWindow('tasks')}>
          <TasksIcon />
          <p>Verification Tasks</p>
        </div>

        <div className="icon" id="wallet-icon" onClick={() => toggleWindow('wallet')}>
          <WalletIcon />
          <p>Wallet</p>
        </div>

        <div className="icon" id="stats-icon" onClick={() => toggleWindow('stats')}>
          <StatsIcon />
          <p>Stats</p>
        </div>

        <div className="icon" id="verification-icon" onClick={() => toggleWindow('verification')}>
          <div className="custom-icon verification-icon"></div>
          <p>Threshold Verification</p>
        </div>

        <div className="icon" id="distribution-icon" onClick={() => toggleWindow('distribution')}>
          <div className="custom-icon distribution-icon"></div>
          <p>Task Distribution</p>
        </div>

        <div className="icon" id="merkle-icon" onClick={() => toggleWindow('merkle')}>
          <MerkleIcon />
          <p>Merkle Commitments</p>
        </div>

        {/* New icons for additional applications */}
        <div className="icon" id="terminal-icon" onClick={() => toggleWindow('terminal')}>
          <div className="custom-icon terminal-icon"></div>
          <p>Terminal</p>
        </div>

        <div className="icon" id="settings-icon" onClick={() => toggleWindow('settings')}>
          <div className="custom-icon settings-icon"></div>
          <p>Settings</p>
        </div>

        <div className="icon" id="help-icon" onClick={() => toggleWindow('help')}>
          <div className="custom-icon help-icon"></div>
          <p>Help</p>
        </div>

        <div className="icon" id="explorer-icon" onClick={() => toggleWindow('explorer')}>
          <div className="custom-icon explorer-icon"></div>
          <p>File Explorer</p>
        </div>
      </div>

      {/* Windows */}
      {Object.keys(windowConfig).map(windowType => (
        <ReactWinBox
          key={windowType}
          title={windowConfig[windowType].title}
          width={windowConfig[windowType].width}
          height={windowConfig[windowType].height}
          x={windowConfig[windowType].x}
          y={windowConfig[windowType].y}
          className={windowConfig[windowType].class}
          isOpen={windows[windowType]}
          onClose={() => handleWindowClose(windowType)}
          onMinimize={() => handleWindowMinimize(windowType)}
          onFocus={() => handleWindowFocus(windowType)}
        >
          {(contentElement) => {
            console.log(`Content element received for ${windowType}`);
            if (contentElement) {
              try {
                // Store the content element in our refs for future use
                contentRefs[windowType].current = contentElement;

                // Render the window content with the provided element
                renderWindowContent(windowType, contentElement);
              } catch (error) {
                console.error(`Error rendering content for ${windowType}:`, error);
                contentElement.innerHTML = `<div class="error-message">Error loading content: ${error.message}</div>`;
              }
            }
          }}
        </ReactWinBox>
      ))}

      {/* Professional Notifications */}
      <div className="notifications-container">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`notification professional ${notification.type}`}
            style={{
              animation: `professionalSlideIn 0.3s ease`
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent clicks from propagating through
            }}
          >
            {/* Notification icon based on type */}
            <div className={`notification-icon ${notification.type}-icon`}></div>

            <div className="notification-content">
              <div className="notification-header">
                <div className="notification-title">{notification.title}</div>
                <div
                  className="notification-close"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event propagation
                    setNotifications(prev =>
                      prev.filter(n => n.id !== notification.id)
                    );
                  }}
                >×</div>
              </div>
              <div className="notification-message">{notification.message}</div>
              <div className="notification-time">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </div>

              {/* Progress bar that animates to show auto-hide timing */}
              <div className="notification-progress-bar">
                <div className="notification-progress-fill"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar
        openWindows={windows}
        toggleWindow={toggleWindow}
        minimizedWindows={minimizedWindows}
      />
    </div>
  );
};

export default Desktop;
