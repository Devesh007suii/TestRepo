import React, { useState } from "react";
import { addReview } from "../../api";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaCircleMinus } from "react-icons/fa6";
import "./form.css";

const Form = ({ isAdmin, formRef }) => {
  const [reviews, setReviews] = useState({
    name: "",
    email: "",
    instagram: "",
    numberOfQues: 1,
    questions: [],
    customBeat: "No",
    beatDescription: "",
  });
  const [successfully, setSuccessfully] = useState(false);
  const [addQuestion, setAddQuestion] = useState("");
  const [questionsForUser, setQuestionsForUser] = useState([
    {
      id: 1,
      question: "Do you like the Beats?",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addReview(reviews);
      console.log("Review uploaded successfully:", response.data);
      setSuccessfully(true);
      clear();
    } catch (error) {
      console.error("Error uploading review:", error);
    }
  };

  const clear = () => {
    setReviews({
      name: "",
      email: "",
      instagram: "",
      numberOfQues: 1,
      questions: [],
      customBeat: "No",
      beatDescription: "",
    });
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...reviews.questions];
    updatedQuestions[index] = questionsForUser[index].question + " " + value;
    setReviews({ ...reviews, questions: updatedQuestions });
  };

  const handleAddQuestions = () => {
    const newQuestion = {
      id: questionsForUser.length + 1,
      question: addQuestion,
    };
    setQuestionsForUser([...questionsForUser, newQuestion]);
    setAddQuestion("");
  };

  const handleRemoveQues = (index) => {
    if (questionsForUser.length !== 1) {
      const updatedQuestionsForUser = questionsForUser.filter(
        (ques, i) => i !== index
      );
      setQuestionsForUser(updatedQuestionsForUser);
    }
  };

  return (
    <div className="form_container" ref={formRef}>
      <h2 className="form_heading">Music Review</h2>
      {isAdmin && (
        <div className="form_group">
          <label className="form_label">Enter Question to Add:</label>
          <input
            type="text"
            value={addQuestion}
            className="form_input"
            onChange={(e) => setAddQuestion(e.target.value)}
            required
          />
          <span onClick={handleAddQuestions}>
            <MdOutlineAddCircle />
          </span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="user_form">
        <div className="form_group">
          <label className="form_label">Enter Your Full Name:</label>
          <input
            className="form_input"
            type="text"
            value={reviews.name}
            onChange={(e) => setReviews({ ...reviews, name: e.target.value })}
            required
          />
        </div>
        <div className="form_group">
          <label className="form_label">Enter Your Email Address:</label>
          <input
            className="form_input"
            type="email"
            value={reviews.email}
            onChange={(e) => setReviews({ ...reviews, email: e.target.value })}
            required
          />
        </div>
        <div className="form_group">
          <label className="form_label">Enter Your Instagram Id:</label>
          <input
            className="form_input"
            type="text"
            value={reviews.instagram}
            onChange={(e) =>
              setReviews({ ...reviews, instagram: e.target.value })
            }
            required
          />
        </div>
        <div className="form_group">
          <label className="form_label">
            Number of Questions You Want To Ask:
          </label>
          <input
            className="form_input"
            type="number"
            value={reviews.numberOfQues}
            onChange={(e) =>
              setReviews({
                ...reviews,
                numberOfQues: parseInt(e.target.value),
              })
            }
            min={1}
            max={questionsForUser.length}
          />
        </div>
        {questionsForUser.slice(0, reviews.numberOfQues).map((ques, index) => (
          <div key={ques.id} className="form_group">
            <label className="form_label">{ques.question}</label>
            <input
              className="form_input"
              type="text"
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            {isAdmin && (
              <span onClick={() => handleRemoveQues(index)}>
                <FaCircleMinus />
              </span>
            )}
          </div>
        ))}
        <div className="form_group">
          <label className="form_label">Do you want a Custom Beat:</label>
          <select
            className="form_select"
            name="review"
            id="review"
            value={reviews.customBeat}
            onChange={(e) =>
              setReviews({ ...reviews, customBeat: e.target.value })
            }
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {reviews.customBeat === "Yes" && (
          <div className="form_group">
            <label className="form_label">
              Describe about the beat and how you want to customize it?
            </label>
            <input
              className="form_input"
              type="text"
              value={reviews.beatDescription}
              rows={4}
              onChange={(e) =>
                setReviews({ ...reviews, beatDescription: e.target.value })
              }
              required={reviews.customBeat === "Yes" ? true : false}
            />
          </div>
        )}
        {successfully && (
          <div className="success-message">Data Uploaded Successfully!!</div>
        )}
        <button className="form_submit" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Form;
