# AI_NOTES.md

## AI Usage Summary

AI tools were used during the development of this project primarily for:

- Structuring backend architecture (Express route organization)
- Debugging deployment issues (CORS, MongoDB Atlas, environment variables)
- Configuring production deployment (Render, Vercel)
- Generating boilerplate code for API integration
- Improving error handling and production setup

## What Was Verified Manually

The following were tested and verified manually:

- MongoDB Atlas connection setup
- CORS configuration and production origin handling
- API route structure and endpoint correctness
- Frontend to backend communication
- Deployment configuration on Render and Vercel
- Environment variable setup and validation
- Full application functionality in production

All critical integration steps (database connection, route testing, deployment validation) were personally tested.

## LLM & Provider Used

This application integrates:

- **Model:** Grok (via OpenRouter)
- **Provider:** OpenRouter
- **Reason for Choice:** Cost-effective access, flexible model routing, and easy integration with standard OpenAI-compatible API format.

OpenRouter was selected because it allows model flexibility and efficient cost management for a deployed full-stack application.