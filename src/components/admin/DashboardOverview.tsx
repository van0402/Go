import React from 'react'
import type { Payload } from 'payload'

export default async function DashboardOverview({ payload }: { payload: Payload }) {
  const [total, newLeads, contacted, closed, recent] = await Promise.all([
    payload.count({ collection: 'inquiries' }),
    payload.count({ collection: 'inquiries', where: { status: { equals: 'new' } } }),
    payload.count({ collection: 'inquiries', where: { status: { equals: 'contacted' } } }),
    payload.count({ collection: 'inquiries', where: { status: { equals: 'closed' } } }),
    payload.find({ collection: 'inquiries', limit: 4, sort: '-createdAt', depth: 0 }),
  ])

  return (
    <div className="htply-dash">
      <div className="htply-metrics">
        <div className="htply-metric"><small>INQUIRIES</small><strong>{total.totalDocs}</strong><span>All time</span></div>
        <div className="htply-metric"><small>NEW LEADS</small><strong>{newLeads.totalDocs}</strong><span>Awaiting first response</span></div>
        <div className="htply-metric"><small>CONTACTED</small><strong>{contacted.totalDocs}</strong><span>In conversation</span></div>
        <div className="htply-metric"><small>CLOSED</small><strong>{closed.totalDocs}</strong><span>Completed</span></div>
      </div>
      <div className="htply-dash-grid">
        <section className="htply-card">
          <h3>Recent inquiries</h3>
          <table>
            <thead><tr><th>Company</th><th>Product</th><th>Country</th><th>Status</th></tr></thead>
            <tbody>
              {recent.docs.map((d) => (
                <tr key={d.id}>
                  <td><b>{d.company}</b></td>
                  <td>{d.product ?? '-'}</td>
                  <td>{d.country}</td>
                  <td><span className={`htply-badge htply-badge--${d.status ?? 'new'}`}>{d.status ?? 'new'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="htply-card">
          <h3>Quick actions</h3>
          <div className="htply-quick">
            <a href="/admin/collections/inquiries">View all inquiries →</a>
            <a href="/admin/collections/inquiries?where[status][equals]=new">View new leads →</a>
            <a href="/" target="_blank" rel="noreferrer">View website ↗</a>
          </div>
        </section>
      </div>
    </div>
  )
}
