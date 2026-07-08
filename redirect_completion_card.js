Qualtrics.SurveyEngine.addOnload(function() { });

Qualtrics.SurveyEngine.addOnReady(function() {
    // 1. Rename the main survey button to match dashboard flow instructions
    var nextButton = document.getElementById('NextButton');
    if (nextButton) {
        nextButton.value = "Return to HABS Hub";
        nextButton.title = "Return to HABS Hub";
    }

    // 2. Extract the 'module' field variable from the Survey Flow variables
    var moduleParam = ("${e://Field/module}").trim();

    // 3. Complete database map matching module numbers to titles and targeted logs
    var moduleDataMap = {
        '1': {
            title: 'Healthy Aging Complete!',
            desc: "Fantastic work. Your inputs on this segment have been securely added to the core profile. These indicators help our team evaluate longitudinal neuro-resilience curves over time."
        },
        '2': {
            title: 'Everyday Memory Logged!',
            desc: "Excellent performance. Your sequential patterns, recall metrics, and recognition responses are mapped successfully. Let's head back to see how your tracking grid balances out."
        },
        '3': {
            title: 'Planning & Strategy Verified!',
            desc: "Benchmark reached! Your logical problem-solving timelines and task allocation strategies have been calculated. Your background database file has been successfully appended."
        },
        '4': {
            title: 'Attention Task Recorded!',
            desc: "Thank you for your concentration! Your reaction distribution times and cognitive focusing thresholds have been updated. Your data profile is synced up and updated."
        },
        '5': {
            title: 'Verbal Ability Updated!',
            desc: "Section checked off. Your structural language comprehension, memory retrieval, and semantic indexing inputs are finalized. Great work completing this module."
        },
        '6': {
            title: 'Reasoning Puzzles Complete!',
            desc: "Brilliant execution navigating those complex arrays! Your logical sequencing paths have been written to the master spreadsheet. Your progress tracker is updated."
        },
        '7': {
            title: 'Spatial Abilities Saved!',
            desc: "Spatial tracking metrics locked in! Your mental transformation matrices and object orientation vectors are stored safely. This block is complete."
        },
        '8': {
            title: 'Lifestyle Assessment Logged!',
            desc: "Data compiled. These specific behavioral and structural variables give vital medical context to your cognitive metrics. Thank you for completing this detailed survey."
        },
        '9': {
            title: 'Study Framework Complete!',
            desc: "Additional Context Submitted. This final descriptive overview gives our analytical system an optimized map of your experience. Your study profile is fully synchronized."
        }
    };

    // 4. If the variable exists inside our dictionary array, run the dynamic HTML overrides
    if (moduleDataMap[moduleParam]) {
        var targetTitle = document.getElementById('completed-title');
        var targetDesc = document.getElementById('completed-desc');

        if (targetTitle) targetTitle.innerHTML = moduleDataMap[moduleParam].title;
        if (targetDesc) targetDesc.innerHTML = moduleDataMap[moduleParam].desc;
    }
});

Qualtrics.SurveyEngine.addOnUnload(function() { });