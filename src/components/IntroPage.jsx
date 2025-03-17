import React,{ useEffect } from "react";
import "./IntroPage.css";

const IntroPage = ({ startQuiz }) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=6LdAJvMqAAAAAOVxS_Q96dRIUcBw6VmxrWzz2xRK";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleStartQuiz = async () => {
    window.grecaptcha.ready(async () => {

      const token = await window.grecaptcha.execute("6LdAJvMqAAAAAOVxS_Q96dRIUcBw6VmxrWzz2xRK", { action: "start_test" });
      console.log("Token reCAPTCHA généré :", token); // 🔍
      const response = await fetch("https://com-website.onrender.com/start_test", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (data.success) {

        document.querySelector(".grecaptcha-badge").classList.add("hidden-recaptcha");
        startQuiz();
      } else {
        alert("Captcha échoué, veuillez réessayer.");
      }
    });
  };

  return (
    <div className="intro-page">
      <div className="container">
        {/* Triangle bleu foncé */}




        {/* Cadre de description du quiz + bouton */}
        <div className="quiz-description">

          {/* Bouton Commencer (intégré dans la zone) */}
          <button onClick={handleStartQuiz} className="start-button">Commencer</button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
