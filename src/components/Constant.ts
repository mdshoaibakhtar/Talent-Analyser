
export const apiEndPoint = 'http://127.0.0.1:8000/api'
// export const apiEndPoint = 'https://talent-analyser-fast-api.vercel.app'

export const API_ENDPOINTS = {
  UPLOAD_RESUME: '/upload-resume',
  EXTRACT_JD: '/extract-jd',
  SCRAPE_URL: '/scrape-url',
  FIND_DIFF: '/find-diff'
};

export const prompt = `text
Analyze the resume against the job description and evaluate how well the candidate matches the role.

Return ONLY valid JSON. Do not include markdown, code fences, explanations, or any text outside the JSON object.

The JSON response MUST follow this exact structure:

{
  "summary": "A concise overall assessment of the candidate's suitability for the job.",
  "matching_score": 0,
  "resume_ats_score": 0,
  "matching": {
    "skills": [],
    "experience": [],
    "qualifications": [],
    "other": []
  },
  "missing": {
    "skills": [],
    "experience": [],
    "qualifications": [],
    "other": []
  },
  "points_needs_to_be_replace_and_added_in_the_resume": [{'replace': 'text to be replaced', 'add': 'text to be added'}],
  "note_of_improvement": []
}

Rules:

- "summary" must be a concise string.
- "matching_score" and "resume_ats_score" must be a number from 0 to 100.
- "matching" must contain information that is supported by both the resume and job description.
- "missing" must contain requirements from the job description that are missing or not clearly demonstrated in the resume. don't include any information that is not present in the job description. and dont include any information that is not present in the resume.
- "note_of_improvement" must be an array of actionable suggestions for improving the candidate's fit.
- Do not invent skills, experience, qualifications, or achievements.
- If information is unavailable, use an empty array rather than making assumptions.
- Compare the candidate against the actual requirements in the job description.
- Consider skills, experience, qualifications, responsibilities, and other relevant requirements when calculating the matching score.
- "points_needs_to_be_replace_and_added_in_the_resume" must be an array of objects with "replace" and "add" properties.
- Return valid JSON only.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}
`
