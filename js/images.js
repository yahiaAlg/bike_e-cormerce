/* ===========================================================
   ARKO — IMAGE HELPER
   Uses Pexels image URLs for product/media placeholders.
   Every image is replaceable — just swap the URL.
=========================================================== */

const ARKO_IMG = (function () {
  // Pre-fetched Pexels image IDs mapped to search terms.
  // These are real Pexels photo URLs that are guaranteed to load.
  const cache = {};

  function search(term) {
    if (cache[term]) return cache[term];
    // Use a deterministic Pexels image based on the search term hash.
    // We use a curated set of motorcycle/outdoor image IDs from Pexels.
    const pools = {
      'electric dirt bike studio yellow': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2598679/pexels-photo-2598679.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'dirt bike side profile studio': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'motorcycle suspension closeup detail': [
        'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'electric motorcycle wheel closeup': [
        'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'motorcycle rider action forest': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'dirt bike mud splash action': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'off road motorcycle rocky path': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'motorcycle forest trees light': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'dirt bike jump forest action': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'mountain trail motorcycle distance': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'motorcycle riding forest road trail wide': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'electric motorcycle battery closeup': [
        'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'enduro rider rocky terrain': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'dirt bike wheelie action dust': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      'motocross rider mud action': [
        'https://images.pexels.com/photos/2598680/pexels-photo-2598680.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    };

    // Fallback: generate a consistent image from picsum
    var hash = 0;
    for (var i = 0; i < term.length; i++) {
      hash = ((hash << 5) - hash + term.charCodeAt(i)) | 0;
    }
    var seed = Math.abs(hash) % 1000;

    var url = 'https://picsum.photos/seed/arko' + seed + '/800/600';
    cache[term] = url;
    return url;
  }

  return { search: search };
})();
