import React, { useState } from 'react';

const categories = [
  { name: 'Tapper', range: 'LVL 1-10', start: 1 },
  { name: 'Fast Fingers', range: 'LVL 11-20', start: 11 },
  { name: 'Click Master', range: 'LVL 21-30', start: 21 },
  { name: 'Auto-Clicker God', range: 'LVL 31-40', start: 31 },
  { name: 'Infinite Tapper', range: 'LVL 41-50', start: 41 },
  { name: 'Click Architect', range: 'LVL 51-60', start: 51 },
  { name: 'Sonic Tapper', range: 'LVL 61-70', start: 61 },
  { name: 'Flash Fingers', range: 'LVL 71-80', start: 71 },
  { name: 'Instant Clicker', range: 'LVL 81-90', start: 81 },
  { name: 'World Clicker', range: 'LVL 91-100', start: 91 }
];

function LevelsGrid({ onPlayLevel, unlockedLevel }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
          
          <button 
            onClick={() => setSelectedCategory(null)}
            style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', alignSelf: 'flex-start', fontWeight: 'bold', fontSize: '14px', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#666'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#555'}
          >
            ⬅ Back to Categories
          </button>
          
          <div style={{ backgroundColor: '#2a2a2a', color: '#fff', padding: '20px', borderRadius: '12px', width: '100%', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.6)', border: '1px solid #444' }}>
            <div style={{ fontWeight: 'bold', borderBottom: '2px solid #555', paddingBottom: '10px', marginBottom: '15px' }}>
              <div style={{ fontSize: '24px' }}>{selectedCategory.name}</div>
              <div style={{ fontSize: '14px', color: '#aaa' }}>{selectedCategory.range}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {Array.from({ length: 10 }).map((_, i) => {
                const levelNum = selectedCategory.start + i;
                const isLocked = levelNum > unlockedLevel;

                return (
                  <button 
                    key={levelNum} 
                    onClick={() => !isLocked && onPlayLevel(levelNum)}
                    disabled={isLocked}
                    style={{ 
                      padding: '15px', 
                      border: isLocked ? '1px solid #444' : '1px solid #4CAF50', 
                      backgroundColor: isLocked ? '#222' : '#1a3a24', 
                      color: isLocked ? '#666' : '#fff', 
                      cursor: isLocked ? 'not-allowed' : 'pointer', 
                      borderRadius: '8px', 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      transition: 'all 0.2s',
                      boxShadow: isLocked ? 'none' : '0 4px 10px rgba(76,175,80,0.3)'
                    }}
                    onMouseDown={(e) => !isLocked && (e.target.style.transform = 'scale(0.95)')}
                    onMouseUp={(e) => !isLocked && (e.target.style.transform = 'scale(1)')}
                    onMouseLeave={(e) => !isLocked && (e.target.style.transform = 'scale(1)')}
                  >
                    {isLocked ? `🔒 Level ${levelNum}` : `Level ${levelNum}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2.5rem', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>Select Campaign</h2>
      <div style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '900px' }}>
        {categories.map(cat => {
          const isCategoryLocked = cat.start > unlockedLevel && cat.start !== 1;
          
          return (
            <button 
              key={cat.name} 
              onClick={() => setSelectedCategory(cat)}
              style={{ backgroundColor: isCategoryLocked ? '#222' : '#2a2a2a', color: isCategoryLocked ? '#555' : '#fff', padding: '20px', borderRadius: '12px', width: '200px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', border: isCategoryLocked ? '1px solid #333' : '1px solid #555', cursor: 'pointer', transition: 'transform 0.1s' }}
              onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{isCategoryLocked ? '🔒 ' : ''}{cat.name}</div>
              <div style={{ fontSize: '14px', color: isCategoryLocked ? '#444' : '#aaa' }}>{cat.range}</div>
            </button>
          )
        })}
      </div>
    </div>
  );
}

export default LevelsGrid;
