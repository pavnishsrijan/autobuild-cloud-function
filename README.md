# Contentstack Launch Cloud Functions

Serverless cloud functions for Contentstack autobuild webhook handling.

## Structure

```
/functions
  /health.js          -> GET /health
  /api
    /autobuild.js     -> POST /api/autobuild
```

## Endpoints

### 1. Health Check
- **URL**: `/health`
- **Method**: GET
- **Response**:
  ```json
  {
    "success": true,
    "status": "ok",
    "timestamp": "2025-11-28T10:00:00.000Z"
  }
  ```

### 2. Autobuild Webhook
- **URL**: `/api/autobuild`
- **Method**: POST
- **Authentication**: Basic Auth
- **Headers**:
  - `Authorization: Basic <base64(username:password)>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "data": {
      "entry": {
        "title": "Example Entry",
        "url": "https://example.com"
      }
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Example Entry received successfully",
    "data": {
      "title": "Example Entry",
      "url": "https://example.com"
    }
  }
  ```

## Environment Variables

Set these in Contentstack Launch project settings:

- `CONTENTSTACK_CONTENT_PUBLISH_WEBHOOK_USERNAME` - Username for webhook authentication
- `CONTENTSTACK_CONTENT_PUBLISH_WEBHOOK_PASSWORD` - Password for webhook authentication

## Deployment

1. Push your code to the Git repository connected to Contentstack Launch
2. In Contentstack Launch:
   - Go to your project settings
   - Set Framework Preset to "Other"
   - Add environment variables in the Environment Variables section
   - Deploy the project

3. Your cloud functions will be available at:
   - `https://your-project.contentstack.com/health`
   - `https://your-project.contentstack.com/api/autobuild`

## Local Testing

Cloud functions are designed for Contentstack Launch and cannot be run locally as-is. For local development, use the original Express server in the `/autobuild` directory.

## Notes

- Cloud functions have a 30-second timeout limit
- Memory limit: 1024 MB
- Runtime: Node.js
- File system is read-only (except `/tmp`)
