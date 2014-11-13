var Hogan = require('hogan.js');
var templates = {};
/* jshint ignore:start */
templates['binder'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("(function(t){\r");t.b("\n" + i);t.b("	TEMPLATES = {\r");t.b("\n" + i);if(t.s(t.f("templates",c,p,1),c,p,0,47,97,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("		'");t.b(t.v(t.f("name",c,p,0)));t.b("': new t(");t.b(t.t(t.f("template",c,p,0)));t.b(")");t.b(t.v(t.f("comma",c,p,0)));t.b("\r");t.b("\n" + i);});c.pop();}t.b("	}\r");t.b("\n" + i);t.b("})(Hogan.Template);");return t.fl(); },partials: {}, subs: {  }}); 
/* jshint ignore:end */
module.exports = templates;