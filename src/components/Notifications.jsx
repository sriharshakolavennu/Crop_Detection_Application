import React from 'react'

export default function Notifications({items=[]}){
  return (
    <div className="notifications card">
      <h4>Notifications</h4>
      <ul>
        {items.length===0 && <li className="muted">No notifications</li>}
        {items.map((n,i)=> (
          <li key={i} className={n.unread? 'unread':''}>
            <div className="notif-title">{n.title}</div>
            <div className="notif-time muted">{n.time}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
