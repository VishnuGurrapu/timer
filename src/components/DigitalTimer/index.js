import React from 'react';
import './index.css';

class DigitalTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      timerLimit: 25,  // Initial timer limit in minutes
      initialLimit: 25, // Store the initial limit separately
      timerId: null,
    };
  }

  componentWillUnmount() {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isStarted && !prevState.isStarted) {
      const id = setInterval(() => {
        this.setState((prevState) => ({
          timerLimit: Math.max(0, prevState.timerLimit - 1 / 60),
        }), () => {
          if (this.state.timerLimit === 0) {
            this.setState({ isStarted: false });
            clearInterval(this.state.timerId);
          }
        });
      }, 1000);
      this.setState({ timerId: id });
    } else if (!this.state.isStarted && prevState.isStarted) {
      clearInterval(this.state.timerId);
      this.setState({ timerId: null });
    }
  }

  handleStartPause = () => {
    this.setState((prevState) => ({
      isStarted: !prevState.isStarted
    }));
  };

  handlePlus = () => {
    if (!this.state.isStarted) {
      this.setState((prevState) => {
        const newLimit = prevState.initialLimit + 1;
        return { timerLimit: newLimit, initialLimit: newLimit };
      });
    }
  };

  handleMinus = () => {
    if (!this.state.isStarted) {
      this.setState((prevState) => {
        const newLimit = Math.max(0, prevState.initialLimit - 1);
        return { timerLimit: newLimit, initialLimit: newLimit };
      });
    }
  };

  handleReset = () => {
    this.setState({ 
      isStarted: false, 
      timerLimit: this.state.initialLimit 
    });
    clearInterval(this.state.timerId);
    this.setState({ timerId: null });
  };

  render() {
    const { isStarted, timerLimit, initialLimit } = this.state;

    // Calculate minutes and seconds for the timer display
    const minutes = Math.floor(timerLimit);
    const seconds = Math.floor((timerLimit % 1) * 60).toString().padStart(2, '0');

    const imgurl = isStarted 
      ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png" 
      : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png";
    const imgurlalt = isStarted ? 'pause icon' : 'play icon';
    
    return (
      <div className="clock-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="containersContainer">
          <div className="timerContiner">
            <div className="counter">
              <h1 className="time">{`${minutes}:${seconds}`}</h1> {/* Display current time */}
              <p className="status">{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="controlsContainer">
            <div className="buttonsContainer">
              
                <button 
                  className="pauseBtn pauserbtnContainer" 
                  onClick={this.handleStartPause}
                >
                  <img
                    className="pauseIcon"
                    src={imgurl}
                    alt={imgurlalt}
                  />
                
                <p className="pause">{isStarted ? 'Pause' : 'Start'}</p>
                </button>
            
              
                <button 
                  className="pauseBtn pauserbtnContainer" 
                  onClick={this.handleReset}
                >
                  <img
                    className="pauseIcon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                
                <p className="pause">Reset</p>
                </button>
              
            </div>
            <p className="para">Set Timer Limit</p>
            <div className="timeSetter">
              <button 
                className="addBtn" 
                onClick={this.handleMinus} 
                disabled={isStarted}
              >
                -
              </button>
              <p className="minutes">{initialLimit}</p> {/* Display initial timer limit */}
              <button 
                className="addBtn" 
                onClick={this.handlePlus} 
                disabled={isStarted}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalTimer;
