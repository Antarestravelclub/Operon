import { useState, useEffect, useRef } from 'react'
import { Mic } from 'lucide-react'

interface VoiceCommandProps {}

const commands = [
  { trigger: ["follow up", "send email", "contact"], action: "SEND_FOLLOWUP" },
  { trigger: ["how many", "stats", "activity", "report"], action: "SHOW_STATS" },
  { trigger: ["pause", "stop"], action: "PAUSE_AGENT" },
  { trigger: ["resume", "start", "activate"], action: "RESUME_AGENT" },
  { trigger: ["hire", "new employee", "add"], action: "HIRE_EMPLOYEE" },
  { trigger: ["help", "what can you do"], action: "SHOW_HELP" },
]

const responses = {
  SEND_FOLLOWUP: "Opening the follow-up form for your Sales Assistant. Who would you like to follow up with?",
  SHOW_STATS: "Today Alex sent 12 follow-up emails. Sam resolved 8 support tickets. Your AI workforce is working hard!",
  PAUSE_AGENT: "Pausing your AI employee. They'll stop working until you resume them.",
  RESUME_AGENT: "Your AI employee is back to work! They'll continue handling tasks immediately.",
  HIRE_EMPLOYEE: "Opening the hire flow. Let's add a new AI employee to your workforce!",
  SHOW_HELP: "You can say: 'Send a follow-up', 'Show my stats', 'Pause the agent', 'Hire a new employee', or 'What's happening today?'",
  DEFAULT: "I didn't catch that. Try saying 'Send a follow-up', 'Show my stats', or 'Help' for a list of commands."
}

export default function VoiceCommand({}: VoiceCommandProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [showHint, setShowHint] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const recognitionRef = useRef<any>(null)
  const transcriptTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Check if browser supports Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('')
        
        setTranscript(transcript)

        // Clear existing timeout
        if (transcriptTimeoutRef.current) {
          clearTimeout(transcriptTimeoutRef.current)
        }

        // Set timeout to process final result
        transcriptTimeoutRef.current = setTimeout(() => {
          if (event.results[0].isFinal) {
            processCommand(transcript)
          }
        }, 500)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        setResponse("Sorry, I encountered an error with the microphone. Please try again.")
        speak("Sorry, I encountered an error with the microphone. Please try again.")
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (transcriptTimeoutRef.current) {
        clearTimeout(transcriptTimeoutRef.current)
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
  }

  const processCommand = (transcript: string) => {
    setIsProcessing(true)
    const lowerTranscript = transcript.toLowerCase()

    // Find matching command
    let matchedAction = null
    for (const command of commands) {
      for (const trigger of command.trigger) {
        if (lowerTranscript.includes(trigger)) {
          matchedAction = command.action
          break
        }
      }
      if (matchedAction) break
    }

    const responseText = matchedAction ? responses[matchedAction as keyof typeof responses] : responses.DEFAULT
    setResponse(responseText)
    
    // Speak the response
    setTimeout(() => {
      speak(responseText)
      setIsProcessing(false)
    }, 300)

    // Clear transcript after a delay
    setTimeout(() => {
      setTranscript('')
    }, 3000)
  }

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setResponse("Speech recognition is not supported in your browser. Please use Chrome or Edge.")
      speak("Speech recognition is not supported in your browser. Please use Chrome or Edge.")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setTranscript('')
      setResponse('')
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  return (
    <>
      {/* Voice Hint Banner */}
      {showHint && (
        <div className="fixed top-20 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs z-50 animate-slide-in">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">🎤 Try voice commands — click the mic button!</span>
            </div>
            <button 
              onClick={() => setShowHint(false)}
              className="text-gray-400 hover:text-gray-600 text-sm font-medium"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Floating Voice Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Transcript Bubble */}
        {isListening && transcript && (
          <div className="absolute bottom-full mb-3 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px] max-w-[300px]">
            <p className="text-sm text-gray-700 font-medium mb-1">Listening...</p>
            <p className="text-xs text-gray-600 italic">{transcript}</p>
          </div>
        )}

        {/* Response Card */}
        {response && (
          <div className="absolute bottom-full mb-3 right-0 bg-violet-600 text-white rounded-lg shadow-lg p-4 min-w-[250px] max-w-[320px] animate-slide-up">
            <p className="text-sm">{response}</p>
          </div>
        )}

        {/* Mic Button */}
        <button
          onClick={toggleListening}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
            ${isListening 
              ? 'bg-red-500 animate-pulse-scale text-white' 
              : 'bg-violet-600 hover:bg-violet-700 text-white'
            }
            ${isProcessing ? 'opacity-75 cursor-wait' : ''}
          `}
          disabled={isProcessing}
        >
          <Mic className="h-6 w-6" />
        </button>
      </div>
    </>
  )
}
