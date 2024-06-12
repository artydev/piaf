"use client"

import Prompt from "@/components/prompt/prompt";
import { IChatMessage, usePromptState } from "@/components/prompt/prompt_state";
import { useStore } from "zustand";
import { useRef } from "react";


let initPage = true

const styleContent = {
    marginRight: '3rem',
    marginLeft: '3rem',
    marginTop: '0.5rem',
    marginBottom: '0.8rem',
    height: '68.5vh',
    overflow: 'auto',
    padding: '1rem',
    background: 'rgba(0,0,0,0.0)',
    display: 'flex',
    flexDirection: 'column-reverse',
    scrollBehavior: "smooth"
}

const styleMain = {
    lineHeight: '1.45rem',
}

function displayStoredMessages (messages : IChatMessage[]) {
    return (
        messages.map((m : IChatMessage, index: number ) => (
            <div key={index} style={{fontWeight : m.role == "user" ? "bold " : "normal" }}>
                {m.content}
            </div>
        ))
    )
}

function getStoredMessages () {
    return usePromptState.getState().stored_messages;
}

function Chat() {
    const responseRef = useRef(null);
    const getResponseRef = () => responseRef.current;
    return (
        <div className="main-content">
            <div style={styleContent as React.CSSProperties}>
                <div style={styleMain} ref={responseRef}>
                   {displayStoredMessages(getStoredMessages())}
                </div>
            </div>
            <Prompt getResponseRef={getResponseRef} />
        </div>
    )
}

export default Chat;