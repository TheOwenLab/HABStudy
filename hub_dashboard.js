Qualtrics.SurveyEngine.addOnload(function() { });

Qualtrics.SurveyEngine.addOnReady(function() {
    var qthis = this;
    var isProcessingClick = false;
    var activeTouchId = null; // Tracks which module tooltip is active on touch screens

    var brainUrl = "https://cdn.jsdelivr.net/gh/TheOwenLab/booklaunch@main/images/SVG/9pc-b.svg";
    var targetDiv = document.getElementById('brain-placeholder');
    var tooltip = document.getElementById('brain-tooltip');

	var pulseStyle = document.createElement('style');
	pulseStyle.type = 'text/css';
	pulseStyle.innerHTML =
		'@keyframes subtlePulse {' +
		'    0% { filter: grayscale(100%) brightness(1.2); opacity: 0.35; }' +
		'    50% { filter: grayscale(0%) brightness(0.95); opacity: 0.85; }' +
		'    100% { filter: grayscale(100%) brightness(1.2); opacity: 0.35; }' +
		'}' +
		/* Neutralize baseline filters on any element tagged with the pulse class */
		'.priority-pulse:not(.piece-complete) {' +
		'    filter: none !important;' +
		'    opacity: 1 !important;' +
		'}' +
		/* Run the breathing cycle on inner vector shapes dynamically */
		'.priority-pulse:not(.piece-complete) path, ' +
		'.priority-pulse:not(.piece-complete) polygon, ' +
		'.priority-pulse:not(.piece-complete) rect, ' +
		'.priority-pulse:not(.piece-complete) circle, ' +
		'.priority-pulse:not(.piece-complete) * {' +
		'    animation: subtlePulse 3.5s infinite ease-in-out !important;' +
		'}';
	document.head.appendChild(pulseStyle);


    if (tooltip) {
        document.body.appendChild(tooltip);
    }

    var domainInfo = {
        'Module1': {
            title: '⭐ Healthy Aging (Core Module)',
            desc: '2 tasks + 2 questionnaires',
            duration: "10 minutes",
            flavour: "Important! What really is “normal” cognitive aging? At what point should you be concerned about conditions like dementia, Alzheimer’s disease, or mild cognitive impairment? These games test your attention and working memory abilities – functions that often decline with age."
        },
        'Module2': {
            title: 'Everyday Memory',
            desc: '2 tasks + 1 questionnaire',
            duration: "10 minutes",
            flavour: "Most of us experience dozens of cognitive lapses every week, and we often blame our memory. These games test short-term and episodic memory, which are important functions for when you’d like to do things like remember which cupboard you put your groceries in, or recall a friend’s phone number."
        },
        'Module3': {
            title: 'Planning & Strategy',
            desc: '2 tasks + 2 questionnaires',
            duration: "10 minutes",
            flavour: "This module tests planning ability – a fundamental property of executive function requiring forethought and sequencing behaviour to reach specific goals. We will also ask questions about your mental health, an important component of a healthy brain."
        },
        'Module4': {
            title: 'Attention',
            desc: '1 task',
            duration: "6 minutes",
            flavour: "One of the strongest predictors of ADHD is how effectively you can inhibit an automatic response when your attention is being pulled in the wrong direction. This test was designed to evaluate your sustained focus and attentional control ability, which often lies at the heart of ADHD."
        },
        'Module5': {
            title: 'Response Inhibition',
            desc: '2 tasks + 1 questionnaire',
            duration: "10 minutes",
            flavour: "After a concussion or traumatic brain injury, the very mental skills we rely on to notice that something is wrong — attention, self-awareness, planning, and judgement — can be among the first things affected. These games test response inhibition and verbal reasoning, which are executive functions that have shown to be affected among those who have sustained a concussion."
        },
        'Module6': {
            title: 'Reasoning Puzzles',
            desc: '2 tasks',
            duration: "5 minutes",
            flavour: "Every day, your brain relies on logic to solve complex problems, whether you're navigating a tough conversation or organizing a packed schedule. These games challenge your deductive reasoning and mental rotation skills, testing your ability to connect pieces of information and manipulate objects in your mind's eye."
        },
        'Module7': {
            title: 'Spatial Abilities',
            desc: '2 tasks',
            duration: "5 minutes",
            flavour: "From navigating a new city to simply reaching out to grab your morning coffee, your brain is constantly mapping the world around you. These games test your visuospatial processing and spatial memory functions, tracking how your mind perceives physical layouts and remembers where things are in space."
        },
        'Module8': {
            title: '⭐ Lifestyle (Core Module)',
            desc: '1 questionnaire',
            duration: "10 minutes",
            flavour: "IMPORTANT! Research examining the relationship between lifestyle choices and executive function as we age has showed us that exercise helps, good sleep helps, staying mentally engaged helps, and maintaining strong social connections helps. This module asks questions about your lifestyle habits, and will give a report of your baseline trends."
        },
        'Module9': {
            title: 'Additional Information',
            desc: 'Open ended questionnaire',
            duration: "5 minutes",
            flavour: "Is there anything else you’d like to tell us about your cognitive health? This module allows you to tell us more about your lifestyle, daily habits, and background—the 'extra stuff' that helps us understand how your real-world environment influences your cognitive data."
        },
    };

    var statuses = {
        'Module1': "${e://Field/Module1_redirect}".trim() || "${e://Field/Module1_status}".trim() || "notstarted",
        'Module2': "${e://Field/Module2_redirect}".trim() || "${e://Field/Module2_status}".trim() || "notstarted",
        'Module3': "${e://Field/Module3_redirect}".trim() || "${e://Field/Module3_status}".trim() || "notstarted",
        'Module4': "${e://Field/Module4_redirect}".trim() || "${e://Field/Module4_status}".trim() || "notstarted",
        'Module5': "${e://Field/Module5_redirect}".trim() || "${e://Field/Module5_status}".trim() || "notstarted",
        'Module6': "${e://Field/Module6_redirect}".trim() || "${e://Field/Module6_status}".trim() || "notstarted",
        'Module7': "${e://Field/Module7_redirect}".trim() || "${e://Field/Module7_status}".trim() || "notstarted",
        'Module8': "${e://Field/Module8_redirect}".trim() || "${e://Field/Module8_status}".trim() || "notstarted",
        'Module9': "${e://Field/Module9_redirect}".trim() || "${e://Field/Module9_status}".trim() || "notstarted",
    };

    for (const [key, value] of Object.entries(statuses)) {
        Qualtrics.SurveyEngine.setEmbeddedData(key+"_status", value);
    }

    // Helper function to build the tooltip inner HTML
    function populateTooltip(moduleId) {
        let info = domainInfo[moduleId];
        let rawStatus = (statuses[moduleId] || "notstarted").toLowerCase().trim();
        var displayStatusMap = { 'notstarted': 'Not Started', 'inprogress': 'In Progress', 'complete': 'Complete' };
        var formattedStatus = displayStatusMap[rawStatus] || rawStatus;

        return '<div class="tooltip-title">' + info.title + '</div>' +
               '<div class="tooltip-meta-row">' +
                   '<span class="status-pill status-' + rawStatus + '">' + formattedStatus + '</span>' +
                   '<span class="tooltip-duration">⏱ ' + info.duration + '</span>' +
               '</div>' +
               '<div class="tooltip-desc">' + info.desc + '</div>' +
               '<div class="tooltip-flavour">' + info.flavour + '</div>';
    }

    fetch(brainUrl)
        .then(response => {
            if (!response.ok) throw new Error("CDN Network Error");
            return response.text();
        })
        .then(svgCode => {
            if (!targetDiv) return;
            targetDiv.innerHTML = svgCode;

            for (var id in domainInfo) {
                var element = document.getElementById(id);
                if (element) {
                    var status = statuses[id].toLowerCase().trim();
                    element.classList.remove('piece-complete', 'piece-progress', 'piece-notstarted');
                    element.classList.add(status === "complete" ? 'piece-complete' : (status === "inprogress" ? 'piece-progress' : 'piece-notstarted'));
                    element.style.cursor = "pointer";

					// Add pusling to priority pieces here. CW
					if (id === 'Module8' || id === 'Module1') {
						element.classList.add('priority-pulse');
					}

                    // ==========================================================================
                    // SMART CLICK / TOUCH ROUTER
                    // ==========================================================================
                    element.addEventListener('click', function(e) {
                        var cleanId = this.id.trim();

                        // Detect if device supports touch interactions
                        var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

                        if (isTouchDevice) {
                            // If this module isn't active yet, intercept the click to show tooltip first
                            if (activeTouchId !== cleanId) {
                                e.preventDefault();
                                e.stopPropagation();
                                activeTouchId = cleanId;

                                if (tooltip) {
                                    tooltip.innerHTML = populateTooltip(cleanId);

                                    // Position tooltip safely above the user's tapping finger so their hand doesn't block it
                                    var x = e.clientX || e.pageX;
                                    var y = e.clientY || e.pageY;

                                    // Offset calculation to push tooltip above tap zone safely on narrow viewports
                                    var screenWidth = window.innerWidth;
                                    var tooltipX = x + 15;
                                    if (tooltipX + 320 > screenWidth) {
                                        tooltipX = screenWidth - 350; // Pin to edge if overflowing right boundary
                                    }

                                    tooltip.style.transform = 'translate(' + Math.max(10, tooltipX) + 'px, ' + (y - 130) + 'px)';
                                    tooltip.style.opacity = "1";
                                }
                                return; // Stop execution right here
                            }
                        }

                        // LAUNCH SEQUENCE (Runs instantly on desktop, or on the 2nd tap on tablet)
                        if (isProcessingClick) return;
                        isProcessingClick = true;

                        targetDiv.style.pointerEvents = "none";
                        targetDiv.style.opacity = "0.6";

                        var loadingOverlay = document.createElement('div');
                        loadingOverlay.id = 'study-loading-overlay';
                        loadingOverlay.innerHTML = `
                            <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(255, 255, 255, 0.9); z-index: 999999; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: 'Helvetica Neue', Arial, sans-serif;">
                                <div class="uwo-spinner" style="width: 50px; height: 50px; border: 5px solid rgba(79, 38, 131, 0.15); border-top: 5px solid #4F2683; border-radius: 50%; animation: spinOverlay 1s linear infinite; margin-bottom: 20px;"></div>
                                <div style="color: #4F2683; font-weight: bold; font-size: 18px; letter-spacing: 0.5px;">Loading Module...</div>
                            </div>
                            <style> @keyframes spinOverlay { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } </style>
                        `;
                        document.body.appendChild(loadingOverlay);

                        var moduleId = cleanId.replace("Module", "");
                        Qualtrics.SurveyEngine.setEmbeddedData(cleanId+"_status", "inprogress");
                        Qualtrics.SurveyEngine.setEmbeddedData(cleanId+"_redirect", null);
                        Qualtrics.SurveyEngine.setEmbeddedData("module_selected", moduleId);

                        qthis.clickNextButton();
                    });

                    element.addEventListener('mouseenter', function(e) {
                        var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
                        if (isTouchDevice) return; // Prevent hover calculations from competing on tablets

                        if (!tooltip) return;
                        tooltip.innerHTML = populateTooltip(this.id.trim());
                        tooltip.style.opacity = "1";
                    });

                    element.addEventListener('mousemove', function(e) {
                        var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
                        if (isTouchDevice) return;

                        if (!tooltip) return;
                        var x = e.clientX + 20;
                        var y = e.clientY + 20;
                        tooltip.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    });

                    element.addEventListener('mouseleave', function() {
                        var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
                        if (isTouchDevice) return;

                        if (tooltip) tooltip.style.opacity = "0";
                    });
                }
            }
        })
        .catch(err => {
            if (targetDiv) targetDiv.innerHTML = '<p style="color:#c0392b; padding-top:100px;">Dashboard interface sync error. Please refresh.</p>';
        });

    // Global tap catcher: if a tablet user taps empty space outside the brain, dismiss the tooltip
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.brain-piece')) {
            activeTouchId = null;
            if (tooltip) tooltip.style.opacity = "0";
        }
    });

    this.hideNextButton();
});

Qualtrics.SurveyEngine.addOnUnload(function() { });