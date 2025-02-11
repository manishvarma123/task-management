import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { backend_domain } from '../constant';
import { toast } from 'react-toastify';
import { taskAPI } from '../api/api';

const TimerPage = () => {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        reset,
        stop
    } = useStopwatch({ autoStart: false });

    const [isPaused, setIsPaused] = useState(false);
    const [timer, setTimer] = useState({
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
    });

    // Start the timer
    const handleStart = () => {
        start();
        setIsPaused(false);
    };

    // Pause the timer and send a request to the backend
    const handlePause = async () => {
        pause();
        setIsPaused(true); // Mark as paused when the timer is paused
        setTimer({
            day: days,
            hour: hours,
            minute: minutes,
            second: seconds
        });

        try {
            const timerData = {
                day: days,
                hour: hours,
                minute: minutes,
                second: seconds
            };
            const res = await taskAPI.post(`${backend_domain}/api/v1/user/resume-timer`, timerData, {
                withCredentials: true,
            });
            console.log(res?.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    // Resume the timer
    const handleResume = () => {
        start();
        setIsPaused(false);
    };

    // Stop the timer and reset
    const handleStop = () => {
        stop();
        setIsPaused(false);
        setTimer({
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        });
    };

    useEffect(() => {
        if (isPaused) {
            handlePause();
        }
    }, [isPaused]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>React Timer Hook</h1>
            <p>Stopwatch Demo</p>
            <div style={{ fontSize: '50px', margin: '20px' }}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>

            <p>{isRunning ? 'Running' : 'Not running'}</p>

            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={handleStart}
                    disabled={isRunning || isPaused}
                    style={{ padding: '10px 20px', margin: '5px', fontSize: '16px' }}
                >
                    Start
                </button>
                <button
                    onClick={handlePause}
                    disabled={!isRunning || isPaused}
                    style={{ padding: '10px 20px', margin: '5px', fontSize: '16px' }}
                >
                    Pause
                </button>
                <button
                    onClick={handleResume}
                    disabled={!isPaused}
                    style={{ padding: '10px 20px', margin: '5px', fontSize: '16px' }}
                >
                    Resume
                </button>
                <button
                    onClick={handleStop}
                    disabled={!isRunning}
                    style={{ padding: '10px 20px', margin: '5px', fontSize: '16px' }}
                >
                    Stop
                </button>
            </div>

            <div style={{ fontSize: '50px', margin: '20px' }}>
                <span>{timer.day}</span>:<span>{timer.hour}</span>:<span>{timer.minute}</span>:<span>{timer.second}</span>
            </div>
        </div>
    );
};

export default TimerPage;
