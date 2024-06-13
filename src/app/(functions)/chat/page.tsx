"use client"

import Prompt from "@/components/prompt/prompt";
import { IChatMessage } from "@/components/prompt/prompt_state";
import getStoredMessages from "@/services/svc_messages";
import { useRef } from "react";

const styleContent = {
    fontSize: '0.90rem',
    fontWeight: 300,
    marginTop: '0.5rem',
    marginRight: '1rem',
    height: '75vh',
    overflow: 'auto',
    background: 'hsl(250, 100%, 98.5%)',
    padding:'3rem',
    display: 'flex',
    flexDirection: 'column-reverse',
    scrollBehavior: "smooth",
   
}

const styleMessages = {
    lineHeight: '1.45rem',
    marginRight: '1rem',
}

const styleUser = {
    fontWeight: '500',
   
}

const styleAssistant = {
    marginBottom: '1rem',
    
}

function DisplayStoredMessages({ messages }: { messages: IChatMessage[] }) {
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
            <Prompt getAreaResponsesRef={() => responseRef.current} />
        </div>
    )
}

export default Chat;