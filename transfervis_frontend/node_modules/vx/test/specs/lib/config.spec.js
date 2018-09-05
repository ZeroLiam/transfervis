var Config = hmt.lib('Config');

describe('Config', function () {
  var config;

  before(function () {
    config = new Config();
  });

  it('should return config context', function () {
    var specFile = hmt.path('fixtures', 'projects', 'project_a', 'test.spec.js');

    var ctx = config.ctx(specFile);
    hmt.assert.deepEqual(ctx.get('includeGroup'), ['normal']);
  });
});
