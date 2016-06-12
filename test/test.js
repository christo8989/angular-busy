describe('cgBusy', function () {

    var $this = this,
        doneText = 'done: ',
        EC = protractor.ExpectedConditions,
        delayInput = element(by.model('delay')),
        durationInput = element(by.model('minDuration')),
        messageInput,
        backdropCheckbox,
        templateUrl,
        demoButton = element(by.css('.btn'));

    beforeEach(function() {
        console.log('\n');
        browser.get('http://cgross.github.io/angular-busy/demo');

        //EC = protractor.ExpectedConditions;

        //delayInput = element(by.model('delay'));
        //durationInput = element(by.model('minDuration'));
        messageInput = element(by.model('message'));
        backdropCheckbox = element(by.model('backdrop'));
        templateUrl = element(by.model('templateUrl'));
        //demoButton = element(by.css('.btn'));
    });

    function set(elem, value) {
        elem.clear();
        elem.sendKeys(value);
    }

    //I should break this down into multiple tests.
    var delayTest = 'Test if the delay works.';
    it(delayTest, function () {
        set(delayInput, 2000);
        set(durationInput, 4000);

        var spinner = element(by.css('.cg-busy.cg-busy-animation.ng-scope'));
        //hiddenSpinner.getAttribute('class').then(data => console.log('spinner:', data));
        var waitForMe = function() {
            return Promise.resolve(!spinner.getAttribute('class').then(data => data.includes('ng-hide')));
        };
        var tStart = 0;
        browser.actions().click(demoButton).perform()
            .then(() => tStart = Date.now())
            .then(() => browser.wait(waitForMe, 4000))
            .then(() => console.log(Date.now() - tStart));


        //browser.wait(() => hiddenSpinner.getAttribute('class').then(data => data.includes('ng-hide') === false))
        //    .then(() => console.log(Date.now() - tStart));

        var cgBusy = element(by.xpath('//div[@cg-busy]'));
        cgBusy.getAttribute('cg-busy').then(data => console.log('cgBusy:', data));
        expect(cgBusy.getAttribute('cg-busy')).toContain('delay:delay');


        console.log(doneText, delayTest);
    });
});
