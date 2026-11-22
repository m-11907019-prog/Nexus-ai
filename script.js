
const micButton = document.getElementById("micButton");
const message = document.getElementById("message");
const submessage = document.getElementById("submessage");
const status = document.getElementById("status");

// Voice response system
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 0.85;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

// AI response system (basic version)
function respond(command) {
    command = command.toLowerCase();

    message.textContent = "Processing...";
    submessage.textContent = "Analysing your request.";

    let answer = "";

    if (command.includes("hello") ||
        command.includes("hi nexus")) {
        answer = "Hello Sir. How may I assist you?";
    }

    else if (command.includes("your name")) {
        answer = "I am NEXUS, your personal AI assistant.";
    }

    else if (command.includes("time")) {
        answer = "The current time is " +
            new Date().toLocaleTimeString();
    }

    else if (command.includes("date")) {
        answer = "Today's date is " +
            new Date().toLocaleDateString();
    }

    else if (command.includes("how are you")) {
        answer = "All systems are functioning normally, Sir.";
    }

    else if (command.includes("who are you")) {
        answer = "I am NEXUS. Your personal digital assistant.";
    }

    else {
        answer = "I am still learning, Sir. I cannot answer that yet.";
    }

    message.textContent = "N.E.X.U.S.";
    submessage.textContent = answer;

    speak(answer);
}

// Voice recognition
const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener("click", () => {

        try {
            window.speechSynthesis.cancel();
            recognition.start();

            status.textContent = "● LISTENING";
            micButton.textContent = "LISTENING...";
        } catch (error) {
            submessage.textContent =
                "Please wait and try again.";
        }

    });

    recognition.onresult = (event) => {
        const command =
            event.results[0][0].transcript;

        message.textContent = "You said:";
        submessage.textContent = command;

        setTimeout(() => respond(command), 1000);
    };

    recognition.onend = () => {
        status.textContent = "● SYSTEM ONLINE";
        micButton.textContent = "🎙 ACTIVATE";
    };

    recognition.onerror = () => {
        status.textContent = "● SYSTEM ONLINE";
        micButton.textContent = "🎙 ACTIVATE";
        submessage.textContent =
            "Voice recognition unavailable. Please try again.";
    };

} else {
    status.textContent = "● VOICE UNAVAILABLE";
    submessage.textContent =
        "Your browser does not support voice recognition.";
}

console.log("NEXUS system initialized.");
