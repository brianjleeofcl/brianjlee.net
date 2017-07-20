# portfolio site API

A loose implementation of RESTful API

#### Purpose

1. To bypass Medium's write-only API
2. Make it easier to track data for projects
3. Messaging without thirdparty plugins

### Medium

##### HTTP parameters

| | |
--- | ---
route | /api/v1/medium/@brianjleeofcl
method | GET
MIME | Text/HTML

Server makes HTTP request to medium.com/@brianjleeofcl, sends back the resulting html returned.

Scrubs `<script>...</script>` tags and removes before sending back the response. Adds `<base target="_blank">` tag to `<head>` to allow links to open in a new tab.

### Project

##### HTTP parameters

| | |
--- | ---
route | /api/v1/projects/
method | GET
MIME | Application/JSON

Fetch text data from GitHub gist, requests data from GitHub API and responds with JSON of relevant info needed for client to display project cards

### Email

##### HTTP parameters

| | |
--- | ---
route | /api/v1/email/send
method | POST 
MIME | Application/JSON
properties | `name`, `email`, `message`

Uses Nodemailer to send email based on message attached in JSON form
