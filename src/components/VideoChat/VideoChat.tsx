import React, { useEffect, useRef, useState } from 'react';
import "./VideoChat.scss";
import { io, Socket } from 'socket.io-client';
import Button from "../../reusableComponents/button/Button";
import Text from "../../reusableComponents/text/Text";
import { MdCall, MdCallEnd } from "react-icons/md";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";

type RTCConnectionConfig = {
    iceServers: RTCIceServer[];
};

function VideoChat () {
    const [muted, setMuted] = useState<boolean>(false);
    const [videoOff, setVideoOff] = useState<boolean>(false);
    const [incomingCall, setIncomingCall] = useState<boolean>(false);
    const [currentCaller, setCurrentCaller] = useState<string | null>(null);

    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const socket = useRef<Socket | null>(null);

    const config: RTCConnectionConfig = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    };

    useEffect(() => {
        // Initialize socket connection
        socket.current = io('http://localhost:3030');

        socket.current.on('connect', () => {
            console.log('Connected to socket:', socket.current?.id);
        });

        socket.current.on('call-request', (data: { from: string }) => {
            setIncomingCall(true);
            setCurrentCaller(data.from);
        });

        socket.current.on('offer-received', handleOffer);
        socket.current.on('answer-received', handleAnswer);
        socket.current.on('ice-candidate', handleIceCandidate);
        socket.current.on('call-ended', handleCallEnded);

        return () => {
            socket.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        // Access user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localStreamRef.current = stream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            })
            .catch((error) => console.error('Error accessing media devices:', error));
    }, []);

    const startCall = (target: string) => {
        if (!target) return alert('Please enter a user ID to call.');

        const peerConnection = new RTCPeerConnection(config);
        peerConnectionRef.current = peerConnection;


        localStreamRef.current?.getTracks().forEach((track) =>
            peerConnection.addTrack(track, localStreamRef.current as MediaStream)
        );


        peerConnection.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate && socket.current) {
                socket.current.emit('ice-candidate', {
                    target,
                    candidate: event.candidate,
                });
            }
        };

        peerConnection.createOffer()
            .then((offer) => peerConnection.setLocalDescription(offer))
            .then(() => {
                socket.current?.emit('send-offer', {
                    target,
                    offer: peerConnection.localDescription,
                });
            });
    };

    const handleOffer = (data: { from: string; offer: RTCSessionDescriptionInit }) => {
        const peerConnection = new RTCPeerConnection(config);
        peerConnectionRef.current = peerConnection;

        peerConnection.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate && socket.current) {
                socket.current.emit('ice-candidate', {
                    target: data.from,
                    candidate: event.candidate,
                });
            }
        };

        peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))
            .then(() => {
                localStreamRef.current?.getTracks().forEach((track) =>
                    peerConnection.addTrack(track, localStreamRef.current!)
                );

                return peerConnection.createAnswer();
            })
            .then((answer) => peerConnection.setLocalDescription(answer))
            .then(() => {
                socket.current?.emit('send-answer', {
                    target: data.from,
                    answer: peerConnection.localDescription,
                });
            });
    };

    const handleAnswer = (data: { answer: RTCSessionDescriptionInit }) => {
        peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(data.answer));
    };

    const handleIceCandidate = (data: { candidate: RTCIceCandidateInit }) => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate))
                .catch((error) => console.error('Error adding received ICE candidate:', error));
        }
    };

    const handleCallEnded = () => {
        endCall();
        alert('The call has been ended by the other user.');
    };

    const acceptCall = () => {
        setIncomingCall(false);

        const peerConnection = new RTCPeerConnection(config);
        peerConnectionRef.current = peerConnection;

        localStreamRef.current?.getTracks().forEach((track) =>
            peerConnection.addTrack(track, localStreamRef.current!)
        );

        peerConnection.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate && socket.current) {
                socket.current.emit('ice-candidate', {
                    target: currentCaller!,
                    candidate: event.candidate,
                });
            }
        };

        peerConnection.createOffer()
            .then((offer) => peerConnection.setLocalDescription(offer))
            .then(() => {
                socket.current?.emit('send-offer', {
                    target: currentCaller!,
                    offer: peerConnection.localDescription,
                });
            });
    };

    const rejectCall = () => {
        setIncomingCall(false);
        setCurrentCaller(null);
    };

    const endCall = () => {
        peerConnectionRef.current?.close();
        peerConnectionRef.current = null;

        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }

        socket.current?.emit('end-call', { target: currentCaller });
        setCurrentCaller(null);
    };

    const toggleMic = () => {
        const audioTrack = localStreamRef.current?.getAudioTracks()[0];
        if (audioTrack) {
            setMuted((prevMuted) => {
                const newMuted = !prevMuted;
                audioTrack.enabled = !newMuted;
                return newMuted;
            });
        }
    };

    const toggleVideo = () => {
        const videoTrack = localStreamRef.current?.getVideoTracks()[0];
        if (videoTrack) {
            setVideoOff((prevVideoOff) => {
                const newVideoOff = !prevVideoOff;
                videoTrack.enabled = !newVideoOff;
                return newVideoOff;
            });
        }
    };

    return (
        <div id="video-chat">
            <div id="video-chat-wrapper">
                <div id="video-chat-video">
                    <div className="video-div">
                        <video ref={localVideoRef} autoPlay muted><track kind="captions"/></video>
                    </div>
                    <div className="video-div">
                        <video ref={remoteVideoRef} autoPlay>
                            <track kind="captions"/>
                        </video>
                    </div>
                </div>
                <div id="video-chat-buttons-wrapper">
                    <div id="video-chat-buttons-left-wrapper">
                        <Button fontSize={0} onClick={toggleMic}
                                buttonText={!muted ? <FaMicrophone size={25}/> : <FaMicrophoneSlash size={25}/>}/>
                        <Button fontSize={0} onClick={toggleVideo}
                                buttonText={!videoOff ? <FaVideo size={25}/> : <FaVideoSlash size={25}/>}/>
                    </div>
                    <div id="video-chat-buttons-right-wrapper">
                        <Button buttonColor="green" fontSize={0}
                                onClick={() => startCall(prompt('Enter user ID to call') ?? '')}
                                buttonText={<MdCall size={25}/>}/>
                        <Button buttonColor="pink" fontSize={0} onClick={endCall} buttonText={<MdCallEnd size={25}/>}/>
                    </div>
                    </div>
                    {incomingCall && (
                        <div id="callNotification">
                            <Text fontSize={24}>Incoming call...</Text>
                            <Button buttonColor="green" fontSize={20} onClick={acceptCall} buttonText={"Accept"}/>
                            <Button buttonColor="pink" fontSize={20} onClick={rejectCall} buttonText={"Reject"}/>
                        </div>
                    )}
                </div>
            </div>
    );
}

export default VideoChat;
