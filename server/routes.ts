// server/routes.ts

import { Router } from 'express';

const router = Router();

// Register your API routes here
router.get('/api/example', (req, res) => {
    res.json({ message: 'This is an example route.' });
});

// Remove any geolocation blocking middleware or settings here
// (if any middleware was present, you would want to remove it)

export default router;