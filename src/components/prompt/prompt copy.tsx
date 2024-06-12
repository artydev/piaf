// Importation nécessaire des hooks et composants
import React, { useCallback, useRef } from 'react';
import ollama from 'ollama/browser';

let firstResponse = true;

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
const messages: { role: string; content: any }[] = [];

// Titre du message
function setTitleMessage(title: string): string {
  return `<h1 style="font-weight:bold;">${title}</h1>`;
}

// Envoi du prompt et la réception de la réponse
async function sendPrompt(

  getInputRef: () => HTMLInputElement | null,
  getResponseRef: () => HTMLElement | null,
  getButtonRef: () => HTMLButtonElement | null) {

  const input = getInputRef();
  if (!input) return;

  const button = getButtonRef();

  if (button) {
    button.innerText = "..."
    button.disabled = true;
  }

  const areaResponse = getResponseRef() as HTMLElement;

  if (firstResponse) {

    messages.push({
      role: 'system',
      content: `
        You are a helpful, smart, kind, and efficient AI assistant. 
        You always fulfill the user's requests to the best of your ability, and
        you always respond in italian without any traduction`
    });

    firstResponse = false
  }

  messages.push({
    role: 'user',
    content: input.value,
  });

  try {

    const response = await ollama.chat({
      model: 'llama3',
      messages,
      stream: true,
    });

    areaResponse.innerHTML += setTitleMessage(input.value);

    let d = document.createElement("div") as HTMLElement
    d.style.marginLeft = '1rem';
    d.style.marginBottom= '1rem';
    areaResponse.appendChild(d)

    let assistantMessage = "";

    for await (const chunk of response) {
      let chunked = chunk.message.content;
      d.innerHTML += chunked;
      assistantMessage += chunked;
    }

    messages.push({
      role: 'assistant',
      content: assistantMessage,
    });

    input.value = "";
    input.focus();

    if (button) {
      button.innerText = "Envoyer"
      button.disabled = false;
    }

  } catch (error) {
    console.error('Échec de l\'envoi du prompt:', error);
  }
}

// Composant Prompt
function Prompt({ getResponseRef }: { getResponseRef: () => HTMLElement | null }) {

  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  const getInputRef = useCallback(() => inputRef.current, []);
  const getButtonRef = useCallback(() => buttonRef.current, []);

  return (
    <div className="centered-content" style={stylePrompt}>
      <div style={styleInputButton}>
        <input ref={inputRef} style={styleInput} />
        <button ref={buttonRef} onClick={() => {
          sendPrompt(
            getInputRef,
            getResponseRef,
            getButtonRef
          );
        }}>
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default Prompt;
