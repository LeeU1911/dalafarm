#!/usr/bin/env bash
# -*- coding: utf8 -*-
#
#  Copyright (c) 2016 unfoldingWord
#  http://creativecommons.org/licenses/MIT/
#  See LICENSE file for details.
#
#  Contributors:
#  Jesse Griffin <jesse@unfoldingword.org>

SOURCE="public/"
BKT="s3://preview.dalafarm.com.vn/"
EXCLUDES="s3_excludes"

openssl aes-256-cbc -K $encrypted_72893ab80126_key -iv $encrypted_72893ab80126_iv -in secrets.tar.enc -out secrets.tar -d
tar xvf secrets.tar

s3cmd -c s3cfg-prod sync -M -F \
    --no-mime-magic \
    --exclude-from "$EXCLUDES" \
    --add-header="Cache-Control:max-age=21600" \
    "$SOURCE" "$BKT"