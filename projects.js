function updateVisibleProjects()
{
	var htmlTags = document.querySelectorAll('.tag');
	var tags = new Set();
	for (var i = 0; i < htmlTags.length; i++)
	{
		var htmlTag = htmlTags[i];
		var text = htmlTag.childNodes[0];
		if (text.nodeValue == '[X]')
			tags.add(htmlTag.id.substr(4));
	}

	var htmlProjects = document.querySelectorAll('div');
	for (var i = 0; i < htmlProjects.length; i++)
	{
		var htmlProject = htmlProjects[i];
		var htmlTag = htmlProject.querySelector('.tags');
		var projectTags = htmlTag.innerHTML.trim().split(' ');

		if (tags.size == 0 || projectTags.filter(x => tags.has(x)).length > 0)
			htmlProject.style.display = 'block';
		else
			htmlProject.style.display = 'none';
	}
}

function toggleTagFilter(tag)
{
	var tagBox = document.getElementById('tag-' + tag);
	var text = tagBox.childNodes[0];
	if (text.nodeValue == '[ ]')
		text.nodeValue = '[X]'
	else
		text.nodeValue = '[ ]'

	updateVisibleProjects();
}

function onLoad()
{
	var htmlProjects = document.querySelectorAll('div');
	var tags = new Set();

	for (var i = 0; i < htmlProjects.length; i++)
	{
		var htmlProject = htmlProjects[i];
		var htmlTag = htmlProject.querySelector('.tags');
		var projectTags = htmlTag.innerHTML.trim().split(' ');
		projectTags.forEach(x => tags.add(x));
	}

	var filterPElem = document.createElement('p');
	filterPElem.className = 'filters';
	filterPElem.append(document.createTextNode('filter:'));
	htmlProjects[0].insertAdjacentElement('beforebegin', filterPElem);

	tags = Array.from(tags).sort();
	for (i = 0; i < tags.length; i++)
	{
		var tag = tags[i];
		var tagLink = document.createElement('a');
		var checkBox = document.createElement('em');
		checkBox.append(document.createTextNode('[ ]'))
		checkBox.className = 'tag';
		checkBox.id = 'tag-' + tag;
		tagLink.append(checkBox);
		tagLink.append(document.createTextNode(' ' + tag));
		tagLink.href = 'javascript:toggleTagFilter("' + tag + '")'
		filterPElem.append(document.createTextNode(' '));
		filterPElem.append(tagLink);
	}
}

document.addEventListener('DOMContentLoaded', onLoad);
