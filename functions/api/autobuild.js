export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    // Basic Auth validation
    const authHeader = request.headers.authorization;
    const username = process.env.CONTENTSTACK_CONTENT_PUBLISH_WEBHOOK_USERNAME;
    const password = process.env.CONTENTSTACK_CONTENT_PUBLISH_WEBHOOK_PASSWORD;

    if (!username || !password) {
      return response.status(500).json({
        success: false,
        message: 'Server configuration error: Missing webhook credentials',
      });
    }

    const expectedAuth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

    if (authHeader !== expectedAuth) {
      return response.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid credentials',
      });
    }

    // Extract webhook payload
    const { data } = request.body;

    // Validate webhook payload
    if (!data || !data.entry) {
      return response.status(400).json({
        success: false,
        message: 'Invalid payload: missing entry data',
      });
    }

    // Extract title and URL from the entry
    const title = data.entry.title || 'No title';
    const url = data.entry.url || data.entry.URL || 'No URL';

    // Success response
    return response.status(200).json({
      success: true,
      message: `${title} received successfully`,
      data: {
        title,
        url,
      },
    });
  } catch (error) {
    console.error('[Webhook] Error:', error);

    return response.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
