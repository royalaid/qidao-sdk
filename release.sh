#!/bin/bash

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "The 'jq' command is not found. Please install it to proceed."
  exit 1
fi

# Check if gh is installed
if ! command -v gh &> /dev/null; then
  echo "The 'gh' command is not found. Please install it to proceed."
  exit 1
fi

# Read the version from package.json
VERSION=$(jq -r '.version' package.json)

if [ -z "$VERSION" ]; then
  echo "Version not found in package.json. Make sure the version is defined."
  exit 1
fi

# Check if the version is already published on GitHub
if gh release list | grep "v${VERSION}" &> /dev/null; then
  echo "Version v${VERSION} is already published on GitHub."
  read -p "Please bump the version in package.json, commit the change, and run the script again. Do you want to continue with the current version anyway? (y/n): " continue_with_version
  if [[ ! $continue_with_version =~ ^[Yy]$ ]]; then
    echo "User chose not to proceed. Exiting."
    exit 1
  fi
fi

# Fetch the latest tags from the remote repository
git fetch --tags

# Check if the tag exists on the remote repository
if git ls-remote --tags origin | grep "v${VERSION}" &> /dev/null; then
  echo "Tag v${VERSION} already exists on origin."
else
  # Get the short hash of the latest commit
  SHORT_HASH=$(git rev-parse --short HEAD)

  # Get the latest commit message with newline separators for clarity
  COMMIT_MSG=$(git log -1 --pretty=%B)

  # Prompt the user to create the tag, including the short hash and commit message
  echo -e "Tag v${VERSION} does not exist on origin. Latest commit:"
  echo -e "$SHORT_HASH - $COMMIT_MSG"
  read -p "Do you wish to create the tag? (y/n): " create_tag

  if [[ $create_tag =~ ^[Yy]$ ]]; then
    git tag "v${VERSION}"
    git push origin "v${VERSION}"
    echo "Tag v${VERSION} created and pushed to origin."
  else
    echo "User chose not to create the tag. Exiting."
    exit 1
  fi
fi

# The consumer-facing asset name (do NOT change — qidao, mai-api, maicron fetch this URL)
ASSET="qidao-sdk-v${VERSION}.tgz"

# Remove any stale tarball so we can unambiguously detect the one pnpm emits
rm -f "${ASSET}"

# Run the pack command. pnpm emits a tarball named "<scope>-<name>-<version>.tgz"
# (for @qidao/sdk that is "qidao-sdk-<version>.tgz" — note: NO leading "v"), whereas
# the published GitHub-release asset URL is "qidao-sdk-v<version>.tgz". Capture pnpm's
# exit status first, then rename the freshly emitted tarball to the consumer-facing name.
pnpm pack
PACK_STATUS=$?

# Check if the pnpm pack command was successful
if [ ${PACK_STATUS} -ne 0 ]; then
  echo "pnpm pack command failed. Exiting."
  exit 1
fi

# Locate the tarball pnpm just emitted (newest *.tgz in the repo root) and rename it
# to the consumer-facing asset name, preserving the existing release-asset URL.
EMITTED_TARBALL=$(ls -t ./*.tgz 2>/dev/null | head -n 1)

if [ -z "${EMITTED_TARBALL}" ]; then
  echo "pnpm pack did not produce a .tgz file. Exiting."
  exit 1
fi

if [ "${EMITTED_TARBALL}" != "./${ASSET}" ]; then
  mv -f "${EMITTED_TARBALL}" "./${ASSET}"
  echo "Renamed ${EMITTED_TARBALL} -> ./${ASSET}"
fi

# Create the GitHub release with custom parameters
gh release create "v${VERSION}" "./${ASSET}" --title "v${VERSION}" --notes "" --prerelease

# Check if the gh release command was successful
if [ $? -ne 0 ]; then
  echo "gh release command failed. Exiting."
  exit 1
fi

echo "Release created successfully!"

# Get the remote URL for 'origin'
REMOTE_URL=$(git remote get-url origin)

# Extract the GitHub username and repository name from the remote URL
USERNAME=$(echo "$REMOTE_URL" | sed -n 's/.*github.com[/:]\([^.]*\)\/\([^.]*\).git/\1/p')
REPO_NAME=$(echo "$REMOTE_URL" | sed -n 's/.*github.com[/:]\([^.]*\)\/\([^.]*\).git/\2/p')

# Define the tag name and asset name
TAG_NAME="v${VERSION}"
ASSET_NAME="qidao-sdk-v${VERSION}.tgz"

# Construct the full URL for the package on GitHub
PACKAGE_URL="https://github.com/${USERNAME}/${REPO_NAME}/releases/download/${TAG_NAME}/${ASSET_NAME}"

# Print the URL for including in package.json
echo "To include the package in a package.json file, use the following URL:"
echo "$PACKAGE_URL"
