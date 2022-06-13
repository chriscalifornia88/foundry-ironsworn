#!/bin/bash

find script src system -name '*Oracle*' -exec rename 's/Oracle/Inspiration/' {} ";"
find script src system -name '*oracle*' -exec rename 's/oracle/inspiration/' {} ";"
