module.exports = function(config) {
  config.node('pages/index', function(nodeConfig) {
    nodeConfig.addTechs([
      [ require('enb/techs/levels'), { levels: getLevels(config) } ],
      [ require("enb/techs/file-provider"), { target: "?.bemjson.js" } ],
      require("enb/techs/bemdecl-from-bemjson"),
      // [ require('enb/techs/file-provider'), { target: '?.bemdecl.js' } ],
      require('enb-bh/techs/bh-server'),
      require('enb-bh/techs/bh-client'),
      require('enb/techs/deps'),
      require('enb/techs/files'),
      require('enb/techs/css-stylus'),
      require('enb-bh/techs/html-from-bemjson'),
      [ require('enb-diverse-js/techs/browser-js'), { target: '?.pre.js' }],
      [ require('enb-modules/techs/prepend-modules'), { target: '?.js', source: '?.pre.js' }],
      // require('enb/techs/js'),
      // [ require('enb/techs/file-copy'), { sourceTarget: '?.js', destTarget: '_?.js' } ],
      [ require('enb/techs/file-copy'), { sourceTarget: '?.css', destTarget: '_?.css' } ]
    ]);


  nodeConfig.addTargets(['?.html', '?.bemdecl.js', '?.deps.js', '_?.js', '_?.css', ]);
       

  });
};


function getLevels(config) {
  return [
    {path: 'libs/bem-core/common.blocks', check: false},
    {path: 'libs/bem-core/desktop.blocks', check: false},
    {path: 'libs/bem-components/common.blocks', check: false},
    {path: 'libs/bem-components/desktop.blocks', check: false},
    {path: 'libs/bem-components/design/common.blocks', check: false},
    {path: 'libs/bem-components/design/desktop.blocks', check: false},
    {path: 'common.blocks', check: true},
    {path: 'desktop.blocks', check: true}
  ].map(function(levelPath) { return config.resolvePath(levelPath); });
}