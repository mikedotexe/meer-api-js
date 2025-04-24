This directory used to contain another export for unencrypted file store, which means it needs access to the disk using `fs`.

We don't want this important package to get tangled up in that, and I'm not exactly sure why we're importing and then exporting them. Perhaps it was an attempt to streamline before, and there's more work to be done as we sweep through, but for now we cannot have `meer-api-js` assume it has access to `fs` because that's likely to cause big problems. The end user can simply import `@meer-js/keystores-node` if they know they'll be using it.
