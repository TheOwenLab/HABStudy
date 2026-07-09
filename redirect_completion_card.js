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
           desc: "Success! Your entry has safely entered the archives. The research team—and the metaphorical monkeys trying to keep our servers from crashing—are at work analyzing your answers to figure out how human brains gracefully navigate getting older. Thank you for adding a highly sophisticated data point to our collection.",
       },
       '2': {
           title: 'Everyday Memory Consolidated!',
           desc: "Excellent work. Your recall and recognition data have been successfully remembered (in our database). Our scientists are thrilled to have this, because it may help us understand why some humans (like our principal investigator 😉) can remember complex patterns but still forget where they left their glasses."
       },
       '3': {
           title: 'Planning & Strategy Verified!',
           desc: "Task complete. Your problem-solving steps and decision trees have been operationalized. The lab team sends their regards, and the resident interns are currently trying to figure out if your strategy can help them secure more snacks."
       },
       '4': {
           title: 'Sustained Attention Disengaged!',
           desc: "Thank you for your concentration. Don't worry, it only felt (way) longer than it actually took! Your focusing thresholds and reaction times are now synced. The research crew is deeply impressed by your focus, especially since three of us got distracted by that bird over ... oh pretty, it's a blue jay!"
       },
       '5': {
           title: 'Verbal Ability Comprehended!',
           desc: "Your language comprehension and reasoning inputs have been parsed. The linguistics team is currently analyzing your responses, and the interns are just pleased to see a collection of words they don't have to spell-check."
       },
       '6': {
           title: 'Reasoning Puzzles Resolved!',
           desc: "Nicely done solving those logic puzzles. Your sequencing paths have been beamed over to our server. The researchers are quite pleased, and our lab assistants are currently trying to replicate your logic with varying degrees of success."
       },
       '7': {
           title: 'Spatial Abilities Explored!',
           desc: "Huzzah! Your mental rotation and spatial memory metrics have been mapped. You clearly have excellent spatial awareness—unlike one of our interns who frequently gets lost trying to find the campus cafeteria."
       },
       '8': {
           title: 'Lifestyle Habits Catalogued!',
           desc: "Well done! Your daily habits and routines have been safely archived. Our researchers—and the sleep-deprived graduate students trying to prove coffee is a functional replacement for sleep—are thrilled to have your data. This snapshot of your daily life gives us the vital real-world context that clinical tests alone sometimes miss."
       },
       '9': {
           title: 'Additional Insights Integrated!',
           desc: "The final piece of the puzzle is in. This extra information gives our team of scientists (and the interns who have to read every single word you wrote) a much clearer understanding of you. Thank you for your input."
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


