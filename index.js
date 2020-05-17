function getScrollStyle()
{
	var style = document.getElementById('scroll-style');

	if (style === null)
	{
		style = document.createElement('style');
		style.id = 'scroll-style';
		document.head.append(style);
	}

	return style;
}

function updatePageNumber()
{
	var pagePos = window.scrollY;
	var screenHeight = window.innerHeight;
	var pageHeight = document.body.scrollHeight;

	var pageCount = Math.ceil(pageHeight / screenHeight);
	var pageNum = Math.ceil(pagePos / screenHeight) + 1;

	var content = (document.title + ' (' + pageNum + '/' + pageCount
		+ ') ');
	getScrollStyle().innerHTML = ('body::before { content: "' + content
		+ '"; }');
}

window.addEventListener('load', updatePageNumber);
window.addEventListener('scroll', updatePageNumber);
