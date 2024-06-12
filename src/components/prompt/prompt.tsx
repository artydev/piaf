
import React, { useCallback, useRef } from 'react';
import ollama from 'ollama/browser';
import { IChatMessage, usePromptState } from "@/components/prompt/prompt_state";
import { useStore } from "zustand";
import { html } from "sinuous"

type GetRefInput = () => HTMLInputElement | null;
type GetRefHtmlElement = () => HTMLElement | null;
type GetRefButtonElement = () => HTMLButtonElement | null;
type StoreMessage = (message: IChatMessage) => void;

const directive = `Respond in italian only, whatever le user language`;

// Add initial system message if first response
let isFirstResponse = true;

// Définition des styles
const stylePrompt = {
    marginRight: '3.5rem',
    marginLeft: '3rem',
    marginBottom: '1rem',
};

const styleInput = {
    width: '100%',
    border: 'var(--border-color)',
    height: '2rem',
    borderRadius: '3px',
    padding: '1rem',
};

const styleInputButton = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
};

// Initialisation de l'array messages 
const messages: IChatMessage[] = [];

// Titre du message
function setTitleMessage(title: string): string {
    return `<h1 style='background:rgba(0,0,0,0.08); padding:3px'>${title}</h1>`;
}




function handleFirstResponse() {
    if (isFirstResponse) {
       
        messages.push({
            role: 'system',
            content: directive,
        });

        const splash = document.getElementById("splash") as HTMLElement;
        if (splash) {
            splash.style.display = "none";
        }
        isFirstResponse = false;
    }
}

function createMessageContainer(responseArea: any, input: HTMLInputElement) {
    responseArea.innerHTML += setTitleMessage(input.value);
    input.value = "";
    const divResponse = html`<div style='margin-left:0rem; margin-bottom:1rem;font-weight:300'></div>`;
    responseArea.appendChild(divResponse);
    return divResponse as HTMLElement;
}

function displayAndStoreMessage(role: string, content: string, storeMessage: (message: IChatMessage) => void) {
    messages.push({
        role: role,
        content: content
    });
    storeMessage({
        role: role,
        content: content,
    });
}

async function sendMessages() {
    const response = await ollama.chat({
        model: 'llama3',
        messages,
        stream: true,
    });
    return response;
}

async function sendPrompt(
    getInputRef: GetRefInput, getResponseRef: GetRefHtmlElement,
    getButtonRef: GetRefButtonElement, storeMessage: StoreMessage
) {
    const input = getInputRef() as HTMLInputElement;

    let assistantMessage = "";

    const [button, responseArea] = [getButtonRef(), getResponseRef()];
    
    button && (button.innerText = "...") && (button.disabled)

    handleFirstResponse();

    displayAndStoreMessage("user", input.value, storeMessage);

    const messageContainer = createMessageContainer(responseArea, input);

    const response = await sendMessages();

    messageContainer.innerHTML = "Loading"

    assistantMessage = await streamMessage(response, messageContainer);

    displayAndStoreMessage('assistant', assistantMessage, storeMessage)

    input.value = ""; input.focus();

    button && (button.innerText = "Envoyer") && (button.disabled = false);
}

async function streamMessage(response:any, messageContainer: HTMLElement) {
    messageContainer.innerHTML = "";
    let assistantMessage = "";
    for await (const chunk of response) {
        const chunked = chunk.message.content;
        messageContainer.innerHTML += chunked;
        assistantMessage += chunked;
    }
    return assistantMessage;
}

// Composant Prompt
function Prompt({ getResponseRef }: { getResponseRef: () => HTMLElement | null }) {

    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const getInputRef = () => inputRef.current;
    const getButtonRef = () => buttonRef.current;

    const { store_message } = useStore(usePromptState, (state) => state);
 

    return (
        <div className="centered-content" style={stylePrompt}>
            <div style={styleInputButton}>
                <input ref={inputRef} style={styleInput} />
                <button ref={buttonRef} onClick={() => {
                    sendPrompt(
                        getInputRef,
                        getResponseRef,
                        getButtonRef,
                        store_message
                    );
                }}>
                    Envoyer
                </button>
            </div>
        </div>
    );
}

export default Prompt;
