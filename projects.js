function updateVisibleProjects()
{
	var htmlTags = Array.from(document.querySelectorAll('.tag'));
	var tags = new Set();
	htmlTags.forEach(htmlTag =>
	{
		var text = htmlTag.childNodes[0];
		if (text.nodeValue == 'X')
			tags.add(htmlTag.id.substr(4));
	});

	var htmlProjects = Array.from(document.querySelectorAll('div'))
	htmlProjects.forEach(htmlProject =>
	{
		var htmlTag = htmlProject.querySelector('.tags');
		var projectTags = htmlTag.innerHTML.trim().split(' ');

		if (tags.size == 0 || projectTags.filter(x => tags.has(x)).length > 0)
		{
			htmlProject.style.maxHeight = htmlProject.scrollHeight + 'px';
			htmlProject.style.opacity = '100%';
		}
		else
		{
			htmlProject.style.maxHeight = '0'
			htmlProject.style.opacity = '0';
		}
	});
}

function toggleTagFilter(tag)
{
	var tagBox = document.getElementById('tag-' + tag);
	var text = tagBox.childNodes[0];
	if (text.nodeValue == ' ')
		text.nodeValue = 'X'
	else
		text.nodeValue = ' '

	updateVisibleProjects();
}

function onLoad()
{
	var htmlProjects = Array.from(document.querySelectorAll('div'));
	var tags = [];

	htmlProjects.forEach(htmlProject =>
	{
		var htmlTag = htmlProject.querySelector('.tags');
		var projectTags = htmlTag.innerHTML.trim().split(' ');
		projectTags.forEach(x => tags.push(x));

		htmlProject.style.maxHeight = htmlProject.scrollHeight + 'px';
		htmlProject.style.overflow = 'hidden';
	});

	var filterPElem = document.createElement('p');
	filterPElem.className = 'filters';
	filterPElem.append(document.createTextNode('filter:'));

	var uniqueTags = new Set(tags);
	var countedTags = new Array();
	var maxCount = 0;
	uniqueTags.forEach(tag =>
	{
		var tagCount = tags.filter(x => x == tag).length;
		countedTags.push([tagCount, tag]);
		maxCount = Math.max(maxCount, tagCount);
	});

	countedTags.sort((lhs, rhs) =>
	{
		if (lhs[0] > rhs[0])
			return -1;
		if (lhs[0] < rhs[0])
			return 1;
		if (lhs[1] < rhs[1])
			return -1;
		if (lhs[1] > rhs[1])
			return 1;
		return 0;
	}).forEach(tagPair =>
	{
		var tagCount = tagPair[0];
		var tag = tagPair[1];
		var tagLink = document.createElement('a');
		tagLink.className = 'tag-pop' + Math.ceil(
			5 * tagCount / maxCount);
		var checkBox = document.createElement('em');
		checkBox.append(document.createTextNode(' '))
		checkBox.className = 'tag';
		checkBox.id = 'tag-' + tag;
		tagLink.append(checkBox);
		tagLink.append(document.createTextNode(' ' + tag));
		var supCount = document.createElement('sup');
		supCount.append(document.createTextNode(tagCount));
		tagLink.append(supCount);
		tagLink.href = 'javascript:toggleTagFilter("' + tag + '")'
		filterPElem.append(document.createTextNode(' '));
		filterPElem.append(tagLink);
	});

	htmlProjects[0].insertAdjacentElement('beforebegin', filterPElem);
}

document.addEventListener('DOMContentLoaded', onLoad);
