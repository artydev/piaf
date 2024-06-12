"use client"

import Prompt from "@/components/prompt/prompt";
import { IChatMessage } from "@/components/prompt/prompt_state";
import getStoredMessages from "@/services/svc_messages";
import { useRef } from "react";

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

function DisplayStoredMessages({ messages }: { messages: IChatMessage[] }) {
    return (
        messages.map((m: IChatMessage, index: number) => (
            <div key={index} style={{ fontWeight: m.role == "user" ? "bold " : "normal" }}>
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
                <div style={styleMain} ref={responseRef}>
                    <DisplayStoredMessages messages={getStoredMessages()} />
                </div>
            </div>
            <Prompt getAreaResponsesRef={() => responseRef.current} />
        </div>
    )
}

export default Chat;