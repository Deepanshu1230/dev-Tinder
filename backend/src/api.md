# DevTinder Apis

## Auth Router

-Post /signup
-Post /login
-Post /logout

## profile Router

-Get /profile/view
-Patch /profile/edit
-patch /profile/password

## ConnectionRequestRouter

-Post- /request/send/interested/:userId
-Post- /request/send/ignore/:userId
-Post /request/review/accepted/:requestId
-Post /request/review/rejected/:requestId

## UserAuth

-Get /user/connection/recieved
-Get /request/recieved
-Get /user/feed - gets you the profiles of other on platform

Status - ignore,accepted,rejectd,interested
