import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";

const ChatBotShell = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/api/GetChatBot")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data:", data); // Debugging log

        // Welcome message
        const welcomeStep = {
          id: "0",
          message: "Welcome! How can I assist you today?",
          trigger: "ask_name", // Trigger the name asking step
        };

        // Ask for the user's name (mandatory question)
        const askNameStep = {
          id: "ask_name",
          message: "What is your name?",
          trigger: "user_name", // Move to the next step after receiving the name
        };

        // Capture the user's name and ensure it's not empty (mandatory)
        const userNameStep = {
          id: "user_name",
          user: true,
          validation: (value) => {
            if (!value) {
              return "Please provide your name."; // Validation message
            }
            return true; // Proceed if name is provided
          },
          trigger: "options", // Move to the options menu after getting the name
        };

        // Options menu (show predefined questions + option to type a new question)
        const optionsStep = {
          id: "options",
          options: [
            ...data.map((item) => ({
              value: item.id.toString(),
              label: item.message,
              trigger: item.id.toString(),
            })),
            { value: "custom", label: "Ask a new question", trigger: "custom_question" },
          ],
        };

        // Steps for predefined questions and answers
        const questionSteps = data.map((item) => ({
          id: item.id.toString(),
          message: item.message,
          trigger: item.id.toString() + "_response",
        }));

        const answerSteps = data.map((item) => ({
          id: item.id.toString() + "_response",
          message: item.answer,
          trigger: "options", // Show options again after answering
        }));

        // Step to allow users to type a new question
        const customQuestionStep = {
          id: "custom_question",
          message: "Please type your question below.",
          trigger: "user_question",
        };

        // Capture user's typed question and provide a response
        const userQuestionStep = {
          id: "user_question",
          user: true,
          trigger: "custom_response",
        };

        // Generic response to user-typed questions
        const customResponseStep = {
          id: "custom_response",
          message: "That's a great question! I’ll try my best to help.",
          trigger: "options", // Go back to options after answering
        };

        setSteps([
          welcomeStep,
          askNameStep, // Add the name asking step
          userNameStep, // Ensure this step captures the name before proceeding
          optionsStep,
          ...questionSteps,
          ...answerSteps,
          customQuestionStep,
          userQuestionStep,
          customResponseStep,
        ]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {steps.length > 0 ? (
        <ChatBot steps={steps} floating={true} botAvatar="/dist/img/Rajesh.jpg" />
      ) : (
        <p>Loading chat...</p>
      )}
    </div>
  );
};

export default ChatBotShell;
