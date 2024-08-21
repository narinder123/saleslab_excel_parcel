# RUN Commands

use "npm start" and include name:YOUR_FOLDER_NAME

for generating data of V1 or V2
include "V1:true" or "V2:true" in command

if you want to generate data for both include both commands
exmaple: npm start name:Cigna V1:true V2:true

And for importing V1 data include "import:ENTER_DB_MODE"

We for dev include "import:dev"
and for prod include "import:prod"

Impotant Note - you can't run import and V1 command at the same time, these commands needs to be run seperately

# ==============
