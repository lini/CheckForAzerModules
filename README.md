# CheckForAzerModules
Check a list of package.json files for the liberated @azerbike modules

# howto

First you need to create a list of the package.json files to check. If you are checking a module, you can use the following shell command from the module directory:

find "$(pwd)" -name "package.json"  > packageList.txt

Next you need to pass the file created in the above step to the script:

node check packageList.txt

This will output a list of modules that will have problems because they depend on the removed ones from npmjs. For example:

bson uses: one
line-numbers uses: left-pad

