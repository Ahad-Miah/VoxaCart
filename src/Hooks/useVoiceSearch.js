// import { useState, useRef, useEffect } from 'react';

// export const useVoiceSearch = () => {
//   const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);

//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const rec = new SpeechRecognition();
//       rec.continuous = false;      
//       rec.interimResults = true;  

//       rec.onstart = () => {
//         setIsListening(true);
//         setIsFinished(false);
//       };

//       rec.onresult = (event) => {
//         let interimTranscript = '';
//         let finalTranscript = '';

//         for (let i = event.resultIndex; i < event.results.length; ++i) {
//           if (event.results[i].isFinal) {
//             finalTranscript += event.results[i][0].transcript;
//           } else {
//             interimTranscript += event.results[i][0].transcript;
//           }
//         }
//         setTranscript(finalTranscript || interimTranscript);
//       };

//       rec.onerror = (e) => {
//         console.error("Speech Recognition Error: ", e);
//         setIsListening(false);
//       };

//       rec.onend = () => {
//         setIsListening(false);
//         setIsFinished(true);
//       };

//       recognitionRef.current = rec;
//     }
//   }, []); 

//   const startListening = () => {
//     if (!recognitionRef.current) return;
//     try {
//       recognitionRef.current.stop();
//     } catch (e) {}
    
//     setTranscript('');
//     setIsFinished(false);
//     recognitionRef.current.start();
//   };

//   const openVoiceModal = () => {
//     setIsVoiceModalOpen(true);
//     setTranscript('');
//     setIsFinished(false);
    
//     setTimeout(() => {
//       if (recognitionRef.current) recognitionRef.current.start();
//     }, 300);
//   };

//   const closeVoiceModal = () => {
//     if (recognitionRef.current) {
//       try { recognitionRef.current.stop(); } catch(e){}
//     }
//     setIsVoiceModalOpen(false);
//   };

//   return {
//     isVoiceModalOpen,
//     setIsVoiceModalOpen,
//     transcript,
//     setTranscript,
//     isListening,
//     isFinished,
//     startListening,
//     openVoiceModal,
//     closeVoiceModal
//   };
// };