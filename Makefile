PYTHON ?= python3
GPG ?= gpg
RSYNC ?= rsync

ALL = \
	index.html \
	index.css \
	index.js \
	projects.html \
	projects.js \
	projects.yaml

all: sign projects.html

verify:
	$(GPG) --verify index.html

force-sign:
	$(PYTHON) sign.py

sign:
	$(GPG) --verify index.html || $(PYTHON) sign.py

projects.html: projects.yaml projects.html.jinja projects2html.py
	$(PYTHON) projects2html.py $< -o $@

upload: sign $(ALL)
	$(RSYNC) $(ALL) dev.gentoo.org:public_html/
