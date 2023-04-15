import React, { useState, useEffect } from "react";
import axios from 'axios';
import Plot from 'react-plotly.js';

const Reporting = () => {
  const [jobTitles, setJobTitles] = useState([]);
  const [resumeMatches, setResumeMatches] = useState([]);
  const [resumesPerJob, setResumesPerJob] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const jobTitlesResponse = await axios.get('http://localhost:5000/jobopenings');
      const resumeMatchesResponse = await axios.get('http://localhost:5000/resume');
      
      const jobTitlesData = jobTitlesResponse.data.reduce((acc, curr) => {
        acc[curr.jobtitle] = acc[curr.jobtitle] ? acc[curr.jobtitle] + 1 : 1;
        return acc;
      }, {});
      
      const resumeMatchesData = resumeMatchesResponse.data.reduce((acc, curr) => {
        acc[curr.match] = acc[curr.match] ? acc[curr.match] + 1 : 1;
        return acc;
      }, { 'yes': 0, 'no': 0 });
      const resumesPerJobData = jobTitlesResponse.data.reduce((acc, curr) => {
        const resumeCount = resumeMatchesResponse.data.filter((resume) => resume.forthepostof === curr.jobtitle).length;
        acc[curr.jobtitle] = resumeCount;
        return acc;
      }, {});

      setJobTitles(jobTitlesData);
      setResumeMatches(resumeMatchesData);
      setResumesPerJob(resumesPerJobData);

    }
    
    fetchData();
  }, []);

  const content = (
        <>
    <div>
      <h1>Job Openings by Title</h1>
      <Plot
        data={[
          {
            values: Object.values(jobTitles),
            labels: Object.keys(jobTitles),
            type: 'pie',
          },
        ]}
        layout={{ width: 500, height: 500, title: 'Job Openings by Title' }}
      />

      <h1>Resume Matches</h1>
      <Plot
        data={[
          {
            values: Object.values(resumeMatches),
            labels: Object.keys(resumeMatches),
            type: 'pie',
          },
        ]}
        layout={{ width: 500, height: 500, title: 'Resume Matches' }}
      />
    </div>
    <div>
    <h1>Resumes per Job</h1>
        <Plot
          data={[
            {
              values: Object.values(resumesPerJob),
              labels: Object.keys(resumesPerJob),
              type: 'pie',
            },
          ]}
          layout={{ width: 500, height: 500, title: 'Resumes per Job' }}
        />
      </div>
</>
  )
 return content
}
export default Reporting