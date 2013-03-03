var Hogan = require('hogan.js');
var t = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("(function(t){\r");_.b("\n" + i);_.b("	TEMPLATES = {\r");_.b("\n" + i);if(_.s(_.f("templates",c,p,1),c,p,0,47,97,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("		'");_.b(_.v(_.f("name",c,p,0)));_.b("': new t(");_.b(_.t(_.f("template",c,p,0)));_.b(")");_.b(_.v(_.f("comma",c,p,0)));_.b("\r");_.b("\n");});c.pop();}_.b("	}\r");_.b("\n" + i);_.b("})(Hogan.Template);");return _.fl();;});

module.exports = {
  render : function(c, p, i) {
    return t.render(c, p, i);
  }
};