# Library Update Steps

1. `npm update -S`: Update to current minor versions of all libraries. These shouldn't include any breaking changes, but still might, so it's best to verify with smoke tests.

2. `npm outdated`: Informs us of major version updates that we need to update manually. Often there are breaking API changes that require refactoring.

3. `npm audit`: Informs us of known security vulnerabilities. If dependencies have no patch, replace it with an alternative, or wait for the library to be patched.

Commit changes to both the `package.json` and `package-lock.json` and submit as a Merge Request.
