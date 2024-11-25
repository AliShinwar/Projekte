import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Steps.css'; // Optional: CSS-Datei für zusätzliche Stile

const Steps = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/auswahl');
  };

  return (
    <main id='mainSteps'>
      <div>
        <h2>Schritt für Schritt, wie man einen Zeitplan importiert und in JSON konvertiert.</h2>
        <ol>
          <li>
            Gehen Sie zu <a href="https://wwwccb.hochschule-bochum.de/campusInfo/" target="_blank" rel="noopener noreferrer">campusinfo-Login</a>
            <img src="1.png" alt="the web site" style={{ width: '100%' }} />
          </li>
          <li>
            Klicken Sie dann auf "Vorlesungspläne" und danach auf "Stundenplan anzeigen".
            <img src="2.png" alt="the web site" style={{ width: '100%' }} />
          </li>
          <li>
            Wählen Sie in der Kategorie "Darstellung" die Option "Liste" aus.
            <img src="3.png" alt="the web site" style={{ width: '100%' }} />
          </li>
          <li>
            Wählen Sie Ihr aktuelles Semester aus.
            <img src="4.png" alt="the web site" style={{ width: '100%' }} />
          </li>
          <li>
            Klicken Sie mit der rechten Maustaste in den Browser und wählen Sie "Speichern unter" aus.
            <img src="5.png" alt="the web site" style={{ width: '100%' }} />
          </li>
          <li>
            Wählen Sie im Abschnitt "Format" die Option "Webseite, vollständig" aus.
            <img src="6.png" alt="the web site" style={{ width: '100%' }} />
          </li>
          <li>
            <div className="button-containerSteps">
              <button className="uploadJsonButton" onClick={redirectToTimetable}>HTML-Datei hochladen</button>
              <button className="weiterButton" onClick={handleRedirect}>Weiter</button>
            </div>
          </li>
        </ol>
      </div>
    </main>
  );
};

function redirectToTimetable() {
  window.location.href = 'fileUpload';
}

export default Steps;