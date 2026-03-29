function ProfileCard() {
    return (
        <div style={{borderRadius: 10, borderColor: "white", borderWidth: 10, display: "flex", flexDirection: "column", background: "linear-gradient(to-left, #ffffff, #e0e0e0)"}}>
            <img src="https://imgs.search.brave.com/rwE-hC6ESt3hBJZhImPkb-KvU26bLDKVe-OKv1y50-M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE0LzQz/LzU1LzE0NDM1NWQ3/YjM2YzVmNjQ2NDM1/NDIzNzk4MjgxY2U5/LmpwZw" style={{ borderRadius: 40, width: 60, height: 60 }} />
            <div style={{
                textAlign: 'left',
                margin: 0,
                marginBottom: 10,
                fontSize: '24px',
            }}>
                Purv Joshi
            </div>
            <div style={{fontWeight: "normal", fontSize: "12px"}}>Web Development | DevOps | Cloud Computing</div>
            <div style={{fontWeight: "normal", fontSize: "10px", paddingTop: "5px"}}>
                Navsari, Gujarat
            </div>
        </div>
    )
}

export default ProfileCard;