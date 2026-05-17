const SCREENS = ['map','capture','missions','ranking','me'];

function setScreen(id){
  SCREENS.forEach(s=>{
    document.getElementById('screen-'+s).classList.toggle('active', s===id);
    const nb = document.getElementById('nav-'+s);
    if(nb) nb.classList.toggle('active', s===id);
  });
}

// Filter chips toggle
document.querySelectorAll('.filter-chip').forEach(chip=>{
  chip.addEventListener('click', function(){
    document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('on'));
    this.classList.add('on');
  });
});

// Mission tabs toggle
document.querySelectorAll('.m-tab').forEach(tab=>{
  tab.addEventListener('click', function(){
    document.querySelectorAll('.m-tab').forEach(t=>t.classList.remove('active'));
    this.classList.add('active');
  });
});

// AI species option toggle
document.querySelectorAll('.ai-species-opt').forEach(opt=>{
  opt.addEventListener('click', function(){
    document.querySelectorAll('.ai-species-opt').forEach(o=>o.classList.remove('selected'));
    this.classList.add('selected');
  });
});

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZmVkZW4tNDEiLCJhIjoiY21wOXFzbDN2MGFnaDJ1c2d1OGNjaTVtbCJ9.HP5o04UWeSZUBSXUYISwwA';

// Wait for mapboxgl to load from CDN
let mapboxLoadTimeout = setInterval(() => {
  if (window.mapboxgl) {
    clearInterval(mapboxLoadTimeout);
    initializeMap();
  }
}, 500);

// Fallback timeout after 5 seconds
setTimeout(() => {
  clearInterval(mapboxLoadTimeout);
  if (!window.mapboxgl) {
    const container = document.getElementById('mapbox-map');
    if (container) {
      container.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#D4E8C2,#C8DFA8);flex-direction:column;color:#555;text-align:center;padding:20px;font-family:var(--font-body);">
          <div style="font-size:48px;margin-bottom:10px">🗺</div>
          <div style="font-size:16px;font-weight:600;margin-bottom:8px">Mapbox Setup Required</div>
          <div style="font-size:12px;line-height:1.6;max-width:280px;opacity:0.8">
            <p>To enable the interactive map:</p>
            <ol style="text-align:left;display:inline-block;margin-top:10px">
              <li>Get a free token at <strong>mapbox.com</strong></li>
              <li>Update the token in <strong>script.js</strong></li>
              <li>Reload this page</li>
            </ol>
            <p style="margin-top:12px;font-size:11px;opacity:0.7">See MAPBOX_SETUP.md for details</p>
          </div>
        </div>
      `;
    }
  }
}, 5000);

function initializeMap() {
  const container = document.getElementById('mapbox-map');
  if (!container) {
    console.warn('mapbox-map container not found');
    return;
  }

  if (!window.mapboxgl) {
    console.warn('Mapbox GL JS not loaded');
    return;
  }

  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  try {
    const map = new mapboxgl.Map({
      container: 'mapbox-map',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [11.57549, 48.13743],
      zoom: 12.2,
      attributionControl: false
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true }), 'top-right');

    map.on('load', () => {
      const markers = [
        { coords: [11.57549, 48.13743], emoji: '🌳', title: 'Gesunder Baum' },
        { coords: [11.565, 48.135], emoji: '🦠', title: 'Krankheitscluster' },
        { coords: [11.59, 48.145], emoji: '⛈', title: 'Sturmschaden' },
        { coords: [11.583, 48.128], emoji: '❓', title: 'Fehlend' }
      ];

      markers.forEach(marker => {
        const el = document.createElement('div');
        el.className = 'map-marker';
        el.textContent = marker.emoji;
        el.title = marker.title;
        new mapboxgl.Marker(el).setLngLat(marker.coords).addTo(map);
      });

      const missionZone = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [11.565, 48.147],
            [11.575, 48.147],
            [11.575, 48.142],
            [11.565, 48.142],
            [11.565, 48.147]
          ]]
        }
      };

      map.addSource('mission-zone', { type: 'geojson', data: missionZone });
      map.addLayer({
        id: 'mission-zone-fill',
        type: 'fill',
        source: 'mission-zone',
        paint: {
          'fill-color': '#004DBA',
          'fill-opacity': 0.1
        }
      });
      map.addLayer({
        id: 'mission-zone-line',
        type: 'line',
        source: 'mission-zone',
        paint: {
          'line-color': '#004DBA',
          'line-width': 2,
          'line-dasharray': [2, 2]
        }
      });
    });

    map.on('error', (e) => console.error('Map error:', e));
  } catch (err) {
    console.error('Failed to initialize map:', err);
  }
}
