#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

#cd notebook-io && ng build --prod --base-href "/notebook-hub/" && cd -
rm *.js
cp notebook-io/dist/notebook-io/* .
