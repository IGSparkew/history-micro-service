# !bin/sh

buf generate
buf export . --output ../gestion-api/src/proto
buf export . --output ../input-api/src/proto