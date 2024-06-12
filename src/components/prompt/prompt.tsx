// Importation des modules nécessaires pour le fonctionnement du composant React
import React, {useRef } from 'react';
// Importation d'un module spécifique pour la gestion des interactions avec l'API Ollama
import ollama from 'ollama/browser';
// Importation de types et hooks personnalisés pour gérer l'état du chat
import { IChatMessage, usePromptState } from "@/components/prompt/prompt_state";
// Utilisation d'un état global via Zustand pour stocker les messages
import { useStore } from "zustand";
// Importation d'utilitaires pour manipuler le DOM
import { html } from "sinuous"

import getStoredMessages from '@/services/svc_messages';

// Définition de types pour références aux éléments du DOM
type GetRefInput = () => HTMLInputElement | null;
type GetRefHtmlElement = () => HTMLElement | null;
type GetRefButtonElement = () => HTMLButtonElement | null;

// Typage de la fonction
type StoreMessage = (message: IChatMessage) => void;

// Directive initiale à afficher dans le chat
const directive = `Tu es un assistant qui tente de répondre sérieusement.
Si tu ne sais pas, n'invente pas de réponses, dis simplement que tu ne sais pas`;

// Variable pour contrôler si c'est la première réponse de l'assistant
let isFirstResponse = true;

// Styles appliqués au prompt
const stylePrompt = {
    marginRight: '3.5rem',
    marginLeft: '3rem',
    marginBottom: '1rem',
};

// Styles appliqués à l'élément d'entrée
const styleInput = {
    width: '100%',
    border: 'var(--border-color)',
    height: '2rem',
    borderRadius: '3px',
    padding: '1rem',
};

// Styles appliqués au bouton d'envoi
const styleInputButton = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
};

// Styles appliqués au conteneur des réponses
const styleResponseContainer = 'margin-left:0rem; margin-bottom:1rem;font-weight:300';

// Tableau pour stocker les messages échangés
let messages: IChatMessage[] = [];

// Fonction pour ajouter un titre au message
function setTitleMessage(title: string): string {
    return `<h1 style='background:rgba(0,0,0,0.08); padding:3px'>${title}</h1>`;
}

// Fonction pour gérer la première réponse de l'assistant
function handleFirstResponse() {
    if (isFirstResponse) {
        messages.push({
            role: 'system',
            content: directive,
        });
        messages = [...messages, ...getStoredMessages()]
        isFirstResponse = false;
    }
}

// Fonction pour créer le conteneur des réponses
function getResponseContainer() {
    return html`<div style=${styleResponseContainer}></div>`
}

// Fonction pour créer un conteneur de message
function createMessageContainer(responseArea: any, input: HTMLInputElement) {
    responseArea.innerHTML += setTitleMessage(input.value);
    input.value = "";
    return responseArea.appendChild(getResponseContainer());
}

// Fonction pour afficher et stocker un message
function displayAndStoreMessage(
    role: string,
    content: string,
    storeMessage: StoreMessage) {
        
    messages.push({
        role: role,
        content: content
    });
    storeMessage({
        role: role,
        content: content,
    });
}

// Fonction asynchrone pour envoyer les messages et recevoir une réponse
async function sendMessages() {
    const response = await ollama.chat({
        model: 'llama3',
        messages,
        stream: true,
    });
    return response;
}

// Fonction asynchrone principale pour envoyer une demande et recevoir une réponse
async function sendPrompt(
    getInputRef: GetRefInput, getAreaResponsesRef: GetRefHtmlElement,
    getButtonRef: GetRefButtonElement, storeMessage: StoreMessage
) {
    const input = getInputRef() as HTMLInputElement;

    const [button, responseArea] = [getButtonRef(), getAreaResponsesRef()];

    button && (button.innerText = "...") && (button.disabled);

    handleFirstResponse();

    displayAndStoreMessage("user", input.value, storeMessage);

    const messageContainer = createMessageContainer(responseArea, input);

    const response = await sendMessages();

    messageContainer.innerHTML = "Loading"

    let assistantMessage = await streamMessage(response, messageContainer);

    displayAndStoreMessage('assistant', assistantMessage, storeMessage)

    input.value = ""; input.focus();

    button && (button.innerText = "Envoyer") && (button.disabled = false);
}

// Fonction asynchrone pour traiter la réponse en streaming
async function streamMessage(response: any, messageContainer: HTMLElement) {
    messageContainer.innerHTML = "";
    let assistantMessage = "";
    for await (const chunk of response) {
        const chunked = chunk.message.content;
        messageContainer.innerHTML += chunked;
        assistantMessage += chunked;
    }
    return assistantMessage;
}

// Composant principal qui rend le formulaire de chat
function Prompt({ getAreaResponsesRef }: { getAreaResponsesRef: () => HTMLElement | null }) {

    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    const getInputRef = () => inputRef.current;
    const getButtonRef = () => buttonRef.current;

    // Utilisation de l'état global pour stocker les messages
    const { store_message } = useStore(usePromptState, (state) => state);

    return (
        <div className="centered-content" style={stylePrompt}>
            <div style={styleInputButton}>
                <input ref={inputRef} style={styleInput} />
                <button ref={buttonRef} onClick={() => {
                    sendPrompt(
                        getInputRef,
                        getAreaResponsesRef,
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

// Exportation du composant pour son utilisation ailleurs
export default Prompt;
