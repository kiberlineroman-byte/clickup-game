function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = ['Play', 'Levels', 'Upgrades', 'Skins', 'Achievement', 'Settings', 'Exit'];
  
  return (
    <div style={{ width: '160px', backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
      {menuItems.map(item => (
        <button 
          key={item} 
          onClick={() => setActiveTab(item)}
          style={{
            padding: '15px', 
            margin: '5px 10px',
            backgroundColor: activeTab === item ? '#ddd' : '#fff',
            color: '#000',
            border: '1px solid #ccc',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
