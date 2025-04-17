const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { message } = JSON.parse(event.body);

  // Make request to GPT-3 API (OpenAI's GPT models)
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      model: "text-davinci-003", // or another model
      prompt: message,
      max_tokens: 150,
    }),
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data.choices[0].text.trim() }),
  };
};
