

// function generateResponse() {
//     let prompt = document.getElementById("prompt").value.trim();

//     if (prompt === "") {
//         alert("Please enter a prompt.");
//         return;
//     }

//     // Simulated GOOD response
//     let goodResponse = `Based on your query "${prompt}", this response provides a clear and relevant explanation of the topic in a structured manner.`;

//     // Simulated BAD response (hallucination / irrelevant)
//     let badResponse = `This response is unrelated to the prompt and may contain incorrect or misleading information.`;

//     // Randomly choose response (simulate real AI variability)
//     let finalResponse = Math.random() > 0.5 ? goodResponse : badResponse;

//     document.getElementById("responseText").innerText = finalResponse;
//     document.getElementById("responseBox").classList.remove("hidden");
// }

// function submitEvaluation() {
//     let prompt = document.getElementById("prompt").value;
//     let response = document.getElementById("responseText").innerText;

//     let accuracy = document.getElementById("accuracy").value;
//     let relevance = document.getElementById("relevance").value;
//     let coherence = document.getElementById("coherence").value;

//     // Simple scoring system
//     let score = 0;
//     if (accuracy === "Good") score++;
//     if (relevance === "Good") score++;
//     if (coherence === "Good") score++;

//     let evaluationData = {
//         prompt: prompt,
//         response: response,
//         accuracy: accuracy,
//         relevance: relevance,
//         coherence: coherence,
//         score: score,
//         timestamp: new Date().toLocaleString()
//     };

//     // Save to localStorage
//     let existingData = JSON.parse(localStorage.getItem("evaluations")) || [];
//     existingData.push(evaluationData);
//     localStorage.setItem("evaluations", JSON.stringify(existingData));

//     // Show result
//     document.getElementById("result").innerHTML = `
//         <h3>Evaluation Submitted ✅</h3>
//         <p><strong>Score:</strong> ${score}/3</p>
//         <p><strong>Accuracy:</strong> ${accuracy}</p>
//         <p><strong>Relevance:</strong> ${relevance}</p>
//         <p><strong>Coherence:</strong> ${coherence}</p>
//     `;

//     document.getElementById("result").classList.remove("hidden");
// }






function generateResponse() {
    let prompt = document.getElementById("prompt").value.trim();

    if (prompt === "") {
        alert("Please enter a prompt.");
        return;
    }

    // Simulated responses
    let goodResponse = `Based on your query "${prompt}", this response provides a clear and relevant explanation of the topic.`;

    let badResponse = `This response is unrelated to the prompt and may contain incorrect or misleading information.`;

    let finalResponse = Math.random() > 0.5 ? goodResponse : badResponse;

    document.getElementById("responseText").innerText = finalResponse;
    document.getElementById("responseBox").classList.remove("hidden");

    // System hint
    let hint = "";
    if (finalResponse === badResponse) {
        hint = "⚠️ System Hint: This response may be irrelevant or incorrect.";
    } else {
        hint = "✅ System Hint: This response seems relevant.";
    }

    document.getElementById("hintText").innerText = hint;
}

function submitEvaluation() {
    let prompt = document.getElementById("prompt").value;
    let response = document.getElementById("responseText").innerText;

    let accuracy = document.getElementById("accuracy").value;
    let relevance = document.getElementById("relevance").value;
    let coherence = document.getElementById("coherence").value;
    let reason = document.getElementById("reason").value;

    let score = 0;
    if (accuracy === "Good") score++;
    if (relevance === "Good") score++;
    if (coherence === "Good") score++;

    // Hallucination detection
    let warning = "";
    if (accuracy === "Bad") {
        warning = "⚠️ Possible hallucination detected";
    }

    let evaluationData = {
        prompt,
        response,
        accuracy,
        relevance,
        coherence,
        reason,
        score,
        timestamp: new Date().toLocaleString()
    };

    let existingData = JSON.parse(localStorage.getItem("evaluations")) || [];
    existingData.push(evaluationData);
    localStorage.setItem("evaluations", JSON.stringify(existingData));

    document.getElementById("result").innerHTML = `
        <h3>Evaluation Submitted ✅</h3>
        <p><strong>Score:</strong> ${score}/3</p>
        <p><strong>Accuracy:</strong> ${accuracy}</p>
        <p><strong>Relevance:</strong> ${relevance}</p>
        <p><strong>Coherence:</strong> ${coherence}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p>${warning}</p>
    `;

    document.getElementById("result").classList.remove("hidden");
}

function viewHistory() {
    let data = JSON.parse(localStorage.getItem("evaluations")) || [];

    if (data.length === 0) {
        document.getElementById("result").innerHTML = "<p>No past evaluations found.</p>";
    } else {
        let output = "<h3>Past Evaluations</h3>";

        data.forEach(item => {
            output += `
                <p><strong>Prompt:</strong> ${item.prompt}</p>
                <p><strong>Score:</strong> ${item.score}/3</p>
                <p><strong>Reason:</strong> ${item.reason}</p>
                <hr>
            `;
        });

        document.getElementById("result").innerHTML = output;
    }

    document.getElementById("result").classList.remove("hidden");
}