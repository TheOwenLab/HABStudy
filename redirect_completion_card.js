Qualtrics.SurveyEngine.addOnload(function() { });

Qualtrics.SurveyEngine.addOnReady(function() {
    var nextButton = document.getElementById('NextButton');
    if (nextButton) {
        nextButton.value = "Return to HABS Hub";
        nextButton.title = "Return to HABS Hub";
    }

    var moduleParam = ("${e://Field/module}").trim();

   var moduleDataMap = {
        '1': {
            title: 'Healthy Aging Chronicled!',
            desc: "Success! Your entry has safely entered the archives. The research team—and the metaphorical hamsters running our servers—are already analyzing your answers to figure out how human brains gracefully navigate getting older. Thank you for adding a highly sophisticated data point to our collection.",
        },
        '2': {
            title: 'Everyday Memory Consolidated!',
            desc: "Excellent work. Your recall and recognition data have been successfully remembered (in our database). Our scientists are thrilled to have this, because it may help us understand why some humans (like our principal investigator 😉) can remember complex patterns but still forget where they left their glasses."
        },
        '3': {
            title: 'Planning & Strategy Verified!',
            desc: "Task complete. Your problem-solving steps and task allocation metrics have been compiled. The lab team sends their regards, and the resident grad students are currently trying to figure out if your strategy can help them secure more snacks."
        },
        '4': {
            title: 'Sustained Attention Disengaged!',
            desc: "Thank you for your concentration. Don't worry, it only felt (way) longer than it actually took! Your focusing thresholds and reaction times are now synced. The research crew is deeply impressed by your focus, especially since three of us got distracted by that bird ... oh pretty, it's a blue jay!"
        },
        '5': {
            title: 'Response Inhibition Inhibited!',
            desc: "Your data on impulse control and automatic responses has been successfully logged. Our research team is impressed, as we are currently failing a response inhibition task of our own involving a box of maple doughnuts in the breakroom."
        },
        '6': {
            title: 'Reasoning Puzzles Resolved!',
            desc: "Nicely done solving those logic puzzles. Your sequencing paths have been beamed over to our server. The researchers are quite pleased, and our lab assistants are currently trying to replicate your logic with varying degrees of success."
        },
        '7': {
            title: 'Spatial Abilities Explored!',
            desc: "Your mental rotation and spatial memory metrics have been mapped. You clearly have excellent spatial awareness—unlike one of the scientists who frequently gets lost trying to find the campus cafeteria."
        },
        '8': {
            title: 'Lifestyle Habits Catalogued!',
            desc: "Well done! Your daily habits and routines have been archived. Our researchers—and the lab assistants currently trying to mathematically figure out what makes people smarter—are thrilled to have this data. Glimpses into your everyday habits might just give us the vital context we need."
        },
        '9': {
            title: 'Additional Insights Integrated!',
            desc: "The final piece of the puzzle is in. This extra information gives our team of scientists a much clearer understanding of you. Thanks for doing all that typing!"
        },
    };

    if (moduleDataMap[moduleParam]) {
        var targetTitle = document.getElementById('completed-title');
        var targetDesc = document.getElementById('completed-desc');

        if (targetTitle) targetTitle.innerHTML = moduleDataMap[moduleParam].title;
        if (targetDesc) targetDesc.innerHTML = moduleDataMap[moduleParam].desc;
    }
});

Qualtrics.SurveyEngine.addOnUnload(function() { });

