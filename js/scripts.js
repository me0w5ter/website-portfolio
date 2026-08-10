/* ==========================================
   1. PROFILE DATA & CHATBOT LOGIC
   ========================================== */
   const HARSH_RESUME = {
    name: "Harsh Dogra",
    email: "harsh.dogra135@gmail.com",
    education: {
        university: "Curtin University",
        degree: "Bachelor of Computing (Software Engineering)",
        expectedGraduation: "December 2026"
    },
    technicalSkills: {
        languages: ["Java", "Python", "C", "C#", "JavaScript", "Kotlin"],
        tools: ["JavaFX", "PyQt5", "REST APIs", "MySQL", "AWS", "Docker", "Git"]
    },
    experience: [
        {
            role: "IT Technician",
            company: "Netway Computers",
            startDate: "May 2023"
        }
    ],
    projects: [
        { name: "Anti-Virus Scanner" },
        { name: "AI-Powered Resume Analysis Platform", }
    ]
};

function generateResponse(input) {
    const query = input.toLowerCase();

    if (["hi", "hello"].some(word => query.includes(word))) {
        return "Hello ! Feel free to ask me anything about Harsh's work, Software Engineering degree or the projects he's built. What would you like to know?";
    }
    
    if (["skill", "language", "tech", "know", "code"].some(word => query.includes(word))) {
        return `I'm proficient in ${HARSH_RESUME.technicalSkills.languages.join(", ")}, plus tools like ${HARSH_RESUME.technicalSkills.tools.slice(0, 4).join(", ")}.`;
    }
    
    if (["job", "work", "experience", "career", "who"].some(word => query.includes(word))) {
        return `I'm currently an ${HARSH_RESUME.experience[0].role} at ${HARSH_RESUME.experience[0].company}, working there since ${HARSH_RESUME.experience[0].startDate}.`;
    }

    if (["uni", "curtin", "degree", "study", "graduate", "software", "engineering"].some(word => query.includes(word))) {
        return `I'm studying ${HARSH_RESUME.education.degree} at ${HARSH_RESUME.education.university}, expecting to graduate in ${HARSH_RESUME.education.expectedGraduation}.`;
    }

    if (["project", "build", "make", "scanner", "dashboard"].some(word => query.includes(word))) {
        return `I've built projects like an ${HARSH_RESUME.projects[0].name} and a ${HARSH_RESUME.projects[1].name}.`;
    }

    if (["contact", "email", "reach"].some(word => query.includes(word))) {
        return `You can reach me at ${HARSH_RESUME.email} or find me on LinkedIn!`;
    }

    return "I'm not quite sure about that, but I can tell you about my Software Engineering degree at Curtin, my IT experience, or my coding projects!";
}

/* ==========================================
   2. UI INITIALIZER (Runs after HTML loads)
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // Selectors
    const chatTrigger = document.querySelector('#chat-trigger');
    const chatWindow = document.querySelector('#chat-window');
    const closeChat = document.querySelector('#close-chat');
    const userInput = document.querySelector('#user-input');
    const chatMessages = document.querySelector('#chat-messages');
    const contactBtn = document.querySelector('#contact-button');
    const myEmail = HARSH_RESUME.email;

    // --- Chat Toggle Logic ---
    if (chatTrigger && chatWindow && closeChat) {
        chatTrigger.addEventListener('click', () => {
            chatWindow.classList.toggle('d-none');
            chatWindow.classList.add('d-flex'); 
            chatTrigger.classList.add('d-none');
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.add('d-none');
            chatTrigger.classList.remove('d-none');
        });
    }

    // --- Email Copy Logic ---
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(myEmail).then(() => {
                const originalText = contactBtn.innerHTML;
                contactBtn.innerHTML = "Email Copied! <i class='bi bi-check2-all'></i>";
                contactBtn.classList.replace('btn-primary', 'btn-success');

                setTimeout(() => {
                    contactBtn.innerHTML = originalText;
                    contactBtn.classList.replace('btn-success', 'btn-primary');
                }, 2000);
            }).catch(err => console.error('Failed to copy: ', err));
        });
    }

    // --- Chat Interaction Logic ---
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && userInput.value.trim() !== "") {
                const messageText = userInput.value;

                // User Message
                const userDiv = document.createElement('div');
                userDiv.className = 'user-msg';
                userDiv.textContent = messageText;
                chatMessages.appendChild(userDiv);
                
                userInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Bot Response
                setTimeout(() => {
                    const botDiv = document.createElement('div');
                    botDiv.className = 'bot-msg';
                    botDiv.textContent = generateResponse(messageText);
                    chatMessages.appendChild(botDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 600);
            }
        });
    }

    // --- Start Background Animation ---
    createFloatingCode();
});

/* ==========================================
   3. FLOATING BACKGROUND GENERATOR
   ========================================== */
function createFloatingCode() {
    const container = document.getElementById('code-bg-container');
    if (!container) return;

    let snippets = [
        "public class Harsh", "while (isCoding) { }", "def scan_virus(file):",
        "git commit -m 'Initial'", "import tensorflow as tf", "System.out.println('Hello');",
        "std::cout << 'C++ Logic';", "npm install express", "chmod +x script.sh",
        "await fetch(api_url);", "void main() { run(); }", "docker-compose up -d",
        "if (success) return 1;", "SELECT * FROM users;", "protected void update();",
        "mvn clean install", "pip install -r requirements.txt", "const fs = require('fs');",
        "kubectl get pods", "ssh -i private_key.pem"
    ];

    // Fisher-Yates Shuffle for uniqueness
    for (let i = snippets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [snippets[i], snippets[j]] = [snippets[j], snippets[i]];
    }

    // Create unique floating elements
    snippets.forEach((text) => {
        const span = document.createElement('span');
        span.className = 'code-snippet';
        span.innerText = text;
        
        // Random Position
        span.style.left = Math.random() * 90 + "%";
        span.style.top = Math.random() * 90 + "%";
        
        // Random Speed (Faster: 7-15s)
        span.style.setProperty('--duration', (Math.random() * 8 + 7) + "s");
        
        // Styling for visibility
        span.style.fontSize = (Math.random() * 0.4 + 0.8) + "rem";
        span.style.opacity = (Math.random() * 0.12 + 0.05);
        
        container.appendChild(span);
    });
}