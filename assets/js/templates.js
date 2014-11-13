(function(t){
	TEMPLATES = {
		'count': new t({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.v(t.f("count",c,p,0)));t.b(" ");if(t.s(t.f("count_one",c,p,1),c,p,0,24,29,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("tweet");});c.pop();}if(!t.s(t.f("count_one",c,p,1),c,p,1,0,0,"")){t.b("tweets");};return t.fl(); },partials: {}, subs: {  }}),
		'heading': new t({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("Tweets by @");t.b(t.v(t.f("screen_name",c,p,0)));return t.fl(); },partials: {}, subs: {  }}),
		'month': new t({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<li class=\"route-month-");t.b(t.v(t.f("key",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("	<a href=\"");t.b(t.v(t.f("url",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("		<span class=\"m\">");t.b(t.v(t.f("month_year",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("		<span class=\"n\">");t.b(t.v(t.f("total",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("		<span class=\"p\" style=\"width: ");t.b(t.v(t.f("total_width",c,p,0)));t.b("\"></span>\r");t.b("\n" + i);t.b("	</a>\r");t.b("\n" + i);t.b("</li>");return t.fl(); },partials: {}, subs: {  }}),
		'sub-heading-index': new t({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("Recent tweets <small>");t.b(t.rp("<count_tpl0",c,p,""));t.b("</small>");return t.fl(); },partials: {"<count_tpl0":{name:"count_tpl", partials: {}, subs: {  }}}, subs: {  }}),
		'sub-heading-month': new t({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.v(t.f("month",c,p,0)));t.b(" ");t.b(t.v(t.f("year",c,p,0)));t.b(" <small>");t.b(t.rp("<count_tpl0",c,p,""));t.b("</small>");return t.fl(); },partials: {"<count_tpl0":{name:"count_tpl", partials: {}, subs: {  }}}, subs: {  }}),
		'sub-heading-search': new t({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("Search results <small class=\"count\"></small>");return t.fl(); },partials: {}, subs: {  }}),
		'title': new t({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("Tweets by @");t.b(t.v(t.f("screen_name",c,p,0)));return t.fl(); },partials: {}, subs: {  }}),
		'tweet': new t({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"media h-entry\" data-twt-id=\"");t.b(t.v(t.f("id_str",c,p,0)));t.b("\">\r");t.b("\n" + i);if(t.s(t.f("user",c,p,1),c,p,0,64,299,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("		<a target=\"_blank\" href=\"https://twitter.com/");t.b(t.v(t.f("screen_name",c,p,0)));t.b("\" class=\"avatar float-left\" data-screen-name=\"");t.b(t.v(t.f("screen_name",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("			<div class=\"u-photo img-rounded\" style=\"background-image: url(");t.b(t.v(t.f("profile_image_url",c,p,0)));t.b(")\"></div>\r");t.b("\n" + i);t.b("		</a>\r");t.b("\n" + i);});c.pop();}t.b("	<div class=\"media-body\">\r");t.b("\n" + i);t.b("		<a target=\"_blank\" href=\"https://twitter.com/");if(t.s(t.f("user",c,p,1),c,p,0,393,408,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.f("screen_name",c,p,0)));});c.pop();}t.b("/status/");t.b(t.v(t.f("id_str",c,p,0)));t.b("\" rel=\"bookmark\" class=\"permalink float-right\">\r");t.b("\n" + i);t.b("			<span title=\"");t.b(t.v(t.f("datetime",c,p,0)));t.b("\" class=\"dt-updated\">");t.b(t.v(t.f("relative_datetime",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("		</a>\r");t.b("\n" + i);if(t.s(t.f("user",c,p,1),c,p,0,582,856,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("			<div class=\"h-card p-author\">\r");t.b("\n" + i);t.b("				<a target=\"_blank\" href=\"https://twitter.com/");t.b(t.v(t.f("screen_name",c,p,0)));t.b("\" class=\"screen-name\" data-screen-name=\"");t.b(t.v(t.f("screen_name",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("					<b class=\"p-name\">");t.b(t.v(t.f("name",c,p,0)));t.b("</b>\r");t.b("\n" + i);t.b("					<span class=\"p-nickname\">@");t.b(t.v(t.f("screen_name",c,p,0)));t.b("</span>\r");t.b("\n" + i);t.b("				</a>\r");t.b("\n" + i);t.b("			</div>\r");t.b("\n" + i);});c.pop();}t.b("		<div class=\"content\">\r");t.b("\n" + i);t.b("			<p class=\"e-content\">");t.b(t.t(t.f("content",c,p,0)));t.b("</p>\r");t.b("\n" + i);t.b("			<p class=\"content-footer\">\r");t.b("\n" + i);t.b("				via ");t.b(t.t(t.f("source",c,p,0)));t.b("\r");t.b("\n" + i);if(t.s(t.f("in_reply_to_status_id_str",c,p,1),c,p,0,1022,1173,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("					<a href=\"https://twitter.com/");t.b(t.v(t.f("in_reply_to_screen_name",c,p,0)));t.b("/status/");t.b(t.v(t.f("in_reply_to_status_id_str",c,p,0)));t.b("\">in reply to ");t.b(t.v(t.f("in_reply_to_screen_name",c,p,0)));t.b("</a>\r");t.b("\n" + i);});c.pop();}if(t.s(t.f("retweeted",c,p,1),c,p,0,1223,1453,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("			 		<br><i class=\"icon-retweet\"></i> Retweeted by ");if(t.s(t.f("retweeted_user",c,p,1),c,p,0,1296,1428,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("<a href=\"https://twitter.com/");t.b(t.v(t.f("screen_name",c,p,0)));t.b("\" data-screen-name=\"");t.b(t.v(t.f("screen_name",c,p,0)));t.b("\" title=\"");t.b(t.v(t.f("retweeted_datetime",c,p,0)));t.b("\">@");t.b(t.v(t.f("screen_name",c,p,0)));t.b("</a>");});c.pop();}t.b("\r");t.b("\n" + i);});c.pop();}t.b("			</p>\r");t.b("\n" + i);if(t.s(t.f("entities",c,p,1),c,p,0,1494,1694,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("				<div class=\"media-content\">\r");t.b("\n" + i);if(t.s(t.f("media",c,p,1),c,p,0,1544,1667,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("						<a href=\"");t.b(t.v(t.f("expanded_url",c,p,0)));t.b("\" target=\"_blank\"><img src=\"");t.b(t.v(t.f("media_url_https",c,p,0)));t.b("\" alt=\"\" class=\"img-responsive\"></a>\r");t.b("\n" + i);});c.pop();}t.b("				</div>\r");t.b("\n" + i);});c.pop();}t.b("		</div>\r");t.b("\n" + i);t.b("	</div>\r");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }})
	}
})(Hogan.Template);