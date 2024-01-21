# Example Full Stack

<https://github.com/richiehales/deploying-full-stack-with-render-sample>

## Restore to last commit

git restore --source=HEAD --staged --worktree --source=HEAD --source=HEAD .

## .env file

SESSION_SECRET =    secret

### Start Server

nodemon app.js - in richi_ecommerce_fullstack

### Start client

npm start - after cd client

## JWT

1. Implement JSON Web Tokens (JWTs)
Net Ninja
<https://www.youtube.com/watch?v=SnoAwLP1a-0&t=2s>

Web Dev Simplified
<https://www.youtube.com/watch?v=7Q17ubqLfaM> --- Explanation
<https://www.youtube.com/watch?v=mbsmsi7l3r4> --- Example

Install above example, store token in local storage then pass as header when user is accessing orders.

## Password Hashing

1. Add passowrd hashing.
