# DevTinder APIs

authRouter
- Post /signup
- Post /login
- Post /logout


profileRouter
- GET /Profile/view
- PATCH/profile/edit
- PATCH/profile/password


connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


userRouter
- GET /conectionRequest
- GET /requests/received
- GET /feed - GEts you profile of other userts on platform


status: ignore, interested,accepted, rejected