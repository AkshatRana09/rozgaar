import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log('🔑 Gemini Key:', process.env.GEMINI_API_KEY ? '✅ Loaded' : '❌ Missing');

export const scoreResume = async (resumeText, jobDescription, jobSkills) => {
    try {
        console.log('🤖 AI Scoring started...');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const prompt = `
You are an expert HR recruiter and resume evaluator.

Analyze the following resume against the job description and required skills.
Give a match score from 0 to 100 and provide brief feedback.

JOB DESCRIPTION:
${jobDescription}

REQUIRED SKILLS:
${jobSkills.join(', ')}

RESUME CONTENT:
${resumeText}

Respond in this EXACT JSON format (no extra text):
{
  "score": <number between 0-100>,
  "feedback": "<2-3 sentences explaining the score>",
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"]
}
`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        console.log('🤖 AI Raw Response:', response);

        const cleaned = response.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        console.log('✅ AI Score:', parsed.score);

        return parsed;
    } catch (error) {
        console.error('❌ AI Scoring error:', error.message);
        return {
            score: 0,
            feedback: 'AI scoring unavailable at the moment.',
            matchedSkills: [],
            missingSkills: []
        };
    }
};