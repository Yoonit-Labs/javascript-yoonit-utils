###############################################################################
# Copyright (c) 2015 Yorkshire Interactive (yorkshireinteractive.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
###############################################################################

function pause() {
  echo ''
  echo 'Package deployed!'
  echo ''
  read -r -s -n 1 -p 'Press any key to continue...'
  echo ''
}

# shellcheck disable=SC2164
cd npm
echo 'Getting Git URL...'
# shellcheck disable=SC2006
GITURL=`git config remote.origin.url`
echo ''
echo '---------------------'
echo 'Creating Git branch...'
git init
git remote add origin "$GITURL"
git add .
git commit -am 'npm publish'
echo ''
echo '---------------------'
echo 'Deploying...'
echo 'Pushing "npm" branch on Git...'
git push origin master:npm --force
wait
echo ''
echo '---------------------'
echo 'Publishing on NPM...'
npm publish --access public --otp
wait
PACKAGE_VERSION=$(sed -n '/\"version\"/s/[^0-9.]//gp' package.json | tr -d '\n')
git tag "v$PACKAGE_VERSION"
echo ''
echo '---------------------'
echo 'Creating a new tag on Git...'
git push --tags
wait
# shellcheck disable=SC2103
cd ..
rm -rf npm
wait
pause
