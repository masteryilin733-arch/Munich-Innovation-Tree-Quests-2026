# Mapbox Setup Instructions

The interactive map requires a valid Mapbox access token.

## Getting Your Mapbox Token

1. Visit [mapbox.com](https://www.mapbox.com)
2. Sign up for a free account (or log in)
3. Go to your Account settings → Tokens
4. Create a new token with `Maps: Read` scope
5. Copy your public token (starts with `pk.`)

## Updating the Token

Replace the placeholder token in `script.js`:

```javascript
const MAPBOX_ACCESS_TOKEN = 'pk.YOUR_TOKEN_HERE';
```

Paste your actual token in place of `YOUR_TOKEN_HERE`.

## Testing

After updating the token:
1. Save the file
2. Reload the page at `http://localhost:8000`
3. The map should load with markers and mission zones

## Troubleshooting

- **"Map loading..." message persists**: Token is invalid or expired
- **CORS errors**: Try a different browser or clear cache
- **Map shows but no tiles**: Check your Mapbox account quota/billing

---

The app uses Mapbox GL v2.16.1 with:
- Outdoors vector tiles
- Interactive navigation controls
- Custom emoji markers
- Mission zone overlays
