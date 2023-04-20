
//sssss
const topicInput = document.getElementById("topic");
const generateButton = document.getElementById("generate");
const outputElement = document.getElementById("output");

generateButton.addEventListener("click", async () => {
    const topic = topicInput.value.trim();
    if (topic) {
        outputElement.textContent = "Generating...";
        try {
            const rap = await generateFreestyleRap(topic);
            outputElement.textContent = rap;
        } catch (error) {
            console.error(error);
            outputElement.textContent = "An error occurred. Please try again.";
        }
    }
});

async function generateFreestyleRap(topic) {
    const apiKey = "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";
    const prompt = `Create a rhyming comedic freestyle rap about ${topic}:\n\n`;
    const apiUrl = "https://api.openai.com/v1/engines/davinci/completions";


    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.8
        })
    });

    const data = await response.json();
    
    if (data && data.choices && data.choices.length > 0) {
        return data.choices[0].text.trim();
    } else {
        throw new Error('No response from the API');
    }
}
