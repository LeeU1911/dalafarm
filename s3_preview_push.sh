#!/usr/bin/env bash
# -*- coding: utf8 -*-
#
#  Copyright (c) 2016 unfoldingWord
#  http://creativecommons.org/licenses/MIT/
#  See LICENSE file for details.
#
#  Contributors:
#  Jesse Griffin <jesse@unfoldingword.org>
echo start script
SOURCE="public/"
BKT="s3://preview.dalafarm.com.vn/"
EXCLUDES="s3_excludes"

openssl aes-256-cbc -K $encrypted_72893ab80126_key -iv $encrypted_72893ab80126_iv -in secrets.tar.enc -out secrets.tar -d
tar xvf secrets.tar
echo unzip

s3cmd -c s3cfg-prod sync -M -F \
    --delete-removed \
    --no-mime-magic \
    --exclude-from "$EXCLUDES" \
    --add-header="Cache-Control:max-age=21600" \
    "$SOURCE" "$BKT"

s3cmd -c s3cfg-prod sync -M -F \
    --delete-removed \
    --no-mime-magic \
    --exclude="*" \
    --include-from '$EXCLUDES' \
    --add-header="Cache-Control:max-age=21600" \
    --add-header='Content-Encoding:gzip' \
    "$SOURCE" "$BKT"