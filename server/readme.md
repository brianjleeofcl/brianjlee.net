# portfolio site API

#### Purpose

1. To bypass Medium's write-only API
2. Make it easier to track data for projects

### Medium

Access through `GET /v1/medium/@brianjleeofcl`.

Server makes HTTP request to medium.com/@brianjleeofcl, sends back the resulting html returned.

Scrubs `<script>...</script>` tags and removes before sending back the response. Adds `<base target="_blank">` tag to `<head>` to allow links to open in a new tab.