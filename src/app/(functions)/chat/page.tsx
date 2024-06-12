"use client"

import Prompt from "@/components/prompt/prompt";
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

function Chat() {
    const responseRef = useRef(null);
    const getResponseRef = () => responseRef.current;
    return (
        <div className="main-content">
            <div style={styleContent as React.CSSProperties}>
                <h1 style = {{display : initPage ? "block" : "none"}} id='splash'>SPLASH</h1>
                <div style={styleMain} ref={responseRef}></div>
            </div>
            <Prompt getResponseRef={getResponseRef} />
        </div>
    )
}

export default Chat;