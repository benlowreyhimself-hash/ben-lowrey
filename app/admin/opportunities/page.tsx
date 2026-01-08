'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import {
    VENTURES,
    VentureId,
    Opportunity,
    getOpportunities,
    saveOpportunity,
    deleteOpportunity,
    getVentureName,
    getVentureEmoji,
} from '@/lib/opportunities';

export default function AdminOpportunitiesPage() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [selectedVenture, setSelectedVenture] = useState<VentureId>('property');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [wordCount, setWordCount] = useState(50);
    const [isRephrasing, setIsRephrasing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Load opportunities on mount
    useEffect(() => {
        setOpportunities(getOpportunities());
    }, []);

    // Show toast notification
    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Handle AI rephrasing
    const handleRephrase = async () => {
        if (!description.trim()) {
            showToast('Please enter some content first', 'error');
            return;
        }

        setIsRephrasing(true);
        try {
            const response = await fetch('/api/rephrase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: description, wordCount }),
            });

            if (!response.ok) throw new Error('Failed to rephrase');

            const data = await response.json();
            setDescription(data.rephrased);
            showToast(`Rephrased to ~${wordCount} words`, 'success');
        } catch {
            showToast('Failed to rephrase content', 'error');
        } finally {
            setIsRephrasing(false);
        }
    };

    // Handle save
    const handleSave = () => {
        if (!title.trim() || !description.trim()) {
            showToast('Please fill in both title and description', 'error');
            return;
        }

        setIsSaving(true);
        try {
            const newOpportunity = saveOpportunity({
                ventureId: selectedVenture,
                title: title.trim(),
                description: description.trim(),
            });
            setOpportunities([...opportunities, newOpportunity]);
            setTitle('');
            setDescription('');
            showToast('Opportunity saved!', 'success');
        } catch {
            showToast('Failed to save opportunity', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    // Handle delete
    const handleDelete = (id: string) => {
        deleteOpportunity(id);
        setOpportunities(opportunities.filter(o => o.id !== id));
        showToast('Opportunity deleted', 'success');
    };

    // Group opportunities by venture
    const groupedOpportunities = VENTURES.map(venture => ({
        ...venture,
        items: opportunities.filter(o => o.ventureId === venture.id),
    })).filter(g => g.items.length > 0);

    return (
        <div className="admin-layout">
            {/* Header */}
            <header className="admin-header">
                <h1>🎯 Opportunities Admin</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link href="/">← Back to Site</Link>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>

            <div className="admin-container">
                {/* Add New Opportunity */}
                <div className="admin-card">
                    <h2>✨ Add New Opportunity</h2>

                    <div className="form-group">
                        <label>Venture Category</label>
                        <select
                            value={selectedVenture}
                            onChange={(e) => setSelectedVenture(e.target.value as VentureId)}
                        >
                            {VENTURES.map(v => (
                                <option key={v.id} value={v.id}>
                                    {v.emoji} {v.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Opportunity Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Looking for JV Partners"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            placeholder="Describe the opportunity in your own words... the AI will help you refine it."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Target Word Count for AI Rephrase</label>
                        <div className="word-count-options">
                            {[30, 50, 80, 100].map(count => (
                                <button
                                    key={count}
                                    className={`word-count-btn ${wordCount === count ? 'active' : ''}`}
                                    onClick={() => setWordCount(count)}
                                >
                                    {count} words
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="btn-ai"
                            onClick={handleRephrase}
                            disabled={isRephrasing || !description.trim()}
                        >
                            {isRephrasing ? (
                                <>
                                    <span className="spinner" />
                                    Rephrasing...
                                </>
                            ) : (
                                <>✨ Rephrase with AI</>
                            )}
                        </button>

                        <button
                            className="btn-save"
                            onClick={handleSave}
                            disabled={isSaving || !title.trim() || !description.trim()}
                        >
                            {isSaving ? (
                                <>
                                    <span className="spinner" />
                                    Saving...
                                </>
                            ) : (
                                <>💾 Save Opportunity</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Current Opportunities */}
                <div className="admin-card">
                    <h2>📋 Current Opportunities ({opportunities.length})</h2>

                    {groupedOpportunities.length === 0 ? (
                        <div className="empty-state">
                            <p>No opportunities yet. Add your first one above!</p>
                        </div>
                    ) : (
                        <div className="opportunity-list">
                            {groupedOpportunities.map(group => (
                                group.items.map(opp => (
                                    <div key={opp.id} className="opportunity-item">
                                        <span className="venture-tag">
                                            {getVentureEmoji(opp.ventureId)} {getVentureName(opp.ventureId)}
                                        </span>
                                        <div className="opportunity-item-content">
                                            <h4>{opp.title}</h4>
                                            <p>{opp.description}</p>
                                        </div>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(opp.id)}
                                            title="Delete opportunity"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}
