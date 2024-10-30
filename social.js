function analyzeSentiment() {
    const text = document.getElementById("inputText").value.toLowerCase();
    const sentimentOutput = document.getElementById("sentimentOutput");

    
    const keywords = {
        positive: {
            "happy": 3,
            "good": 2,
            "great": 4,
            "awesome": 5,
            "love": 5,
            "excit": 3,
            "amazing": 4,
            "joy": 3,
            "hope": 2,
            "harmony": 5,
            "adorable": 4
        },
        negative: {
            "sad": -3,
            "bad": -2,
            "terrible": -4,
            "hate": -5,
            "angry": -4,
            "upset": -3,
            "digust": -5,
            "no": -1,
            "never": -3,
            "cannot": -2
        }
    };

    let sentimentScore = 0;
    let wordFrequency = {};

    text.split(" ").forEach(word => {
        if (keywords.positive[word]) {
            sentimentScore += keywords.positive[word];
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        } else if (keywords.negative[word]) {
            sentimentScore += keywords.negative[word];
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });

    let sentiment;
    if (sentimentScore > 0) {
        sentiment = "Positive 😊";
        sentimentOutput.style.color = "green";
    } else if (sentimentScore < 0) {
        sentiment = "Negative 😟";
        sentimentOutput.style.color = "red";
    } else {
        sentiment = "Neutral 😐";
        sentimentOutput.style.color = "orange";
    }

    const sortedKeywords = Object.entries(wordFrequency)
        .map(([word, frequency]) => {
            const score = keywords.positive[word] || keywords.negative[word] || 0;
            return { word, frequency, score };
        })
        .sort((a, b) => b.frequency - a.frequency || b.score - a.score);

  
    sentimentOutput.innerHTML = `
        <p>Sentiment: ${sentiment}</p>
        <p>Sentiment Score: ${sentimentScore}</p>
        <h3>Top Keywords:</h3>
        <ul>
            ${sortedKeywords.map(kw => `<li>${kw.word} (Frequency: ${kw.frequency}, Score: ${kw.score})</li>`).join('')}
        </ul>
    `;
}
