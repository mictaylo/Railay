<!doctype html>
<!--[if lt IE 7 ]> <html class="ie6 lteie7 lteie8 lteie9" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7 lteie7 lteie8 lteie9" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8 lteie8 lteie9" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie9 lteie9" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<title></title>
	<!-- build:css /styles/lib.css -->
	<link href="/bower_components/normalize.css/normalize.css" rel="stylesheet" />
	<!-- endbuild -->
	<link rel="stylesheet" href="/styles.min.css" />
	{% block css-page-specific %}{% endblock %}
	<script data-main="/modules/main.js" src="/bower_components/requirejs/require.js"></script>
	{% block js-head-page-specific %}{% endblock %}
</head>
<body>
	{% block body-top %}{% endblock %}
	{% block body-content %}{% endblock %}
	<!-- build:js /scripts/lib.js -->
		<script src="/bower_components/jquery/dist/jquery.js"></script>
		<script src="/assets/es6-example/example.es6.js"></script>
	<!-- endbuild -->
	{% block js-foot-page-specific %}{% endblock %}
</body>
</html>
