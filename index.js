
/*
    You need to proxy the client requests via your own backend webserver, so that it’s your backend that has the OpenAI key
    and actually makes the request to OpenAI So your frontend sends a request to your backend with no key, your backend makes 
    a new request with the secret key
*/

// OpenAI constants
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY>";

// Get the prompt input, the generate and stop buttons, and the result section.
const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

// define a function called generate that will establish a connection with the OpenAI API endpoint using the prompt input value. 
// Using the received response, we update the result DOM element inner text to display the completion in the UI.
const generate = async () => {
  // Alert the user if no prompt value
  if (!promptInput.value) {
    alert("Please enter a prompt.");
    return;
  }
  
  // Disable the generate button and enable the stop button
  generateBtn.disabled = true;
  stopBtn.disabled = false;
  resultText.innerText = "Generating...";

  try {
    // Fetch the response from the OpenAI API with the signal from AbortController
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: promptInput.value }],
      }),
    });

    // From the response object received, we extract the completion text 
    // and update the result DOM element inner text to display it on the UI.
    const data = await response.json();
    resultText.innerText = data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    resultText.innerText = "Error occurred while generating.";
  }
};

promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generate();
  }
});
generateBtn.addEventListener("click", generate);
stopBtn.addEventListener("click", stop);
