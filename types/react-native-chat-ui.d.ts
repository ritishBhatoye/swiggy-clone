declare module "react-native-chat-ui" {
  export interface ChatMessage {
    id: string;
    type: string;
    role: "user" | "assistant";
    content: string;
  }

  export interface BubbleProps {
    message: ChatMessage;
    [key: string]: any;
  }

  export interface ChatViewProps {
    messages: ChatMessage[];
    renderBubble: (props: BubbleProps) => React.ReactNode;
  }

  export const Bubble: React.FC<BubbleProps>;
  export const ChatView: React.FC<ChatViewProps>;
}
