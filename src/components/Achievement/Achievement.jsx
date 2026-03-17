import React from 'react';

const formatNumber = (p) => {
  if (p >= 1000000000000) return (p/1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
  if (p >= 1000000000) return (p/1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (p >= 1000000) return (p/1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (p >= 1000) return (p/1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return p;
};

const achievementsList = [
  { id: 1, name: 'First Steps', req: 10, reward: 100 },
  { id: 2, name: 'Rookie Tapper', req: 50, reward: 500 },
  { id: 3, name: 'Fast Fingers', req: 100, reward: 1000 },
  { id: 4, name: 'Steady Hand', req: 500, reward: 2500 },
  { id: 5, name: 'Click Master', req: 1000, reward: 5000 },
  { id: 6, name: 'Iron Finger', req: 2500, reward: 10000 },
  { id: 7, name: 'Auto-Clicker', req: 5000, reward: 15000 },
  { id: 8, name: 'Speed Demon', req: 10000, reward: 50000 },
  { id: 9, name: 'Hyper Tapper', req: 25000, reward: 100000 },
  { id: 10, name: 'Infinite Tapper', req: 50000, reward: 150000 },
  { id: 11, name: 'Click Architect', req: 100000, reward: 500000 },
  { id: 12, name: 'Sonic Tapper', req: 250000, reward: 1000000 },
  { id: 13, name: 'God of Clicks', req: 500000, reward: 2000000 },
  { id: 14, name: 'Cosmic Entity', req: 1000000, reward: 5000000 }
];

function Achievement({ totalClicks, claimedAchievements, onClaim }) {
  return (
    <div style={{ width: '100%', maxWidth: '800px', padding: '20px', paddingBottom: '80px', animation: 'float 4s ease-in-out infinite' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '3.5rem', color: '#ffd700', fontWeight: '900' }}>QUEST LOG</h2>
      <div className="pixel-box" style={{ padding: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '10px', padding: '15px 20px', backgroundColor: '#0f3460', fontWeight: 'bold', borderBottom: '4px solid #fff', textAlign: 'center', fontSize: '1.1rem' }}>
          <div>Mission</div>
          <div>Goal</div>
          <div>Loot</div>
          <div>Status</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {achievementsList.map((ach, index) => {
            const isCompleted = totalClicks >= ach.req;
            const isClaimed = claimedAchievements.includes(ach.id);
            return (
              <div key={ach.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '10px', padding: '15px 20px', alignItems: 'center', borderBottom: index !== achievementsList.length - 1 ? '4px solid #1a1a2e' : 'none', textAlign: 'center', backgroundColor: isClaimed ? '#1a3a24' : 'transparent' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: isClaimed ? '#a5d6a7' : '#fff' }}>{ach.name}</div>
                <div style={{ fontSize: '1rem', color: '#aaa', fontWeight: 'bold' }}>
                  {formatNumber(totalClicks)} / {formatNumber(ach.req)}
                </div>
                <div style={{ fontWeight: 'bold', color: '#ffd700', fontSize: '1.2rem' }}>{formatNumber(ach.reward)} 🟡</div>
                <div>
                  {isClaimed ? (
                    <button className="pixel-btn" disabled style={{ padding: '8px 15px', fontSize: '0.9rem' }}>DONE</button>
                  ) : isCompleted ? (
                    <button className="pixel-btn pixel-btn-green" onClick={() => onClaim(ach)} style={{ padding: '8px 15px', fontSize: '0.9rem' }}>CLAIM</button>
                  ) : (
                    <button className="pixel-btn" disabled style={{ padding: '8px 15px', fontSize: '0.9rem', opacity: 0.5 }}>LOCKED</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Achievement;
