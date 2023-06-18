import { useEffect, useRef, useState } from "react";
import { Container, TextInput, Loader, ActionIcon } from "@mantine/core";
import Message from "./Message";
import { createClient } from "@supabase/supabase-js";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import axios from "axios";

const supabase = createClient(
  "https://ledcgfuknedemwvvjuqs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZGNnZnVrbmVkZW13dnZqdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4MDQyMDQsImV4cCI6MjAwMjM4MDIwNH0.zBJ1YtYm_8nsMQ6MUL-PS2cEDeVQ__rbOo3n3bnbosY"
);
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  async function queryLLM(message: string): Promise<any> {
    const Req = {
      query_string: message,
    };
    console.log(Req.query_string);
    try {
      const response = await axios.post("http://127.0.0.1:5000/query", Req);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  async function sendMessage() {
    if (inputValue.trim() !== "") {
      const userMessage = inputValue.trim();
      const messageId = messages.length; // Incrementing ID for each message

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue("");
      setIsLoading(true);

      // Simulating chatbot response

      const res = await queryLLM(userMessage);
      console.log(res);
      const styledResponse = res.replace(/(\[link\d+\])/g, '<span class="highlighted-link">$1</span>');

      setMessages((prevMessages) => [...prevMessages, styledResponse]);
      setIsLoading(false);
      return res;
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat box when messages update
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          height: "95vh",
          width: "90vh",
          overflow: "auto",
          borderRadius: "0.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow:
            "0 0 10px rgba(255, 255, 255, 0.5)" /* Lighter drop shadow */,
          backgroundColor: "#141414",
        }}
      >
        <div
          style={{ padding: "1rem", flex: "1", overflow: "auto" }}
          ref={chatBoxRef}
        >
          <Container size="lg">
            
            {messages.map((message, index) => (
              <Message key={index} content={message} isUser={index % 2 === 0} />
            
              
            ))}
          </Container>
        </div>
        <div style={{ padding: "1rem", textAlign: "center" }}>
          {isLoading ? (
            <div style={{ position: "relative", display: "inline-block" }}>
              <Loader size="xs" style={{ paddingTop: "2rem" }} />
            </div>
          ) : (
            <TextInput
              value={inputValue}
              onChange={(event) => setInputValue(event.currentTarget.value)}
              icon={<IconSearch size="1.1rem" stroke={1.5} />}
              radius="xl"
              onKeyDown={(event) => handleKeyDown(event)}
              size="md"
              rightSection={
                <ActionIcon size={32} radius="xl" variant="filled">
                  <IconArrowRight size="1.1rem" stroke={1.5} />
                </ActionIcon>
              }
              placeholder=""
              rightSectionWidth={42}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
