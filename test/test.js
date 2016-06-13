describe('cgBusy', function () {

    var $this = this,
        doneText = 'done: ',
        EC = protractor.ExpectedConditions,
        delayInput = element(by.model('delay')),
        durationInput = element(by.model('minDuration')),
        messageInput = element(by.model('message')),
        backdropCheckbox = element(by.model('backdrop')),
        templateUrl = element(by.model('templateUrl')),
        demoButton = element(by.css('.btn')),
        getWizard,
        getSpinner;

    beforeEach(function() {
        console.log('\n');
        browser.get('http://cgross.github.io/angular-busy/demo');

        getWizard = function () {
            return element(by.css('div[style*="background-image: url("finalfantasy.gif");"]'));
        };
        getSpinner = function () {
            return element(by.css('.cg-busy.cg-busy-animation.ng-scope'));
        };
    });

    function set(elem, value) {
        elem.clear();
        elem.sendKeys(value);
    }

    var templateUrlChange = 'selecting the template url changes the busy indicator from a spinner to a dancing wizard';
    it(templateUrlChange, function () {
        set(delayInput, 0);
        set(durationInput, 1000);

        var options = element.all(by.tagName('option'));
        var option = options.get(1);
        expect(option.getAttribute('value')).toEqual('custom-template.html');

        option.click();
        demoButton.click();
        var wizard = getWizard();
        expect(wizard.isDisplayed()).toBe(true);

        console.log(doneText, templateUrlChange);
    });
});
