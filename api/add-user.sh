#!/bin/bash
set -ex

curl -X POST "http://localhost:8082/create" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"password\": \"123\"}"