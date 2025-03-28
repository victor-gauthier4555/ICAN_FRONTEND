import React, { useState, useEffect, useRef } from "react";
import "./FinalPage.css";

const FinalPage = ({ score, approx }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasSentRequest = useRef(false);

  const getResultDetails = (score) => {
    if (score <= 11) {
      return {
        title: "Risque faible (0-11 points)",
        interpretation: "Votre risque est faible. Vous n’avez pas de facteur de risque majeur à ce jour.",
        conseils: [
          "Maintenez une alimentation équilibrée, une activité physique régulière, et évitez de fumer.",
          "Faites un bilan de santé annuel pour surveiller vos indicateurs."
        ]
      };
    } else if (score <= 20) {
      return {
        title: "Risque modéré (12-20 points)",
        interpretation: "Votre risque est modéré. Vous présentez certains facteurs de risque qui méritent d’être surveillés.",
        conseils: [
          "Améliorez vos habitudes alimentaires en augmentant la consommation de fruits, légumes, et aliments riches en fibres.",
          "Pratiquez une activité physique d’au moins 30 minutes par jour.",
          "Consultez un professionnel de santé pour un suivi régulier de votre tension, cholestérol, et glycémie."
        ]
      };
    } else if (score <= 30) {
      return {
        title: "Risque élevé (21-30 points)",
        interpretation: "Votre risque est élevé. Vous êtes à risque accru de développer un diabète ou une maladie cardiovasculaire dans les 10 prochaines années.",
        conseils: [
          "Prenez rendez-vous avec votre médecin pour une évaluation approfondie et des analyses complémentaires.",
          "Suivez un plan d’action incluant une activité physique adaptée, une perte de poids (si nécessaire), et une gestion stricte de votre alimentation.",
          "Envisagez un suivi par un diététicien et un coach sportif."
        ]
      };
    } else {
      return {
        title: "Risque très élevé (> 30 points)",
        interpretation: "Votre risque est très élevé. Une intervention médicale et des changements de mode de vie sont impératifs.",
        conseils: [
          "Consultez immédiatement un professionnel de santé pour une prise en charge globale.",
          "Suivez un traitement médicamenteux si recommandé (par exemple, antihypertenseurs, statines).",
          "Intégrez des changements drastiques dans votre mode de vie : arrêt total du tabac, contrôle strict de votre alimentation, et suivi d’un programme d’exercice personnalisé."
        ]
      };
    }
  };

  const result = getResultDetails(score);

  useEffect(() => {
    if (!hasSentRequest.current) {
      fetch("https://com-website.onrender.com/finish_test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      });
      hasSentRequest.current = true;
    }
  }, []);

  return (
    <div className="result-container">
      <p><strong>Total des points :</strong> {score}</p>
      {approx && (
        <p style={{ fontStyle: "italic", color: "#888" }}>
          <strong>À noter :</strong> vous n’avez pas renseigné certaines données clés comme :  la glycémie à jeun, le taux de cholestérol et/ou la tension artérielle.
          <br/> Le résultat proposé est donc une estimation partielle de votre risque cardiométabolique. Pour une évaluation plus complète et personnalisée, nous vous recommandons de compléter ces informations dès que possible.
        </p>
      )}


    </div>
  );
};

export default FinalPage;



