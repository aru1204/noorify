import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { TbMessage2Question } from "react-icons/tb";
import { RiQuestionnaireFill } from "react-icons/ri";
import useAuth from "../../Hooks/UseAuth/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const QuestionToAI = () => {
  const [savedQA, setSavedQA] = useState(null);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const askQuestion = async () => {
    if (user && user?.email) {
      const { value: question } = await Swal.fire({
        title: "Ask AI a Question",
        input: "text",
        inputPlaceholder: "Type your question here...",
        showCancelButton: true,
        confirmButtonColor: "#013a2c",
        cancelButtonColor: "#d33",
        confirmButtonText: "Send Question",
      });

      if (question) {
        try {
          const response = await axiosPublic.get(`/noorify-ai`, {
            params: { question },
          });

          const answer = response.data;

          const formattedAnswer = `
            <strong><em>Answer:</em></strong><br>${answer.main}<br>
            <strong><em>Quran (Ref):</em></strong><br>${answer.quran}<br><br>
            <strong><em>Hadith (Ref):</em></strong><br>${answer.hadith}
          `;

          setSavedQA({ question, answer });

          Swal.fire({
            title: "AI Response",
            html: formattedAnswer,
            showCancelButton: true,
            confirmButtonColor: "#013a2c",
            cancelButtonText: "Close",
            cancelButtonColor: "#d33",
            confirmButtonText: "Save this question to profile",
          }).then(async (result) => {
            if (result?.isConfirmed) {

              const questions = {
                email: user?.email,
                question: question,
                answer: answer,
                questionTime: new Date().toLocaleString() // Adding local date and time
              };


              await axiosPublic.post("/questions", questions)
                .then(() => {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "QA saved successfully",
                    showConfirmButton: false,
                    timer: 3000,
                  });
                })

            }
          });
        } catch (error) {
          Swal.fire("Error", "Failed to fetch answer", "error");
        }
      }
    } else {
      Swal.fire({
        title: "Please login to ask a question!",
        text: "You need to be logged in to ask a question.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#013a2c",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full md:w-fit fixed bottom-0 right-0 z-20">
      <button
        onClick={askQuestion}
        className="bg-[#013a2c] font-semibold text-white px-6 py-2 w-full "
      >
        <div className="animate__animated animate__pulse animate__infinite flex gap-3 items-center justify-center ">
          Ask any Question to Noorify AI <div className="text-xl"><RiQuestionnaireFill /></div>
        </div>
      </button>
    </div>
  );
};

export default QuestionToAI;
