"use client"

import Prompt from "@/components/prompt/prompt";
import { IChatMessage } from "@/components/prompt/prompt_state";
import getStoredMessages from "@/services/svc_messages";
import { useRef } from "react";

const styleContent = {
    fontFamily: 'Segoe UI',
    fontSize: '1rem',
    fontWeight: '300',
    marginTop: '0.5rem',
    marginRight: '1rem',
    height: '65vh',
    overflow: 'auto',
    paddingRight:'0rem',
    paddingLeft:'0rem',
    display: 'flex',
    flexDirection: 'column-reverse',
    scrollBehavior: "smooth",
}

const styleMessages = {
    lineHeight: '1.5rem',
    marginRight: '2.5rem',
}

const styleUser = {
    fontWeight: '600',
   
}

const styleAssistant = {
    marginBottom: '1rem',
    
}

function DisplayStoredMessages({ messages }: { messages: IChatMessage[] }) {
    console.log("Fetching messages from localStorage")
    return (
        messages.map((m: IChatMessage, index: number) => (
            <div key={index} style={m.role == "user" ? styleUser : styleAssistant}>
                <div>{m.content}</div>
            </div>
        ))
    )
}

function Chat() {
    const responseRef = useRef(null);
    return (
        <div className="main-content">
            <div style={styleContent as React.CSSProperties}>
                <div style={styleMessages} ref={responseRef}>
                    <DisplayStoredMessages messages={getStoredMessages()} />
                </div>
            </div>
            <div style={{marginRight: '2.5rem'}}>
                <Prompt getAreaResponsesRef={() => responseRef.current} />
            </div>
            
        </div>
        
    )
}
console.clear();
export default Chat;