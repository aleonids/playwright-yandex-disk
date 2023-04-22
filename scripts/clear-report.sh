#!/bin/bash
# if report and results exist, delete them
if [ -d "allure-results" ]; then rm -Rf allure-results; fi
if [ -d "allure-report" ]; then rm -Rf allure-report; fi

