#!/usr/bin/env python

import subprocess


def main():
    with open('index.html', 'r') as f:
        data = f.read()

    pre_elem = '<pre aria-hidden="true">'
    first_pre = data.find(pre_elem)
    first_pre_end = data.find('</pre>')
    last_pre = data.rfind(pre_elem)
    last_pre_end = data.rfind('</pre>')

    body = data[first_pre_end:last_pre+len(pre_elem)]
    gpg = subprocess.Popen(['gpg', '--clearsign', '-'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE)
    stdout, stderr = gpg.communicate(body.encode('utf8'))
    new_body = stdout.decode('utf8')

    new_data = data[:first_pre+len(f'{pre_elem}\n')] + new_body + data[last_pre_end:]

    with open('index.html', 'w') as f:
        f.write(new_data)


if __name__ == '__main__':
    main()
