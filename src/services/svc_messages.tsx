import { IChatMessage, usePromptState } from "@/components/prompt/prompt_state";

function getStoredMessages() : IChatMessage[] {
    return usePromptState.getState().stored_messages;
}

export default getStoredMessages;