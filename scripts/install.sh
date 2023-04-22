#!/bin/bash

# Prompt the user to confirm installation
read -rp "Do you want to install Playwright and its dependencies(y/n)?" choice
case "$choice" in
y | Y)
    # Install Playwright
    npm init playwright@latest

    # Install dotenv
    npm i -D dotenv

    # Install fs-extra and its types
    npm install fs-extra
    npm i --save-dev @types/fs-extra

    # Install js-image-generator
    npm install js-image-generator

    # Install stealth plugin for Chromium
    npm install playwright-extra
    npm install playwright-extra-plugin-stealth
    ;;
n | N)
    echo "Installation canceled"
    ;;
*) echo "Incorrect input. Installation canceled." ;;
esac
