#!env bash
THE_VER=$(
    cat package.json | \
    grep -E '"version":\s*"(.+)"' | \
    grep -E -o '[0-9]+\.[0-9]+\.[0-9]+'
)

if [ "$THE_VER" == '' ]; then
    echo No version detected from package.json.
    exit;
fi

echo Publishing version "$THE_VER".

TEST_TAG=$(git tag | grep $THE_VER)

if [ "$TEST_TAG" != "" ]; then
    echo ERROR: The version $THE_VER already exists.
    exit;
fi

rm -f npm-shrinkwrap.json

npm shrink
npm publish

git tag v$THE_VER
git push --tag

rm -f npm-shrinkwrap.json
