import { useState, useEffect } from 'react';
import LevelsGrid from './components/Levels/LevelsGrid';
import Upgrades from './components/Shop/Upgrades';
import Skins, { skinsList } from './components/Shop/Skins';
import Achievement from './components/Achievement/Achievement';
import SettingsPanel from './components/Settings/SettingsPanel';

const formatNumber = (p) => {
  if (p >= 1000000000000) return (p/1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
  if (p >= 1000000000) return (p/1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (p >= 1000000) return (p/1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (p >= 1000) return (p/1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return p;
};

const getLevelConfig = (lvl) => { return { target: lvl * 50 + 50, time: 15, reward: lvl * 300 }; };

const getInitialState = () => {
  const savedData = localStorage.getItem('clickupSaveData');
  if (savedData) return JSON.parse(savedData);
  return { score: 0, coins: 0, totalClicks: 0, clickPower: 1, autoClick: 0, ownedSkins: [1], currentSkinId: 1, claimedAchievements: [], unlockedLevel: 1 };
};

function App() {
  const [activeTab, setActiveTab] = useState('Menu');
  const initialState = getInitialState();
  const [score, setScore] = useState(initialState.score);
  const [coins, setCoins] = useState(initialState.coins); 
  const [totalClicks, setTotalClicks] = useState(initialState.totalClicks); 
  const [clickPower, setClickPower] = useState(initialState.clickPower);
  const [autoClick, setAutoClick] = useState(initialState.autoClick);
  const [ownedSkins, setOwnedSkins] = useState(initialState.ownedSkins); 
  const [currentSkinId, setCurrentSkinId] = useState(initialState.currentSkinId);
  const [claimedAchievements, setClaimedAchievements] = useState(initialState.claimedAchievements); 
  const [unlockedLevel, setUnlockedLevel] = useState(initialState.unlockedLevel || 1); 

  const [currentLevel, setCurrentLevel] = useState(null); 
  const [levelStatus, setLevelStatus] = useState(null); 
  const [levelTime, setLevelTime] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [isNewWin, setIsNewWin] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem('clickupSaveData', JSON.stringify({ score, coins, totalClicks, clickPower, autoClick, ownedSkins, currentSkinId, claimedAchievements, unlockedLevel }));
  }, [score, coins, totalClicks, clickPower, autoClick, ownedSkins, currentSkinId, claimedAchievements, unlockedLevel]);

  useEffect(() => {
    if (autoClick > 0) {
      const interval = setInterval(() => {
        setScore(prev => prev + autoClick); setCoins(prev => prev + autoClick); setTotalClicks(prev => prev + autoClick); 
        if (currentLevel && levelStatus === 'playing') setLevelProgress(prev => prev + autoClick);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClick, currentLevel, levelStatus]);

  useEffect(() => {
    if (currentLevel && levelStatus === 'playing' && levelTime > 0) {
      const timer = setTimeout(() => setLevelTime(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (levelTime === 0 && levelStatus === 'playing') setLevelStatus('lost');
  }, [levelTime, currentLevel, levelStatus]);

  useEffect(() => {
    if (currentLevel && levelStatus === 'playing') {
      const config = getLevelConfig(currentLevel);
      if (levelProgress >= config.target) {
        if (currentLevel === unlockedLevel) { 
          setIsNewWin(true); setCoins(prev => prev + config.reward); setUnlockedLevel(prev => prev + 1); 
        } else { setIsNewWin(false); }
        setLevelStatus('won');
      }
    }
  }, [levelProgress, currentLevel, levelStatus, unlockedLevel]);

  const handleMainClick = () => {
    setScore(prev => prev + clickPower); setCoins(prev => prev + clickPower); setTotalClicks(prev => prev + clickPower); 
    if (currentLevel && levelStatus === 'playing') setLevelProgress(prev => prev + clickPower);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 100);
  };

  const handleBuyUpgrade = (u) => { if (coins >= u.baseCost) { setCoins(prev => prev - u.baseCost); if (u.type === 'click') setClickPower(prev => prev + u.value); if (u.type === 'auto') setAutoClick(prev => prev + u.value); if (u.type === 'multiplier') setClickPower(prev => prev * u.value); } };
  const handleClaimAchievement = (a) => { if (!claimedAchievements.includes(a.id)) { setCoins(prev => prev + a.reward); setClaimedAchievements(prev => [...prev, a.id]); } };
  const handlePlayLevel = (lvl) => { setCurrentLevel(lvl); setLevelStatus('playing'); setLevelTime(getLevelConfig(lvl).time); setLevelProgress(0); setIsNewWin(false); setActiveTab('Play'); };
  const handleResetData = () => { if (window.confirm("RESET ALL DATA?")) { setScore(0); setCoins(0); setTotalClicks(0); setClickPower(1); setAutoClick(0); setOwnedSkins([1]); setCurrentSkinId(1); setClaimedAchievements([]); setUnlockedLevel(1); localStorage.removeItem('clickupSaveData'); } };

  const activeSkinStyle = skinsList.find(s => s.id === currentSkinId)?.style || skinsList[0].style;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {activeTab !== 'Menu' && (
        <button className="pixel-btn" onClick={() => { setActiveTab('Menu'); setCurrentLevel(null); setLevelStatus(null); }} style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', fontSize: '1rem', zIndex: 10 }}>MENU</button>
      )}
      {activeTab !== 'Menu' && activeTab !== 'Exit' && (
        <div className="pixel-box" style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px 20px', zIndex: 10 }}>
            <h3 style={{ margin: '0', color: '#ffd700', fontSize: '1.2rem', fontWeight: 'bold' }}>COINS: {formatNumber(coins)}</h3>
        </div>
      )}
      {activeTab === 'Menu' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '280px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '3.5rem', color: '#ff0055', fontWeight: '900' }}>CLICK UP</h1>
          {['Play', 'Levels', 'Upgrades', 'Skins', 'Achievement', 'Settings', 'Exit'].map(item => (
            <button key={item} className="pixel-btn" onClick={() => { if (item === 'Play') setCurrentLevel(null); setActiveTab(item); }} style={{ padding: '12px', fontSize: '1.4rem' }}>{item}</button>
          ))}
        </div>
      )}
      {activeTab === 'Play' && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
          {currentLevel ? (
            <div className="pixel-box" style={{ marginBottom: '20px', padding: '15px 30px', width: '360px', backgroundColor: '#0f3460' }}>
              <div style={{ fontWeight: '900', fontSize: '1.6rem', marginBottom: '8px', color: '#39ff14' }}>STAGE {currentLevel}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginBottom: '8px', fontWeight: 'bold' }}>
                <span>TARGET: {formatNumber(getLevelConfig(currentLevel).target)}</span>
                <span style={{ color: levelTime <= 5 ? '#ff4444' : '#fff' }}>TIME: {levelTime}S</span>
              </div>
              <div className="pixel-progress-bar"><div className="pixel-progress-fill" style={{ width: `${Math.min((levelProgress / getLevelConfig(currentLevel).target) * 100, 100)}%` }}></div></div>
              <div style={{marginTop: '5px', fontSize: '1rem', fontWeight: 'bold'}}>PROG: {formatNumber(levelProgress)}</div>
            </div>
          ) : (
             <div className="pixel-box" style={{ marginBottom: '20px', padding: '8px 25px', fontSize: '1.4rem', color: '#ffd700', fontWeight: '900' }}>ENDLESS MODE</div>
          )}
          <h1 style={{ margin: '5px', fontSize: '6rem', fontWeight: '900' }}>{formatNumber(score)}</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', color: '#fff', marginTop: '5px', fontSize: '1.4rem', fontWeight: 'bold' }}>
            <span style={{color: '#e94560'}}>STR: {formatNumber(clickPower)}</span>
            <span style={{color: '#4CAF50'}}>AUTO: {formatNumber(autoClick)}</span>
          </div>
          <div onClick={handleMainClick} className={isAnimating ? 'click-active' : ''} style={{ width: '260px', height: '260px', marginTop: '30px', cursor: 'pointer', border: '8px solid #fff', borderRadius: '50%', boxSizing: 'border-box', overflow: 'hidden', ...activeSkinStyle }}></div>
          {(levelStatus === 'won' || levelStatus === 'lost') && (
            <div className="pixel-box" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '40px', zIndex: 20, textAlign: 'center', borderColor: levelStatus === 'won' ? '#39ff14' : '#ff0000', backgroundColor: '#1a1a2e' }}>
              <h2 style={{ fontSize: '3.5rem', color: levelStatus === 'won' ? '#39ff14' : '#ff0000', margin: '0 0 15px 0', fontWeight: '900' }}>{levelStatus === 'won' ? 'VICTORY!' : 'FAILED'}</h2>
              <p style={{ fontSize: '1.5rem', color: '#ffd700', marginBottom: '25px', fontWeight: 'bold' }}>{isNewWin ? `+ ${formatNumber(getLevelConfig(currentLevel).reward)} COINS` : 'CLEARED'}</p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button className="pixel-btn" onClick={() => handlePlayLevel(currentLevel)} style={{ padding: '12px 25px', fontSize: '1.2rem' }}>RETRY</button>
                {levelStatus === 'won' && (<button className="pixel-btn pixel-btn-green" onClick={() => handlePlayLevel(currentLevel + 1)} style={{ padding: '12px 25px', fontSize: '1.2rem' }}>NEXT</button>)}
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === 'Levels' && <div style={{width: '90%', height: '80%', overflowX: 'auto', overflowY: 'hidden', marginTop: '60px'}}><LevelsGrid onPlayLevel={handlePlayLevel} unlockedLevel={unlockedLevel} /></div>}
      {activeTab === 'Upgrades' && <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', overflowY: 'auto', marginTop: '60px'}}><Upgrades coins={coins} handleBuyUpgrade={handleBuyUpgrade} /></div>}
      {activeTab === 'Skins' && <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', overflowY: 'auto', marginTop: '60px'}}><Skins coins={coins} setCoins={setCoins} ownedSkins={ownedSkins} setOwnedSkins={setOwnedSkins} currentSkinId={currentSkinId} setCurrentSkinId={setCurrentSkinId} /></div>}
      {activeTab === 'Achievement' && <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', overflowY: 'auto', marginTop: '60px'}}><Achievement totalClicks={totalClicks} claimedAchievements={claimedAchievements} onClaim={handleClaimAchievement} /></div>}
      {activeTab === 'Settings' && <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', overflowY: 'auto', marginTop: '60px'}}><SettingsPanel onReset={handleResetData} /></div>}
    </div>
  );
}
export default App;
