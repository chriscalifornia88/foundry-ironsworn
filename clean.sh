#!/bin/bash

grep -rl 'Ask the Oracle' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/Ask[[:space:]]the[[:space:]]Oracle/Ask for Inspiration/g'
grep -rl 'Oracle' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/\bOracle\b/Inspiration/g'
grep -rl 'oracle' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/\boracle\b/inspiration/g'
grep -rl 'Oracles' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/\bOracles\b/Inspiration/g'
grep -rl 'oracles' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/\boracles\b/inspiration/g'
grep -rl 'or forbidden magic' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/or[[:space:]]forbidden[[:space:]]magic//g'
grep -rl 'totems' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/totems/items/g'
grep -rl 'Superstition' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/Superstition/belief/g'
grep -rl 'superstition' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/Superstition/belief/g'
grep -rl 'haunted' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/haunted/harrowed/g'
grep -rl 'Haunted' README.md CHANGELOG.md script src system | xargs sed -i '' -E 's/Haunted/Harrowed/g'
