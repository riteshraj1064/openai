require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 5000;

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const openai = new OpenAIApi(configuration);
    response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
      });
   
    res.json({data:response.data.choices[0].message.content})
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
