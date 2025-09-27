#!/bin/bash
cd /home/kavia/workspace/code-generation/government-tourism-portal-144871-144880/frontend_web_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

