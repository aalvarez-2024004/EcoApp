export function FilterBtn({ active, onClick, children, count }) {
    return (
        <button onClick={onClick} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 22px', fontSize: 13, fontWeight: 700,
            borderRadius: 99, cursor: 'pointer', transition: 'all 0.2s', border: 'none',
            background: active ? '#2B5F2A' : 'transparent',
            color: active ? '#EEF3ED' : '#4b5a8a',
            flexShrink: 0,
        }}>
            {children}
            <span style={{
                padding: '2px 8px', borderRadius: 10, fontSize: 10,
                background: active ? 'rgba(238, 243, 237, 0.3)' : '#EEF3ED',
                color: active ? '#EEF3ED' : '#4b5a8a',
            }}>
                {count}
            </span>
        </button>
    )
}