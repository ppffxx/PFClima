#!/bin/bash
TOKEN=$(curl -s https://www.smn.gob.ar/ | grep "localStorage.setItem('token',.*" | grep -o ", '.*'" | tr -d "'" | sed 's-, \(.*\)$-\1-g')
echo "$TOKEN" > token.txt