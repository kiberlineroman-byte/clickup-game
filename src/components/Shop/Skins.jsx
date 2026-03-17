import React from 'react';

export const skinsList = [
  { id: 1, name: 'Plastic', price: 0, style: { backgroundColor: '#000', borderRadius: '50%' } },
  { id: 2, name: 'Neon', price: 5000, style: { backgroundColor: '#0ff', boxShadow: '0 0 20px #0ff', borderRadius: '50%' } },
  { id: 3, name: 'Retro Pixel', price: 25000, style: { backgroundColor: '#8b0000', border: '4px solid #550000', borderRadius: '4px' } },
  { id: 4, name: 'Molten Lava', price: 100000, style: { background: 'radial-gradient(circle, #ffaa00, #ff0000)', boxShadow: '0 0 30px #ff0000', borderRadius: '50%' } },
  { id: 5, name: 'Gold', price: 500000, style: { background: 'gold', border: '4px solid #fff', borderRadius: '50%' } },
  { id: 6, name: 'Cyber Punk', price: 1000000, style: { backgroundColor: '#ff00ff', boxShadow: '0 0 20px #ff00ff, 0 0 40px #00ffff', borderRadius: '50%' } },
  { id: 7, name: 'Deep Space', price: 5000000, style: { background: 'radial-gradient(circle, #1a0033, #000)', boxShadow: '0 0 30px #4b0082', borderRadius: '50%' } },
  { id: 8, name: 'Diamond', price: 10000000, style: { background: 'radial-gradient(circle, #e0ffff, #00ced1)', border: '3px solid #fff', transform: 'rotate(45deg)', borderRadius: '20%' } },
  { id: 9, name: 'Black Hole', price: 100000000, style: { backgroundColor: '#000', boxShadow: '0 0 40px #ff4500, 0 0 100px #8a2be2', borderRadius: '50%' } },
  { id: 10, name: 'Neutron Star', price: 1000000000, style: { backgroundColor: '#fff', boxShadow: '0 0 60px #87cefa, 0 0 120px #fff', borderRadius: '50%' } },
  { id: 11, name: 'Solar Flare', price: 10000000000, style: { background: 'radial-gradient(circle, #ffcc00, #ff4400)', animation: 'plasma-pulse 1.5s ease-in-out infinite', borderRadius: '50%' } },
  { id: 12, name: 'Frozen Heart', price: 50000000000, style: { background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', boxShadow: '0 0 40px #4facfe', animation: 'ice-shimmer 2s linear infinite', borderRadius: '50%' } },
  { id: 13, name: 'Void Reaper', price: 250000000000, style: { background: 'conic-gradient(#000, #4b0082, #000)', borderRadius: '30%', animation: 'vortex 3s linear infinite' } },
  { id: 14, name: 'Galactic Core', price: 1000000000000, style: { background: 'conic-gradient(#ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)', borderRadius: '50%', animation: 'spin 5s linear infinite' } },
  { id: 15, name: 'Infinity Edge', price: 10000000000000, style: { background: '#fff', boxShadow: '0 0 50px #fff', animation: 'rainbow-glow 2s linear infinite', borderRadius: '50%' } }
];

function Skins({ coins, setCoins, ownedSkins, setOwnedSkins, currentSkinId, setCurrentSkinId }) {
  const formatPrice = (p) => {
    if (p === 0) return 'FREE';
    if (p >= 1000000000000) return (p/1000000000000).toFixed(1) + 'T';
    if (p >= 1000000000) return (p/1000000000).toFixed(1) + 'B';
    if (p >= 1000000) return (p/1000000).toFixed(1) + 'M';
    if (p >= 1000) return (p/1000).toFixed(1) + 'k';
    return p;
  };
  return (
    <div style={{ width: '100%', maxWidth: '900px', padding: '20px', paddingBottom: '80px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '3rem', color: '#ffd700', fontWeight: '900' }}>SKIN SHOP</h2>
      <style>{`
        @keyframes plasma-pulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 20px #ff4400; } 50% { transform: scale(1.1); box-shadow: 0 0 60px #ffcc00; } }
        @keyframes ice-shimmer { 0% { filter: hue-rotate(0deg) brightness(1); } 50% { filter: hue-rotate(20deg) brightness(1.5); } 100% { filter: hue-rotate(0deg) brightness(1); } }
        @keyframes vortex { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(0.8); } 100% { transform: rotate(360deg) scale(1); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes rainbow-glow { 0% { box-shadow: 0 0 30px #ff0000; } 50% { box-shadow: 0 0 30px #00ff00; } 100% { box-shadow: 0 0 30px #0000ff; } }
      `}</style>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px' }}>
        {skinsList.map(s => {
          const isOwned = ownedSkins.includes(s.id);
          const isEquipped = currentSkinId === s.id;
          return (
            <div key={s.id} className="pixel-box" style={{ padding: '25px', textAlign: 'center', borderColor: isEquipped ? '#39ff14' : '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90px' }}>
                <div style={{ width: '70px', height: '70px', border: '4px solid #fff', ...s.style }}></div>
              </div>
              <div style={{ margin: '15px 0', fontWeight: 'bold', fontSize: '1.2rem' }}>{s.name}</div>
              <button className="pixel-btn" onClick={() => {
                if (isOwned) setCurrentSkinId(s.id);
                else if (coins >= s.price) { setCoins(c => c - s.price); setOwnedSkins(os => [...os, s.id]); setCurrentSkinId(s.id); }
              }} disabled={!isOwned && coins < s.price} style={{ width: '100%', padding: '12px 0', backgroundColor: isEquipped ? '#4CAF50' : (isOwned ? '#2196F3' : '#ff9800') }}>
                {isEquipped ? 'EQUIPPED' : (isOwned ? 'SELECT' : formatPrice(s.price))}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Skins;
