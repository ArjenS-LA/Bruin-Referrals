#!/bin/bash

# Initialize an empty file or overwrite if it exists
> out.txt

# Find all .js files recursively and append them to out.txt
find . -type f -name "*.js" -exec cat {} >> out.txt \;

echo "All JavaScript files have been concatenated into out.txt"