#!/bin/bash
#
# Author: Josh Begleiter
# Date: 2014-10-17
# Description: Print week ranges for a given month starting on Mondays

# Monday is day 1
day_of_week=1

# Current month number for comparison
c_month=$(date +%m)

# Previous month number for comparison
p_month=$(date -d'-1 month' +%m)

# Previous month number for comparison
l_month=$(date -d'-2 month' +%m)

# The previous monday to start
s_monday=$(( $(date +%Y%m%d) - $(( $(date +%u) - $day_of_week)) ))

# Roll back until we find the previous month
while [ $(date -d"$s_monday" +%m) != "$p_month" ]
do
  s_monday=$(date -d"-1 weeks $s_monday" +%Y%m%d)
done

# Store the previous result to start so that we end on the correct week in the following while loop
e_monday=$s_monday
s_monday=$(date -d"-1 weeks $s_monday" +%Y%m%d)

# Roll back until we find the month before last
while [ $(date -d"$s_monday" +%m) != "$l_month" ]
do
  echo "${s_monday}-${e_monday}"
  e_monday=$s_monday
  s_monday=$(date -d"-1 weeks $s_monday" +%Y%m%d)
done
