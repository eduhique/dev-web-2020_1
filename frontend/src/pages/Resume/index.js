import React, { useState, useEffect } from 'react';
import Loading from '../../Components/Loading'
import ResumeTotais from '../../Components/ResumeTotais'
import ResumeList from '../../Components/ResumeList'
import api from '../../services/Api';
import './style.css';

function Resume(props) {
  const [resume, setResume] = useState();
  const romaneioId = props.match.params.resume;

  useEffect(_ => {
    async function getData() {
      let response = await api.get('resume/' + romaneioId);
      setResume(response.data);
    }
    getData();
  }, [romaneioId, setResume])

  return (
    <div>
      {resume === undefined ? <Loading /> :
        <div className="resume">
          <div className="resume-title"><h2>Romaneio: {resume.romaneio.title}</h2></div>
          <ResumeTotais subCaixas={resume.subCaixas} subQuilos={resume.subQuilos} subUnidades={resume.subUnidades} />
          <hr />
          <ResumeList resume={resume} romaneioId={resume.romaneio.id} />
        </div>
      }
    </div>
  );
}

export default Resume;