export default function handler(request, response) {
  response.status(200).json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
