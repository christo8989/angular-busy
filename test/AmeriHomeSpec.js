describe('cgBusy', function () {
    var doneText = 'done: ',
        EC;
    var delayInput,
        durationInput,
        messageInput,
        backdropCheckbox,
        templateUrl,
        demoButton,
        spinner;

    beforeEach(function() {
        console.log('\n');
        browser.get('http://cgross.github.io/angular-busy/demo');

        EC = protractor.ExpectedConditions;

        delayInput = element(by.model('delay'));
        durationInput = element(by.model('minDuration'));
        messageInput = element(by.model('message'));
        backdropCheckbox = element(by.model('backdrop'));
        templateUrl = element(by.model('templateUrl'));
        demoButton = element(by.css('.btn'));
        spinner = element(by.css('.cg-busy-default-sign'));
    });

    var mockupTest = 'page looks like the mockup';
    it(mockupTest, function () {
        //getTagName to be 'h2'
        //getLocation
        //getWebElement
        expect(element(by.css('.lead')).getText()).toEqual('Show busy/loading indicators on any $http or $resource request, or on any promise.');

        console.log(doneText, mockupTest);
    });

    var delayTest = 'delay (ms) is the amount of time before the busy indicator appears';
    it(delayTest, function () {
        expect(delayInput).toBeTruthy();
        expect(delayInput.getTagName()).toBe('input');

        var delay = 2000,
            maxDelay = delay + 50;
            minDelay = delay - 10;
        //set delay to 1 second
        delayInput.sendKeys(delay);
        durationInput.sendKeys(4000);
        //press button
        demoButton.click();
        //time how long it takes
        //var innerText = element(by.css('.checkbox')).getInnerHtml();
        //console.log(spinner);
        var tStart = Date.now(),
            tEnd;
        browser.wait(EC.visibilityOf(spinner, 4000))
            .then(function () {
                //is it equal to the delay
                var totalTime = Date.now() - tStart;
                console.log("time: ", totalTime);
                expect(totalTime).toBeLessThan(maxDelay);
                expect(totalTime).not.toBeLessThan(minDelay);
            });

        console.log(doneText, delayTest);
    });

    var minDuration = 'min duration (ms) is the amount of time the the busy indicator is visible';
    it(minDuration, function () {

        //TODO: NotImplemented
        //check if the min duration is there
        //set min duration to 1 second
        //press button
        //time how long the indicator is visible
        //is it greater than or equal to the min duration

        console.log(doneText, minDuration);
    });

    var templateUrlChange = 'selecting the template url changes the busy indicator from a spinner to a dancing wizard';
    it(templateUrlChange, function () {

        //TODO: NotImplemented
        //check if the spinner dancing wizard exists
        //select the template url
        //press the button
        //check if the dancing wizard is visible
        //check if the spinner is not visible

        console.log(doneText, templateUrlChange);
    });

    var switchFromStandard = 'switch from standard, press demo and then to custom-tempelate.html and press demo, dancing wizard should show.';
    it(switchFromStandard, function () {

        //TODO: NotImplemented
        //press demo
        //check if spinner is visible
        //check if wizard is NOT visible

        //select the template url
        //press demo
        //check if the dancing wizard is visible
        //check if the spinner is not visible

        console.log(doneText, switchFromStandard);
    });

    var messageTextBox = 'message in the busy spinner is set by the message text box';
    it(messageTextBox, function () {

        //TODO: NotImplemented
        //check if the spinner has a message label with the same variable as the message text box
        //type "Loading..." into the message text box
        //click demo button
        //check if the spinner has the text from the message text box

        //change the template url to the custom-tempelate
        //click demo button
        //check if the wizard has the text from the message text box

        console.log(doneText, messageTextBox);
    });

    var userExperience = 'the following user experience is supported';
    it(userExperience, function () {

        //TODO: NotImplemented
        /*
            1. First, click Demo with message "Please Wait...". Shows the message "Please Wait..." in the busy indicator

            2. Second, Demo with message "Waiting". Shows the message "Waiting." in the busy indicator

            3. Third, Set Minimum duration to 1000 ms, press Demo, busy spinner with message "Waiting." shows.
        */
        //click Demo
        //check if the message is "Please Wait..."

        //change the message box text to "Waiting"
        //click Demo
        //check if the message is "Waiting"

        //change the minimum duration to 1000ms
        //click Demo
        //check if the message is "Waiting"

        console.log(doneText, userExperience);
    });
});
