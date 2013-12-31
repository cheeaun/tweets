(function(t){
	TEMPLATES = {
		'count': new t(function(c,p,i){var _=this;_.b(i=i||"");_.b(_.v(_.f("count",c,p,0)));_.b(" ");if(_.s(_.f("count_one",c,p,1),c,p,0,24,29,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("tweet");});c.pop();}if(!_.s(_.f("count_one",c,p,1),c,p,1,0,0,"")){_.b("tweets");};return _.fl();;}),
		'heading': new t(function(c,p,i){var _=this;_.b(i=i||"");_.b("Tweets by @");_.b(_.v(_.f("screen_name",c,p,0)));return _.fl();;}),
		'month': new t(function(c,p,i){var _=this;_.b(i=i||"");_.b("<li class=\"route-month-");_.b(_.v(_.f("key",c,p,0)));_.b("\">\r");_.b("\n" + i);_.b("	<a href=\"");_.b(_.v(_.f("url",c,p,0)));_.b("\">\r");_.b("\n" + i);_.b("		<span class=\"m\">");_.b(_.v(_.f("month_year",c,p,0)));_.b("</span>\r");_.b("\n" + i);_.b("		<span class=\"n\">");_.b(_.v(_.f("total",c,p,0)));_.b("</span>\r");_.b("\n" + i);_.b("		<span class=\"p\" style=\"width: ");_.b(_.v(_.f("total_width",c,p,0)));_.b("\"></span>\r");_.b("\n" + i);_.b("	</a>\r");_.b("\n" + i);_.b("</li>");return _.fl();;}),
		'sub-heading-index': new t(function(c,p,i){var _=this;_.b(i=i||"");_.b("Recent tweets <small>");_.b(_.rp("count_tpl",c,p,""));_.b("</small>");return _.fl();;}),
		'sub-heading-month': new t(function(c,p,i){var _=this;_.b(i=i||"");_.b(_.v(_.f("month",c,p,0)));_.b(" ");_.b(_.v(_.f("year",c,p,0)));_.b(" <small>");_.b(_.rp("count_tpl",c,p,""));_.b("</small>");return _.fl();;}),
		'sub-heading-search': new t(function(c,p,i){var _=this;_.b(i=i||"");_.b("Search results <small class=\"count\"></small>");return _.fl();;}),
		'title': new t(function(c,p,i){var _=this;_.b(i=i||"");_.b("Tweets by @");_.b(_.v(_.f("screen_name",c,p,0)));return _.fl();;}),
		'tweet': new t(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"media h-entry\" data-twt-id=\"");_.b(_.v(_.f("id_str",c,p,0)));_.b("\">\r");_.b("\n" + i);if(_.s(_.f("user",c,p,1),c,p,0,64,299,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("		<a target=\"_blank\" href=\"https://twitter.com/");_.b(_.v(_.f("screen_name",c,p,0)));_.b("\" class=\"avatar float-left\" data-screen-name=\"");_.b(_.v(_.f("screen_name",c,p,0)));_.b("\">\r");_.b("\n" + i);_.b("			<div class=\"u-photo img-rounded\" style=\"background-image: url(");_.b(_.v(_.f("profile_image_url",c,p,0)));_.b(")\"></div>\r");_.b("\n" + i);_.b("		</a>\r");_.b("\n");});c.pop();}_.b("	<div class=\"media-body\">\r");_.b("\n" + i);_.b("		<a target=\"_blank\" href=\"https://twitter.com/");if(_.s(_.f("user",c,p,1),c,p,0,393,408,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("screen_name",c,p,0)));});c.pop();}_.b("/status/");_.b(_.v(_.f("id_str",c,p,0)));_.b("\" rel=\"bookmark\" class=\"permalink float-right\">\r");_.b("\n" + i);_.b("			<span title=\"");_.b(_.v(_.f("datetime",c,p,0)));_.b("\" class=\"dt-updated\">");_.b(_.v(_.f("relative_datetime",c,p,0)));_.b("</span>\r");_.b("\n" + i);_.b("		</a>\r");_.b("\n" + i);if(_.s(_.f("user",c,p,1),c,p,0,582,856,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("			<div class=\"h-card p-author\">\r");_.b("\n" + i);_.b("				<a target=\"_blank\" href=\"https://twitter.com/");_.b(_.v(_.f("screen_name",c,p,0)));_.b("\" class=\"screen-name\" data-screen-name=\"");_.b(_.v(_.f("screen_name",c,p,0)));_.b("\">\r");_.b("\n" + i);_.b("					<b class=\"p-name\">");_.b(_.v(_.f("name",c,p,0)));_.b("</b>\r");_.b("\n" + i);_.b("					<span class=\"p-nickname\">@");_.b(_.v(_.f("screen_name",c,p,0)));_.b("</span>\r");_.b("\n" + i);_.b("				</a>\r");_.b("\n" + i);_.b("			</div>\r");_.b("\n");});c.pop();}_.b("		<div class=\"content\">\r");_.b("\n" + i);_.b("			<p class=\"e-content\">");_.b(_.t(_.f("content",c,p,0)));_.b("</p>\r");_.b("\n" + i);_.b("			<p class=\"content-footer\">\r");_.b("\n" + i);_.b("				via ");_.b(_.t(_.f("source",c,p,0)));_.b("\r");_.b("\n" + i);if(_.s(_.f("in_reply_to_status_id_str",c,p,1),c,p,0,1022,1173,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("					<a href=\"https://twitter.com/");_.b(_.v(_.f("in_reply_to_screen_name",c,p,0)));_.b("/status/");_.b(_.v(_.f("in_reply_to_status_id_str",c,p,0)));_.b("\">in reply to ");_.b(_.v(_.f("in_reply_to_screen_name",c,p,0)));_.b("</a>\r");_.b("\n");});c.pop();}if(_.s(_.f("retweeted",c,p,1),c,p,0,1223,1453,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("			 		<br><i class=\"icon-retweet\"></i> Retweeted by ");if(_.s(_.f("retweeted_user",c,p,1),c,p,0,1296,1428,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<a href=\"https://twitter.com/");_.b(_.v(_.f("screen_name",c,p,0)));_.b("\" data-screen-name=\"");_.b(_.v(_.f("screen_name",c,p,0)));_.b("\" title=\"");_.b(_.v(_.f("retweeted_datetime",c,p,0)));_.b("\">@");_.b(_.v(_.f("screen_name",c,p,0)));_.b("</a>");});c.pop();}_.b("\r");_.b("\n");});c.pop();}_.b("			</p>\r");_.b("\n" + i);if(_.s(_.f("entities",c,p,1),c,p,0,1494,1694,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("				<div class=\"media-content\">\r");_.b("\n" + i);if(_.s(_.f("media",c,p,1),c,p,0,1544,1667,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("						<a href=\"");_.b(_.v(_.f("expanded_url",c,p,0)));_.b("\" target=\"_blank\"><img src=\"");_.b(_.v(_.f("media_url_https",c,p,0)));_.b("\" alt=\"\" class=\"img-responsive\"></a>\r");_.b("\n");});c.pop();}_.b("				</div>\r");_.b("\n");});c.pop();}_.b("		</div>\r");_.b("\n" + i);_.b("	</div>\r");_.b("\n" + i);_.b("</div>");return _.fl();;})
	}
})(Hogan.Template);