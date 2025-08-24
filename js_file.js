// Helper to build reliable Unsplash crops
function unsplash(id){ 
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=300&h=450&q=60`; 
}

// Fallback posters per genre
const FALLBACK_POSTER = {
  action: unsplash('photo-1517912006852-717c0946ac1a'),
  drama: unsplash('photo-1489599849927-2ee91cede3ba'),
  scifi: unsplash('photo-1497215728101-4950e8b45efb'),
  horror: unsplash('photo-1601925228316-f6064f10f2ce'),
  comedy: unsplash('photo-1517604931442-7e0c8ed2963c'),
  default: unsplash('photo-1524985069026-dd778a71c7b4') // cinema seats
};

// Backup items to swap in when an image is broken ("change the movie and their photo")
const BACKUP_POOL = {
  action: [ { title:'John Wick', year:2014, rating:7.4, poster:unsplash('photo-1517912006852-717c0946ac1a'), type:'movie', genre:'action' } ],
  drama:  [ { title:'The Pursuit of Happyness', year:2006, rating:8.0, poster:unsplash('photo-1489599849927-2ee91cede3ba'), type:'movie', genre:'drama' } ],
  scifi:  [ { title:'Ex Machina', year:2014, rating:7.7, poster:unsplash('photo-1497215728101-4950e8b45efb'), type:'movie', genre:'scifi' } ],
  horror: [ { title:'A Quiet Place', year:2018, rating:7.5, poster:unsplash('photo-1601925228316-f6064f10f2ce'), type:'movie', genre:'horror' } ],
  comedy: [ { title:'The Nice Guys', year:2016, rating:7.3, poster:unsplash('photo-1517604931442-7e0c8ed2963c'), type:'movie', genre:'comedy' } ]
};

// Base dataset (movies + series)
const DATA = [
  { title:'Inception', year:2010, rating:8.8, poster:unsplash('photo-1440404653325-ab127d49abc1'), genre:'scifi', type:'movie' },
  { title:'The Dark Knight', year:2008, rating:9.0, poster:unsplash('photo-1509347528160-9a9e33742cdb'), genre:'action', type:'movie' },
  { title:'Interstellar', year:2014, rating:8.6, poster:unsplash('photo-1446776709462-d6b525c57bd3'), genre:'scifi', type:'movie' },
  { title:'Parasite', year:2019, rating:8.5, poster:unsplash('photo-1489599849927-2ee91cede3ba'), genre:'drama', type:'movie' },
  { title:'The Matrix', year:1999, rating:8.7, poster:unsplash('photo-1536440136628-849c177e76a1'), genre:'scifi', type:'movie' },
  { title:'Pulp Fiction', year:1994, rating:8.9, poster:unsplash('photo-1594909122845-11baa439b7bf'), genre:'drama', type:'movie' },
  { title:'The Shawshank Redemption', year:1994, rating:9.3, poster:unsplash('photo-1478720568477-152d9b164e26'), genre:'drama', type:'movie' },
  { title:'Fight Club', year:1999, rating:8.8, poster:unsplash('photo-1485846234645-a62644f84728'), genre:'drama', type:'movie' },
  { title:'Dune', year:2021, rating:8.0, poster:unsplash('photo-1534447677768-be436bb09401'), genre:'scifi', type:'movie' },
  { title:'Joker', year:2019, rating:8.4, poster:unsplash('photo-1509281373149-e957c6296406'), genre:'drama', type:'movie' },
  { title:'Avatar', year:2009, rating:7.8, poster:unsplash('photo-1574267432553-4b4628081c31'), genre:'scifi', type:'movie' },
  { title:'Mad Max: Fury Road', year:2015, rating:8.1, poster:unsplash('photo-1506466010722-395aa2bef877'), genre:'action', type:'movie' },
  { title:'The Grand Budapest Hotel', year:2014, rating:8.1, poster:unsplash('photo-1445116572660-236099ec97a0'), genre:'comedy', type:'movie' },
  { title:'Hereditary', year:2018, rating:7.3, poster:unsplash('photo-1601925228316-f6064f10f2ce'), genre:'horror', type:'movie' },
  { title:'Get Out', year:2017, rating:7.7, poster:unsplash('photo-1559781914-acf08159357e'), genre:'horror', type:'movie' },
  { title:'Superbad', year:2007, rating:7.6, poster:unsplash('photo-1517604931442-7e0c8ed2963c'), genre:'comedy', type:'movie' },
  // Movies added previously
  { title:'The Godfather', year:1972, rating:9.2, poster:unsplash('photo-1485841890310-6a055c88698a'), genre:'drama', type:'movie' },
  { title:'Whiplash', year:2014, rating:8.5, poster:unsplash('photo-1470225620780-dba8ba36b745'), genre:'drama', type:'movie' },
  { title:'Blade Runner 2049', year:2017, rating:8.0, poster:unsplash('photo-1497215728101-4950e8b45efb'), genre:'scifi', type:'movie' },
  { title:'The Social Network', year:2010, rating:7.8, poster:unsplash('photo-1498050108023-c5249f4df085'), genre:'drama', type:'movie' },
  { title:'Spider‑Verse', year:2018, rating:8.4, poster:unsplash('photo-1558981806-ec527fa84c39'), genre:'action', type:'movie' },
  { title:'La La Land', year:2016, rating:8.0, poster:unsplash('photo-1519681393784-d120267933ba'), genre:'drama', type:'movie' },
  { title:'The Prestige', year:2006, rating:8.5, poster:unsplash('photo-1478720568477-152d9b164e26'), genre:'drama', type:'movie' },
  { title:'Knives Out', year:2019, rating:7.9, poster:unsplash('photo-1497032628192-86f99bcd76bc'), genre:'comedy', type:'movie' },
  // Series
  { title:'Breaking Bad', year:2008, rating:9.5, poster:unsplash('photo-1522069213448-443a614da9b8'), genre:'drama', type:'series' },
  { title:'Stranger Things', year:2016, rating:8.7, poster:unsplash('photo-1542202229-7d93c33f5d07'), genre:'scifi', type:'series' },
  { title:'The Crown', year:2016, rating:8.6, poster:unsplash('photo-1519681393784-d120267933ba'), genre:'drama', type:'series' },
  { title:'The Mandalorian', year:2019, rating:8.7, poster:unsplash('photo-1495567720989-cebdbdd97913'), genre:'scifi', type:'series' },
  { title:'Game of Thrones', year:2011, rating:9.2, poster:unsplash('photo-1520975922323-3d0ad8ad1f49'), genre:'drama', type:'series' },
  { title:'Chernobyl', year:2019, rating:9.3, poster:unsplash('photo-1595433707802-6b2626ef1c86'), genre:'drama', type:'series' },
  { title:'The Boys', year:2019, rating:8.7, poster:unsplash('photo-1517912006852-717c0946ac1a'), genre:'action', type:'series' },
  { title:'Dark', year:2017, rating:8.8, poster:unsplash('photo-1482192596544-9eb780fc7f66'), genre:'scifi', type:'series' },
  { title:'The Last of Us', year:2023, rating:8.8, poster:unsplash('photo-1520974658310-2a6c1a2d3c54'), genre:'drama', type:'series' },
  { title:'Sherlock', year:2010, rating:9.1, poster:unsplash('photo-1519681393784-d120267933ba'), genre:'drama', type:'series' },
  { title:'Narcos', year:2015, rating:8.8, poster:unsplash('photo-1486946255434-2466348c2166'), genre:'drama', type:'series' },
  { title:'True Detective', year:2014, rating:9.0, poster:unsplash('photo-1491884662610-dfcd28f30cf5'), genre:'drama', type:'series' },
  { title:'Money Heist', year:2017, rating:8.2, poster:unsplash('photo-1520974735194-9b3d6a5e1a5f'), genre:'action', type:'series' },
  { title:'The Witcher', year:2019, rating:8.1, poster:unsplash('photo-1506744038136-46273834b3fb'), genre:'action', type:'series' },
  { title:'Severance', year:2022, rating:8.7, poster:unsplash('photo-1482192505345-5655af888cc4'), genre:'drama', type:'series' },
  { title:'Fleabag', year:2016, rating:8.7, poster:unsplash('photo-1525182008055-f88b95ff7980'), genre:'comedy', type:'series' }
];

let currentFilter = 'all';
let allItems = [];
let searchQuery = '';

function init(){ 
  allItems = [...DATA]; 
  bindUI(); 
  render(); 
}

function bindUI(){
  document.getElementById('searchForm').addEventListener('submit', e => { 
    e.preventDefault(); 
    searchMovies(); 
  });
  
  const tabs = document.getElementById('filterTabs');
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('button.filter-tab');
    if(!btn) return; 
    setFilter(btn.dataset.filter);
    [...tabs.querySelectorAll('button.filter-tab')].forEach(b=> 
      b.setAttribute('aria-pressed', String(b===btn))
    );
  });
  
  document.getElementById('toTopBtn').addEventListener('click', () => 
    window.scrollTo({top:0, behavior:'smooth'})
  );
}

function getBase(){
  const bySearch = searchQuery ? 
    allItems.filter(i => i.title.toLowerCase().includes(searchQuery)) : 
    allItems;
  return currentFilter==='all' ? 
    bySearch : 
    bySearch.filter(i => i.genre===currentFilter);
}

function render(){
  const base = getBase();
  const trending = [...base].sort((a,b)=>b.rating-a.rating).slice(0,8);
  const movies = base.filter(i=>i.type==='movie').slice(0,12);
  const shows = base.filter(i=>i.type==='series').slice(0,12);
  mount('trendingGrid', trending);
  mount('moviesGrid', movies);
  mount('showsGrid', shows);
}

function mount(id, items){
  const grid = document.getElementById(id); 
  if(!grid) return; 
  grid.innerHTML='';
  items.forEach((item, idx) => {
    const card = createCard(item);
    card.style.animation = 'fadeInUp .6s ease-out both';
    card.style.animationDelay = `${idx*0.06}s`;
    grid.appendChild(card);
  });
}

function createCard(item){
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.tabIndex = 0; 
  card.role = 'button';
  
  const img = document.createElement('img');
  img.className = 'movie-poster'; 
  img.loading = 'lazy'; 
  img.alt = `Poster of ${item.title}`; 
  img.src = item.poster;
  
  // If the poster fails, change BOTH the image and the item (swap to a backup title)
  img.addEventListener('error', () => handlePosterError(card, img, item));

  const info = document.createElement('div'); 
  info.className = 'movie-info';
  
  const h3 = document.createElement('h3'); 
  h3.className = 'movie-title'; 
  h3.textContent = item.title;
  
  const meta = document.createElement('div'); 
  meta.className = 'movie-meta';
  
  const year = document.createElement('span'); 
  year.className = 'movie-year'; 
  year.textContent = `${item.year}${item.type==='series'?' • Series':''}`;
  
  const rating = document.createElement('span'); 
  rating.className = 'movie-rating'; 
  rating.textContent = item.rating;
  
  meta.append(year, rating); 
  info.append(h3, meta);

  card.append(img, info);
  card.addEventListener('click', () => 
    alert(`${item.title} (★ ${item.rating}) - ${item.type==='series'?'Series':'Movie'} • ${item.year}`)
  );
  card.addEventListener('keydown', (e)=>{ 
    if(e.key==='Enter'||e.key===' '){ 
      e.preventDefault(); 
      card.click(); 
    } 
  });
  return card;
}

function handlePosterError(card, img, item){
  // Prevent infinite loops
  if(img.dataset.fallbackApplied) { 
    img.src = FALLBACK_POSTER[item.genre] || FALLBACK_POSTER.default; 
    return; 
  }
  img.dataset.fallbackApplied = '1';
  
  // Try to swap to a backup item first (change title + poster)
  const pool = BACKUP_POOL[item.genre] || [];
  if(pool.length){
    const replacement = pool.shift(); // consume a backup
    // Update visual
    const titleEl = card.querySelector('.movie-title');
    const yearEl = card.querySelector('.movie-year');
    const ratingEl = card.querySelector('.movie-rating');
    if(titleEl) titleEl.textContent = replacement.title;
    if(yearEl) yearEl.textContent = `${replacement.year}${replacement.type==='series'?' • Series':''}`;
    if(ratingEl) ratingEl.textContent = replacement.rating;
    // Set image to replacement poster
    img.src = replacement.poster;
    return;
  }
  // Otherwise, just drop in a genre-appropriate fallback poster
  img.src = FALLBACK_POSTER[item.genre] || FALLBACK_POSTER.default;
}

function setFilter(filter){ 
  currentFilter = filter; 
  toggleLoading(true); 
  setTimeout(()=>{ 
    render(); 
    toggleLoading(false); 
  }, 250); 
}

function searchMovies(){ 
  searchQuery = document.getElementById('searchInput').value.trim().toLowerCase(); 
  toggleLoading(true); 
  setTimeout(()=>{ 
    render(); 
    toggleLoading(false); 
  }, 250); 
}

function toggleLoading(b){ 
  document.getElementById('loading').classList.toggle('active', b); 
}

document.addEventListener('DOMContentLoaded', init);