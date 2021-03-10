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
  echo '---------------------'
  echo 'Package ready!'
  echo ''
  read -r -s -n 1 -p 'Press any key to continue...'
  echo ''
}

echo '----------------'
echo '| Yoonit Utils |'
echo '----------------'
echo 'Updating repository...'
git checkout development
git pull
wait
echo ''
echo '---------------------'
echo 'Cleaning files...'
rm -rf node_modules
rm -rf npm
rm -rf dist
wait
echo ''
echo '---------------------'
echo 'Installing dependencies...'
npm i
wait
echo ''
echo '---------------------'
echo 'Running linter...'
npm run lint
wait
echo ''
echo '---------------------'
echo 'Running Unit Tests...'
npm run test:unit:coverage
wait
echo ''
echo '---------------------'
echo 'Building...'
npm run build
wait
echo ''
echo '---------------------'
echo 'Preparing "npm" folder to deploy...'
mkdir npm
cp -fR dist/* npm
cp README.md npm/README.md
cp LICENSE npm/LICENSE
cp package.json npm/package.json
rm -rf dist
pause
