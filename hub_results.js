Qualtrics.SurveyEngine.addOnload(function()
{

});

Qualtrics.SurveyEngine.addOnReady(function() {
    // 1. Pull both redirect parameters and status fields, prioritizing the redirect query parameter
    var statuses = [
        ("${e://Field/Module1_redirect}".trim() || "${e://Field/Module1_status}".trim()).toLowerCase(),
        ("${e://Field/Module2_redirect}".trim() || "${e://Field/Module2_status}".trim()).toLowerCase(),
        ("${e://Field/Module3_redirect}".trim() || "${e://Field/Module3_status}".trim()).toLowerCase(),
        ("${e://Field/Module4_redirect}".trim() || "${e://Field/Module4_status}".trim()).toLowerCase(),
        ("${e://Field/Module5_redirect}".trim() || "${e://Field/Module5_status}".trim()).toLowerCase(),
        ("${e://Field/Module6_redirect}".trim() || "${e://Field/Module6_status}".trim()).toLowerCase(),
        ("${e://Field/Module7_redirect}".trim() || "${e://Field/Module7_status}".trim()).toLowerCase(),
        ("${e://Field/Module8_redirect}".trim() || "${e://Field/Module8_status}".trim()).toLowerCase(),
        ("${e://Field/Module9_redirect}".trim() || "${e://Field/Module9_status}".trim()).toLowerCase()
    ];

    // 2. Count how many of them are strictly marked 'complete'
    var completedCount = 0;
    for (var i = 0; i < statuses.length; i++) {
        if (statuses[i] === 'complete') {
            completedCount++;
        }
    }

    // 3. Calculate the percentage and round to the nearest whole number
    var percentage = Math.round((completedCount / 9) * 100);

    // 4. Inject the final percentage into the button text dynamically
    var pctSpan = document.getElementById('completed-percentage');
    if (pctSpan) {
        pctSpan.innerHTML = percentage;
    }

    // 5. Check if no modules are complete and apply the disabled state
    var resultBtn = document.getElementById('results-summary-btn');
    if (resultBtn && completedCount === 0) {
        resultBtn.classList.add('disabled');
        resultBtn.removeAttribute('href'); // Removes the link destination entirely for security
    }
});
Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});