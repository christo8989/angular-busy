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
            return element(by.deepCss('background-image: url("finalfantasy.gif");'));
        };
        getSpinner = function () {
            return element(by.css('.cg-busy.cg-busy-animation.ng-scope'));
        };
    });

    function set(elem, value) {
        elem.clear();
        elem.sendKeys(value);
    }

    //I should break this down into multiple tests.
    var mockupTest = 'Test if the page looks like the mockup.';
    it(mockupTest, function () {
        var body = element(by.tagName('body'))
        //body.getCssValue('font-family').then(data => console.log('css value:', data));
        expect(body.getCssValue('font-family')).toEqual('"Helvetica Neue", Helvetica, Arial, sans-serif');
        expect(body.getCssValue('font-size')).toEqual('14px');
        expect(body.getCssValue('line-height')).toEqual('20px');
        expect(body.getCssValue('color')).toEqual('rgba(51, 51, 51, 1)');
        expect(body.getCssValue('background-color')).toEqual('rgba(255, 255, 255, 1)');
        expect(body.getCssValue('margin')).toEqual('0px');

        var container = body.element(by.className('container'));
        var containerWidth = container.getCssValue('width').then(data => parseInt(data.replace('px', ''), 10));
        expect(containerWidth).toBeLessThan(1201);
        expect(container.getCssValue('margin-right')).toEqual(container.getCssValue('margin-left'));
        expect(container.getCssValue('padding-right')).toEqual('15px');
        expect(container.getCssValue('padding-left')).toEqual('15px');

        var rows = container.all(by.className('row'));
        expect(rows.getCssValue('margin-left')).toEqual(['-15px', '-15px']);
        expect(rows.getCssValue('margin-right')).toEqual(['-15px', '-15px']);


        //Top Row
        var topDiv = rows.get(0).element(by.tagName('div')); //Not using .first() to stay consistent.
        expect(topDiv.getAttribute('class')).toEqual('col-md-12');

        var h2 = topDiv.element(by.tagName('h2'));
        expect(h2.getText()).toEqual('angular-busy');
        expect(h2.getCssValue('font-family')).toEqual('"Helvetica Neue", Helvetica, Arial, sans-serif');
        expect(h2.getCssValue('color')).toEqual('rgba(51, 51, 51, 1)');
        expect(h2.getCssValue('font-size')).toEqual('30px');
        expect(h2.getCssValue('margin-top')).toEqual('20px');
        expect(h2.getCssValue('margin-bottom')).toEqual('10px');
        expect(h2.getCssValue('font-weight')).toEqual('500');
        expect(h2.getCssValue('line-height')).toEqual('33px');

        var p = topDiv.element(by.tagName('p'));
        expect(p.getText()).toEqual('Show busy/loading indicators on any $http or $resource request, or on any promise.');
        expect(p.getCssValue('font-family')).toEqual('"Helvetica Neue", Helvetica, Arial, sans-serif');
        expect(p.getCssValue('color')).toEqual('rgba(51, 51, 51, 1)');
        expect(p.getCssValue('line-height')).toEqual('29.4px');
        expect(p.getCssValue('font-weight')).toEqual('200');
        expect(p.getCssValue('margin-bottom')).toEqual('20px');
        expect(p.getCssValue('font-size')).toEqual('21px');


        //Bottom Row
        var bottomDivs = rows.get(1).all(by.xpath('./div'));
        //expect(bottomDivs.getAttribute('class')).toEqual(['col-md-4', 'col-md-offset-1 col-md-7']);
        expect(bottomDivs.get(0).getAttribute('class')).toEqual('col-md-4');
        expect(bottomDivs.get(1).getAttribute('class')).toEqual('col-md-offset-1 col-md-7');

        var form = bottomDivs.get(0).element(by.tagName('form'));
        expect(form.getAttribute('class')).toContain('form-horizontal');
        expect(form.getAttribute('class')).toContain('ng-pristine');
        expect(form.getAttribute('class')).toContain('ng-valid');

        var formLegend = form.element(by.tagName('legend'));
        expect(formLegend.getText()).toEqual('Demo Options');
        expect(formLegend.getCssValue('display')).toEqual('block');
        expect(formLegend.getCssValue('padding')).toEqual('0px');
        expect(formLegend.getCssValue('margin-bottom')).toEqual('20px');
        expect(formLegend.getCssValue('font-size')).toEqual('21px');
        expect(formLegend.getCssValue('color')).toEqual('rgba(51, 51, 51, 1)');
        expect(formLegend.getCssValue('border-top')).toContain('0px');
        expect(formLegend.getCssValue('border-bottom')).toEqual('1px solid rgb(229, 229, 229)');

        var formGroups = form.all(by.className('form-group'));
        var messageGroup = formGroups.get(0);
        var messageGroupLabel = messageGroup.element(by.tagName('label'));
        expect(messageGroupLabel.getAttribute('class')).toContain('col-sm-5');
        expect(messageGroupLabel.getAttribute('class')).toContain('control-label');
        expect(messageGroupLabel.getText()).toEqual('Delay (ms)');
        var messageGroupDiv = messageGroup.element(by.tagName('div'));
        expect(messageGroupDiv.getAttribute('class')).toEqual('col-sm-4');
        var messageGroupInput = messageGroup.element(by.tagName('input'));
        expect(messageGroupInput.getAttribute('class')).toContain('form-control');
        expect(messageGroupInput.getAttribute('class')).toContain('ng-pristine');
        expect(messageGroupInput.getAttribute('class')).toContain('ng-valid');
        expect(messageGroupInput.getAttribute('id')).toContain('delayInput');

        var durationGroup = formGroups.get(1);
        var durationGroupLabel = durationGroup.element(by.tagName('label'));
        expect(durationGroupLabel.getAttribute('class')).toContain('col-sm-5');
        expect(durationGroupLabel.getAttribute('class')).toContain('control-label');
        expect(durationGroupLabel.getText()).toEqual('Min Duration (ms)');
        var durationGroupDiv = durationGroup.element(by.tagName('div'));
        expect(durationGroupDiv.getAttribute('class')).toEqual('col-sm-4');
        var durationGroupInput = durationGroup.element(by.tagName('input'));
        expect(durationGroupInput.getAttribute('class')).toContain('form-control');
        expect(durationGroupInput.getAttribute('class')).toContain('ng-pristine');
        expect(durationGroupInput.getAttribute('class')).toContain('ng-valid');
        expect(durationGroupInput.getAttribute('id')).toContain('durationInput');

        var messageGroup = formGroups.get(2);
        var messageGroupLabel = messageGroup.element(by.tagName('label'));
        expect(messageGroupLabel.getAttribute('class')).toContain('col-sm-5');
        expect(messageGroupLabel.getAttribute('class')).toContain('control-label');
        expect(messageGroupLabel.getText()).toEqual('Message');
        var messageGroupDiv = messageGroup.element(by.tagName('div'));
        expect(messageGroupDiv.getAttribute('class')).toEqual('col-sm-6');
        var messageGroupInput = messageGroup.element(by.tagName('input'));
        expect(messageGroupInput.getAttribute('class')).toContain('form-control');
        expect(messageGroupInput.getAttribute('class')).toContain('ng-pristine');
        expect(messageGroupInput.getAttribute('class')).toContain('ng-valid');
        expect(messageGroupInput.getAttribute('id')).toContain('message');

        var checkboxGroup = formGroups.get(3);
        var checkboxGroupOffset = checkboxGroup.element(by.css('.col-sm-offset-5.col-sm-5'));
        expect(checkboxGroupOffset).toBeTruthy();
        var checkboxGroupLabel = checkboxGroupOffset.element(by.tagName('label'));
        expect(checkboxGroupLabel.getText()).toEqual('Show Backdrop');
        var checkboxGroupCheckbox = checkboxGroupOffset.element(by.tagName('input'));
        expect(checkboxGroupCheckbox.getAttribute('type')).toEqual('checkbox');
        expect(checkboxGroupCheckbox.getAttribute('ng-model')).toEqual('backdrop');
        expect(checkboxGroupCheckbox.getAttribute('class')).toContain('ng-pristine');
        expect(checkboxGroupCheckbox.getAttribute('class')).toContain('ng-valid');

        var templateGroup = formGroups.get(4);
        var templateGroupLabel = templateGroup.element(by.tagName('label'));
        expect(templateGroupLabel.getAttribute('class')).toContain('col-sm-5');
        expect(templateGroupLabel.getAttribute('class')).toContain('control-label');
        expect(templateGroupLabel.getText()).toEqual('Template Url');
        var templateGroupDiv = templateGroup.element(by.tagName('div'));
        expect(templateGroupDiv.getAttribute('class')).toEqual('col-sm-7');
        var templateGroupInput = templateGroup.element(by.tagName('select'));
        expect(templateGroupInput.getAttribute('class')).toContain('form-control');
        expect(templateGroupInput.getAttribute('class')).toContain('ng-pristine');
        expect(templateGroupInput.getAttribute('class')).toContain('ng-valid');
        expect(templateGroupInput.getAttribute('id')).toContain('template');
        expect(templateGroupInput.all(by.tagName('option')).count()).toBeGreaterThan(0);

        var button = form.element(by.tagName('button'));
        expect(button.getAttribute('class')).toContain('btn btn-default');
        expect(button.getAttribute('class')).toContain('pull-right');


        var mockTable = bottomDivs.get(1);
        expect(mockTable.getAttribute('class')).toEqual('col-md-offset-1 col-md-7');
        var cgBusy = mockTable.all(by.tagName('div')).first();
        expect(cgBusy).toBeTruthy();

        console.log(doneText, mockupTest);
    });


    var delayTest = 'Test if the delay works.';
    it(delayTest, function () {
        set(delayInput, 2000);
        set(durationInput, 4000);

        //This doesn't work and I have no idea why.
        //I spent a lot of time trying to figure it out... :(
        //Sad times.
        var tResult = 0;
        var tStart = 0;
        var spinner = element(by.css('.cg-busy.cg-busy-animation.ng-scope'));
        var waitForMe = function() {
            return spinner.getAttribute('class')
                .then(data => data.includes('ng-hide') === false);
        };
        demoButton.click(demoButton)
            .then(() => tStart = Date.now())
            .then(() =>
                browser.wait(waitForMe, 5000)
                    .then(() => {
                        tResult = Date.now() - tStart;
                        expect(tResult).toBeGreaterThan(1999);
                        expect(tResult).toBeLessThan(2200);
                        return;
                    })
            );

        console.log(doneText, delayTest);
    });



    var durationTest = 'Test if the duration works.';
    it(durationTest, function () {
        set(delayInput, 0);
        set(durationInput, 2000);

        var tResult = 0;
        var tStart = 0;
        var spinner = getSpinner();
        var waitForMe = function() {
            return spinner.getAttribute('class')
                .then(data => data.includes('ng-hide'));
        };
        demoButton.click(demoButton)
            .then(() => tStart = Date.now())
            .then(() =>
                browser.wait(waitForMe, 6000)
                    .then(() => {
                        tResult = Date.now() - tStart;
                        expect(tResult).toBeGreaterThan(1999);
                        return;
                    })
            );

        console.log(durationTest, delayTest);
    });



    var templateUrlChange = 'Select the dancing wizard and show that it\'s visible';
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

    var userExperience = 'Message in the spinner is set to the main message.';
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
