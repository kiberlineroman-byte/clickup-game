import React, { useState } from 'react';

function SettingsPanel({ onReset }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSave = () => {
    alert('Progress manually saved!');
  };

  const handleInfo = (type) => {
    alert(`Opening ${type}...`);
  };

  return (
    <div style={{ width: '100%', maxWidth: '450px', padding: '20px', paddingBottom: '60px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '2.5rem', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>Settings</h2>

      <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.6)', border: '1px solid #444' }}>
        <h3 style={{ borderBottom: '2px solid #555', paddingBottom: '10px', marginBottom: '20px', color: '#ccc', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>Audio</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Sound Effects</span>
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            style={{ padding: '8px 25px', backgroundColor: soundEnabled ? '#4CAF50' : '#555', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', boxShadow: soundEnabled ? '0 0 10px rgba(76,175,80,0.5)' : 'none' }}
          >
            {soundEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.6)', border: '1px solid #444' }}>
        <h3 style={{ borderBottom: '2px solid #555', paddingBottom: '10px', marginBottom: '20px', color: '#ccc', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>Progress</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={handleSave} 
            style={{ padding: '15px', backgroundColor: '#2196F3', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'transform 0.1s', boxShadow: '0 4px 10px rgba(33,150,243,0.4)' }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.97)'} onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Save Progress
          </button>
          <button 
            onClick={onReset} 
            style={{ padding: '15px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'transform 0.1s', boxShadow: '0 4px 10px rgba(244,67,54,0.4)' }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.97)'} onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Reset Data
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.6)', border: '1px solid #444' }}>
        <h3 style={{ borderBottom: '2px solid #555', paddingBottom: '10px', marginBottom: '20px', color: '#ccc', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>Info</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Credits', 'Contact Us', 'Privacy Policy'].map(item => (
            <button 
              key={item} 
              onClick={() => handleInfo(item)}
              style={{ padding: '12px', backgroundColor: '#333', color: '#ddd', border: '1px solid #555', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#444'} onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
