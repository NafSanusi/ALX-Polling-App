# Polling App API Spec

## POST /api/create-poll

Body: { "question": "string", "options": ["string", "string"] }
Response: { "success": true, "pollId": "string" }

## POST /api/vote

Body: { "pollId": "string", "optionId": "string" }
Response: { "success": true }

## GET /api/poll/:id

Response: {
"id": "string",
"question": "string",
"options": [
{ "id": "string", "option_text": "string", "votes": number }
]
}
