# Library Update Steps

1. `npm update -S`: Update to current minor versions of all libraries. These shouldn't include any breaking changes, but still might, so it's best to verify with smoke tests.

2. `npm outdated`: Informs us of major version updates that we need to update manually. Often there are breaking API changes that require refactoring.

3. `npm audit`: Informs us of known security vulnerabilities, and `npm audit fix` to attempt to address them.
If dependencies have no patch, replace it with an alternative, or wait for the library to be patched.

4. `npm run lint` and `npm run test` to ensure compatibility between upgraded packages and syntax/styles.

Commit changes to both the `package.json` and `package-lock.json` and submit as a Merge Request.
