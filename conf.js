// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./test/AmeriHomeSpec.js'],
  multiCapabilities: [
      { browserName: 'firefox' },
      { browserName: 'safari' },
      { browserName: 'explorer' },
      { browserName: 'chrome' }
  ]
}
