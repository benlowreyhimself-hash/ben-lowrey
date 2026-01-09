'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import {
    VENTURES,
    VentureId,
    Opportunity,
    getVentureName,
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

    // Venture settings
    const [siteImages, setSiteImages] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [imagesLoading, setImagesLoading] = useState(true);
    const [ventureImages, setVentureImages] = useState<Record<string, string>>({});
    const [editingVenture, setEditingVenture] = useState<VentureId | null>(null);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [pickerMode, setPickerMode] = useState<'venture' | 'background'>('venture');
    const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load data on mount
    useEffect(() => {
        // Load from server API (persistent JSON file)
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                // Load opportunities
                setOpportunities(data.opportunities || []);

                // Load venture images (merge with defaults)
                const images: Record<string, string> = {};
                VENTURES.forEach(v => {
                    images[v.id] = data.ventureImages?.[v.id] || v.defaultImage;
                });
                setVentureImages(images);

                // Load uploaded images
                setUploadedImages(data.uploadedImages || []);

                // Load background images
                setBackgroundImages(data.backgroundImages || []);
            })
            .catch(err => {
                console.error('Failed to load settings:', err);
            });

        // Fetch site images (from public folder)
        setImagesLoading(true);
        fetch('/api/images')
            .then(res => res.json())
            .then(data => {
                console.log('Loaded images:', data.images?.length || 0);
                setSiteImages(data.images || []);
            })
            .catch(err => {
                console.error('Failed to load images:', err);
                setSiteImages([]);
            })
            .finally(() => setImagesLoading(false));
    }, []);

    // Show toast notification
    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Save all settings to server (writes to JSON file in codebase)
    const saveToServer = async (updates: {
        opportunities?: typeof opportunities;
        ventureImages?: typeof ventureImages;
        backgroundImages?: typeof backgroundImages;
        uploadedImages?: typeof uploadedImages;
    }) => {
        try {
            await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
        } catch (err) {
            console.error('Failed to save:', err);
        }
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

    // Handle save opportunity
    const handleSave = async () => {
        if (!title.trim() || !description.trim()) {
            showToast('Please fill in both title and description', 'error');
            return;
        }

        setIsSaving(true);
        try {
            const newOpportunity = {
                id: Date.now().toString(),
                ventureId: selectedVenture,
                title: title.trim(),
                description: description.trim(),
                createdAt: new Date().toISOString(),
            };
            const updated = [...opportunities, newOpportunity];
            setOpportunities(updated);
            await saveToServer({ opportunities: updated });
            setTitle('');
            setDescription('');
            showToast('Opportunity saved to codebase!', 'success');
        } catch {
            showToast('Failed to save opportunity', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    // Handle delete
    const handleDelete = async (id: string) => {
        const updated = opportunities.filter(o => o.id !== id);
        setOpportunities(updated);
        await saveToServer({ opportunities: updated });
        showToast('Opportunity deleted', 'success');
    };

    // Handle venture image selection
    const handleSelectImage = async (imageUrl: string) => {
        if (pickerMode === 'background') {
            // Add to background images
            const updated = [...backgroundImages, imageUrl];
            setBackgroundImages(updated);
            await saveToServer({ backgroundImages: updated });
            setShowImagePicker(false);
            showToast('Background image added', 'success');
        } else if (editingVenture) {
            const updated = { ...ventureImages, [editingVenture]: imageUrl };
            setVentureImages(updated);
            await saveToServer({ ventureImages: updated });
            setShowImagePicker(false);
            setEditingVenture(null);
            showToast('Thumbnail updated', 'success');
        }
    };

    // Handle remove background image
    const handleRemoveBackground = async (imageUrl: string) => {
        const updated = backgroundImages.filter(img => img !== imageUrl);
        setBackgroundImages(updated);
        await saveToServer({ backgroundImages: updated });
        showToast('Background image removed', 'success');
    };

    // Handle file upload
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editingVenture) return;

        // Convert to base64 for localStorage storage
        const reader = new FileReader();
        reader.onload = async () => {
            const base64 = reader.result as string;
            // Add to uploaded images list
            const newUploadedImages = [base64, ...uploadedImages.filter(img => img !== base64)].slice(0, 20);
            setUploadedImages(newUploadedImages);
            await saveToServer({ uploadedImages: newUploadedImages });

            // Set as venture image
            const newVentureImages = { ...ventureImages, [editingVenture]: base64 };
            setVentureImages(newVentureImages);
            await saveToServer({ ventureImages: newVentureImages });

            setShowImagePicker(false);
            setEditingVenture(null);
            showToast('Thumbnail uploaded', 'success');
        };
        reader.readAsDataURL(file);
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
                <h1>Opportunities Admin</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link href="/">Back to Site</Link>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>

            <div className="admin-container">
                {/* Background Images */}
                <div className="admin-card">
                    <h2>Background Images ({backgroundImages.length}/5 recommended)</h2>
                    <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
                        Select 3-5 images that will rotate as the blurred background on the homepage.
                    </p>

                    {backgroundImages.length > 0 && (
                        <div className="background-images-grid">
                            {backgroundImages.map((img, idx) => (
                                <div key={idx} className="background-image-item">
                                    <img src={img} alt={`Background ${idx + 1}`} />
                                    <button
                                        className="btn-remove-bg"
                                        onClick={() => handleRemoveBackground(img)}
                                        title="Remove"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        className="btn-add-background"
                        onClick={() => {
                            setPickerMode('background');
                            setShowImagePicker(true);
                        }}
                    >
                        Add Background Image
                    </button>
                </div>

                {/* Manage Ventures */}
                <div className="admin-card">
                    <h2>Manage Ventures</h2>
                    <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
                        Set thumbnail images for each venture category.
                    </p>

                    <div className="ventures-grid">
                        {VENTURES.map(venture => (
                            <div key={venture.id} className="venture-settings-item">
                                <img
                                    src={ventureImages[venture.id] || venture.defaultImage}
                                    alt={venture.name}
                                    className="venture-settings-thumb"
                                />
                                <div className="venture-settings-info">
                                    <h4>{venture.name}</h4>
                                    <button
                                        className="btn-change-thumb"
                                        onClick={() => {
                                            setPickerMode('venture');
                                            setEditingVenture(venture.id);
                                            setShowImagePicker(true);
                                        }}
                                    >
                                        Change Thumbnail
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add New Opportunity */}
                <div className="admin-card">
                    <h2>Add New Opportunity</h2>

                    <div className="form-group">
                        <label>Venture Category</label>
                        <select
                            value={selectedVenture}
                            onChange={(e) => setSelectedVenture(e.target.value as VentureId)}
                        >
                            {VENTURES.map(v => (
                                <option key={v.id} value={v.id}>
                                    {v.name}
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
                                <>Rephrase with AI</>
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
                                <>Save Opportunity</>
                            )}
                        </button>
                    </div>
                </div>

                {/* Current Opportunities */}
                <div className="admin-card">
                    <h2>Current Opportunities ({opportunities.length})</h2>

                    {groupedOpportunities.length === 0 ? (
                        <div className="empty-state">
                            <p>No opportunities yet. Add your first one above!</p>
                        </div>
                    ) : (
                        <div className="opportunity-list">
                            {groupedOpportunities.map(group => (
                                group.items.map(opp => (
                                    <div key={opp.id} className="opportunity-item">
                                        <img
                                            src={ventureImages[opp.ventureId] || VENTURES.find(v => v.id === opp.ventureId)?.defaultImage || ''}
                                            alt={getVentureName(opp.ventureId)}
                                            className="opportunity-item-thumb"
                                        />
                                        <div className="opportunity-item-content">
                                            <div className="opportunity-item-header">
                                                <h4>{opp.title}</h4>
                                                <span className="venture-tag">
                                                    {getVentureName(opp.ventureId)}
                                                </span>
                                            </div>
                                            <p>{opp.description}</p>
                                        </div>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(opp.id)}
                                            title="Delete opportunity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Image Picker Modal */}
            {showImagePicker && (
                <div className="modal-overlay" onClick={() => setShowImagePicker(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Select Thumbnail</h3>
                            <button className="modal-close" onClick={() => setShowImagePicker(false)}>×</button>
                        </div>

                        <div className="modal-section">
                            <h4>Upload New Image</h4>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                            <button
                                className="btn-upload"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Choose File to Upload
                            </button>
                        </div>

                        {uploadedImages.length > 0 && (
                            <div className="modal-section">
                                <h4>Your Uploads ({uploadedImages.length})</h4>
                                <div className="image-grid">
                                    {uploadedImages.map((image, idx) => (
                                        <img
                                            key={`upload-${idx}`}
                                            src={image}
                                            alt=""
                                            className="image-grid-item"
                                            onClick={() => handleSelectImage(image)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="modal-section">
                            <h4>Or Choose from Site Images ({siteImages.length} available)</h4>
                            {imagesLoading ? (
                                <p>Loading images...</p>
                            ) : siteImages.length === 0 ? (
                                <p>No images found</p>
                            ) : (
                                <div className="image-grid">
                                    {siteImages.map(image => (
                                        <img
                                            key={image}
                                            src={image}
                                            alt=""
                                            className="image-grid-item"
                                            onClick={() => handleSelectImage(image)}
                                            onError={(e) => {
                                                // Hide broken images
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div className={`toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}
