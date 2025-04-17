const fetch = require("node-fetch");

exports.handler = async function(event, context) {
    const { message } = JSON.parse(event.body);

    if (!message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Message is required" }),
        };
    }

    const openaiApiKey = process.env.OPENAI_API_KEY; // Set your OpenAI API key in Netlify environment variables
    const url = "https://api.openai.com/v1/completions";
    const payload = {
        model: "text-davinci-003", // Use the OpenAI GPT-3 model or any other you prefer
        prompt: message,
        max_tokens: 150,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: data.choices[0].text.trim() }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error fetching response from OpenAI" }),
        };
    }
};

