// ─── Skeleton Card ────────────────────────────────────────────────────────────
export function SkeletonCard() {
    return (
        <div style={{
            background: '#fff', borderRadius: 24, border: '0.5px solid rgba(43, 95, 42, 0.15)',
            padding: '20px', display: 'flex', flexDirection: 'column', gap: 14,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="skeleton" style={{ height: 13, width: '40%', borderRadius: 6 }} />
                    <div className="skeleton" style={{ height: 10, width: '25%', borderRadius: 6 }} />
                </div>
                <div className="skeleton" style={{ height: 24, width: 70, borderRadius: 10 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <div className="skeleton" style={{ height: 15, width: '65%', borderRadius: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '100%', borderRadius: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '85%', borderRadius: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '55%', borderRadius: 6 }} />
            </div>
            <div style={{ display: 'flex', gap: 8, borderTop: '0.5px solid rgba(43, 95, 42, 0.15)', paddingTop: 12 }}>
                <div className="skeleton" style={{ height: 34, width: 100, borderRadius: 14 }} />
                <div className="skeleton" style={{ height: 34, width: 130, borderRadius: 14 }} />
            </div>
        </div>
    )
}
