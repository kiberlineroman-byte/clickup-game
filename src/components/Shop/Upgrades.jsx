import React from 'react';

const upgradeList = [
  { id: 1, name: 'Wooden Mallet', effect: '+1 Coin/click', baseCost: 10, type: 'click', value: 1 },
  { id: 2, name: 'Rusty Cog', effect: '+1 Coin/sec', baseCost: 50, type: 'auto', value: 1 },
  { id: 3, name: 'Iron Gauntlet', effect: '+5 Coins/click', baseCost: 250, type: 'click', value: 5 },
  { id: 4, name: 'Steam Engine', effect: '+10 Coins/sec', baseCost: 1000, type: 'auto', value: 10 },
  { id: 5, name: 'Copper Wire', effect: 'x1.5 Click Power', baseCost: 2500, type: 'multiplier', value: 1.5 },
  { id: 6, name: 'Golden Touch', effect: '+100 Coins/click', baseCost: 10000, type: 'click', value: 100 },
  { id: 7, name: 'Energy Core', effect: '+250 Coins/sec', baseCost: 50000, type: 'auto', value: 250 },
  { id: 8, name: 'Cyber Link', effect: 'x2 Click Power', baseCost: 150000, type: 'multiplier', value: 2 },
  { id: 9, name: 'Nano-bots', effect: '+1,500 Coins/sec', baseCost: 500000, type: 'auto', value: 1500 },
  { id: 10, name: 'Titanium Pick', effect: '+5,000 Coins/click', baseCost: 2500000, type: 'click', value: 5000 },
  { id: 11, name: 'Fusion Reactor', effect: '+25,000 Coins/sec', baseCost: 10000000, type: 'auto', value: 25000 },
  { id: 12, name: 'Quantum Chip', effect: 'x3 Click Power', baseCost: 50000000, type: 'multiplier', value: 3 },
  { id: 13, name: 'Dyson Sphere', effect: '+200k Coins/sec', baseCost: 250000000, type: 'auto', value: 200000 },
  { id: 14, name: 'Reality Bridge', effect: '+1M Coins/click', baseCost: 1000000000, type: 'click', value: 1000000 },
  { id: 15, name: 'Matter Synthesizer', effect: '+5M Coins/sec', baseCost: 25000000000, type: 'auto', value: 5000000 },
  { id: 16, name: 'Time Warp', effect: 'x5 Click Power', baseCost: 100000000000, type: 'multiplier', value: 5 },
  { id: 17, name: 'Galactic Engine', effect: '+50M Coins/sec', baseCost: 500000000000, type: 'auto', value: 50000000 },
  { id: 18, name: 'The Singularity', effect: 'x10 Click Power', baseCost: 1000000000000, type: 'multiplier', value: 10 }
];

function Upgrades({ coins, handleBuyUpgrade }) {
  const formatPrice = (p) => {
    if (p >= 1000000000000) return (p/1000000000000).toFixed(1) + 'T';
    if (p >= 1000000000) return (p/1000000000).toFixed(1) + 'B';
    if (p >= 1000000) return (p/1000000).toFixed(1) + 'M';
    if (p >= 1000) return (p/1000).toFixed(1) + 'k';
    return p;
  };

  return (
    <div style={{ width: '100%', maxWidth: '700px', padding: '20px', paddingBottom: '100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '3rem', color: '#ffd700', fontWeight: '900' }}>ARMORY</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {upgradeList.map(u => {
          const canAfford = coins >= u.baseCost;
          return (
            <div key={u.id} className="pixel-box" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center', backgroundColor: '#1a1a2e' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff', marginBottom: '4px' }}>{u.name}</div>
                <div style={{ fontSize: '1rem', color: '#39ff14', fontWeight: 'bold' }}>{u.effect}</div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span style={{ color: '#ffd700', fontWeight: '900', fontSize: '1.3rem' }}>{formatPrice(u.baseCost)} 🟡</span>
                <button 
                  className="pixel-btn pixel-btn-gold" 
                  onClick={() => handleBuyUpgrade(u)} 
                  disabled={!canAfford} 
                  style={{ padding: '10px 20px', fontSize: '1.1rem', minWidth: '100px' }}
                >
                  BUY
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Upgrades;
