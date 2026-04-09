$(document).ready(function() {

    FreshWidget.init("", {
        "queryString": "&widgetType=popup&submitThanks=Thank+you+for+submitting+your+feedback",
        "widgetType": "popup",
        "buttonType": "text",
        "buttonText": "Support",
        "buttonColor": "white",
        "buttonBg": "#00a1ab",
        "alignment": "4",
        "offset": "275px",
        "formHeight": "500px",
        "url": "https://educationportal.freshdesk.com",
        "assetUrl": "https://s3.amazonaws.com/assets.freshdesk.com/widget"
    });

    $('.supportEmailTrigger').click(function (e) {
        e.preventDefault();
        FreshWidget.show();
    })
});
