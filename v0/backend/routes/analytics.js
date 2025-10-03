app.post('/analytics', async (req, res) => {
  const event = req.body;
  
  // Store in database
  await db.collection('analytics').insertOne(event);
  
  // Forward to Google Analytics
  await forwardToGA(event);
  
  // Real-time dashboard update
  io.emit('analytics_event', event);
  
  res.json({ success: true });
});