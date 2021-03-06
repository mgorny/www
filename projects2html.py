#!/usr/bin/env python

import argparse
import os.path
import sys

from docutils.core import publish_parts

import jinja2
import yaml


def wrap_projects(projects):
    for p in projects:
        p['desc_html'] = publish_parts(p['desc'],
                                       writer_name='html5')['body']
        yield p


def main(argv):
    argp = argparse.ArgumentParser()
    argp.add_argument('input_yaml',
                      help='Projects YAML file')
    argp.add_argument('-o', '--output',
                      default='-',
                      help='Output HTML file (default: stdout)')
    args = argp.parse_args(argv)

    with open(args.input_yaml) as f:
        projects = list(yaml.safe_load_all(f))

    jenv = jinja2.Environment(
            loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))
    t = jenv.get_template('projects.html.jinja')

    if args.output == '-':
        print(t.render(projects=wrap_projects(projects)))
    else:
        with open(args.output, 'w') as f:
            print(t.render(projects=wrap_projects(projects)), file=f)

    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
