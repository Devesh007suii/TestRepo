import React, { useEffect, useState } from "react";
import {
  addReview,
  addQuestion,
  fetchQuestions,
  deleteQuestion,
  updateQuestion,
} from "../../api";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaCircleMinus } from "react-icons/fa6";
import { BiSolidPencil } from "react-icons/bi";
import "./form.css";

const Form = ({ isAdmin, formRef }) => {
  const [reviews, setReviews] = useState({
    name: "",
    email: "",
    instagram: "",
    questions: [],
    customBeat: "No",
    beatDescription: "",
  });
  const [successfully, setSuccessfully] = useState(false);
  const [addUserQuestion, setAddUserQuestion] = useState("");
  const [questionsForUser, setQuestionsForUser] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const getUserQuestion = async () => {
      try {
        const { data } = await fetchQuestions();

        console.log(data);
        setQuestionsForUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserQuestion();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview(reviews);
      setSuccessfully(true);
      setTimeout(() => setSuccessfully(false), 2000);
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

  const handleAddQuestions = async () => {
    try {
      if (currentId) {
        await updateQuestion(currentId, { question: addUserQuestion });
        setCurrentId(null);
      } else {
        await addQuestion(addUserQuestion);
      }

      const { data } = await fetchQuestions();
      setQuestionsForUser(data.data);
      setAddUserQuestion("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveQues = async (id) => {
    try {
      await deleteQuestion(id);

      const { data } = await fetchQuestions();
      setQuestionsForUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQues = (id, newQuestion) => {
    setAddUserQuestion(newQuestion);
    setCurrentId(id);
  };

  return (
    <div className="form_container" ref={formRef}>
      <h2 className="form_heading">
        {isAdmin ? "Manage Questions" : "Music Review"}
      </h2>
      {isAdmin && (
        <div className="form_group">
          <div className="icons-container">
            <label className="form_label">Enter Question to Add:</label>
          </div>
          <div className="icons-container">
            <textarea
              type="text"
              value={addUserQuestion}
              className="form_input"
              onChange={(e) => setAddUserQuestion(e.target.value)}
              rows={1}
              required
            />
            <span
              className="icon-button icon-button-add"
              onClick={handleAddQuestions}
            >
              <MdOutlineAddCircle />
            </span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="user_form">
        {!isAdmin && (
          <>
            <div className="form_group">
              <label className="form_label">Enter Your Full Name:</label>
              <textarea
                className="form_input"
                value={reviews.name}
                onChange={(e) =>
                  setReviews({ ...reviews, name: e.target.value })
                }
                rows={1}
                required
              />
            </div>
            <div className="form_group">
              <label className="form_label">Enter Your Email Address:</label>
              <input
                className="form_input"
                type="email"
                value={reviews.email}
                onChange={(e) =>
                  setReviews({ ...reviews, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form_group">
              <label className="form_label">Enter Your Instagram Id:</label>
              <textarea
                className="form_input"
                value={reviews.instagram}
                onChange={(e) =>
                  setReviews({ ...reviews, instagram: e.target.value })
                }
                rows={1}
                required
              />
            </div>
          </>
        )}
        {questionsForUser &&
          questionsForUser.map((ques, index) => (
            <div key={ques._id} className="form_group">
              <div className="icons-container">
                <label className="form_label">{ques.question} (optional)</label>
                {isAdmin && (
                  <span
                    className="icon-button icon-button-edit"
                    onClick={() => handleUpdateQues(ques._id, ques.question)}
                  >
                    <BiSolidPencil />
                  </span>
                )}
              </div>
              <div className="icons-container">
                <textarea
                  className="form_input"
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  rows={1}
                />
                {isAdmin && (
                  <span
                    className="icon-button icon-button-remove"
                    onClick={() => handleRemoveQues(ques._id)}
                  >
                    <FaCircleMinus />
                  </span>
                )}
              </div>
            </div>
          ))}
        {!isAdmin && (
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
        )}
        {reviews.customBeat === "Yes" && (
          <div className="form_group">
            <label className="form_label">
              Describe about the beat and how you want to customize it?
            </label>
            <textarea
              className="form_input"
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
          <div className="success-message">Review Added Successfully!!</div>
        )}
        {!isAdmin && (
          <button className="form_submit" type="submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
