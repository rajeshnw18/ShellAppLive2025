import OpenAI from "openai";
//npm install openai
const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));