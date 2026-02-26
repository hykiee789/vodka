import React, { useEffect, useRef, useState } from 'react';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

const HandTracker = ({ onHandUpdate, isEnabled }) => {
    const videoRef = useRef(null);
    const detectorRef = useRef(null);
    const animationRef = useRef(null);
    const [status, setStatus] = useState('initializing');

    useEffect(() => {
        let stream = null;

        const setupDetector = async () => {
            try {
                const model = handPoseDetection.SupportedModels.MediaPipeHands;
                const detectorConfig = {
                    runtime: 'mediapipe',
                    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
                    modelType: 'full'
                };
                detectorRef.current = await handPoseDetection.createDetector(model, detectorConfig);
                setStatus('ready');
            } catch (error) {
                console.error('Error setting up hand detector:', error);
                setStatus('error');
            }
        };

        const startCamera = async () => {
            if (!isEnabled) return;
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 640, height: 480 },
                    audio: false,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setStatus('error');
            }
        };

        setupDetector();
        if (isEnabled) startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isEnabled]);

    useEffect(() => {
        if (!isEnabled || status !== 'ready') return;

        const detect = async () => {
            if (videoRef.current && detectorRef.current && videoRef.current.readyState === 4) {
                const hands = await detectorRef.current.estimateHands(videoRef.current);
                if (hands.length > 0) {
                    onHandUpdate(hands);
                } else {
                    onHandUpdate([]);
                }
            }
            animationRef.current = requestAnimationFrame(detect);
        };

        detect();
    }, [isEnabled, status, onHandUpdate]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-opacity duration-500 ${isEnabled && status === 'ready' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative w-48 h-36 md:w-64 md:h-48 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl backdrop-blur-sm bg-black/20">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                    muted
                    playsInline
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/80">Live View</span>
                </div>
            </div>
        </div>
    );
};

export default HandTracker;
