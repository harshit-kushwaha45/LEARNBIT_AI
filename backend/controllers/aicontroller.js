    const {GoogleGenAI} = require('@google/genai')
    const {conceptExplainPrompt,questionAnswerPrompt} = require('../utils/prompts');
    const Question = require('../modals/Question');
    const ai  = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY})

    const generateInterviewQuestions = async (req,res)=>{
        try{
            const {role,experience,topicsToFocus,numberOfQuestions} = req.body;
            if(!role || !experience || !topicsToFocus || !numberOfQuestions) {
                return res
                .status(400)
                .json({message :  "Missing required Fields"})
            }
            const prompt = questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions);
            const resp = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: prompt,
            });     
            let rawText = resp.text;
            console.log(rawText);
            
            const cleanedText = rawText
            .replace(/^```json\s*/,"")
            .replace(/```$/,"")
            .trim();
            const data  = JSON.parse(cleanedText);
            
            res.status(200).json(data);
        }
        catch(error){
            res.status(500)
            .json({message : "Failed to generate questions",
            error : error.message
            })
        }
    }

   const generateConceptExplaination = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Question is required",
            });
        }

        const prompt = conceptExplainPrompt(question);

        const resp = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });
        
        let rawText = resp.text;
        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();

        const data = JSON.parse(cleanedText);

        return res.status(200).json(data);
    } catch (error) {
        console.error("AI Error:", error);
        return res.status(500).json({
            message: "Failed to generate explanation",
            error: error.message,
        });
    }
};


    module.exports = {generateInterviewQuestions,generateConceptExplaination};
