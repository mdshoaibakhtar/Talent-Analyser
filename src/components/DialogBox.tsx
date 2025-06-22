import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

export default function DialogBox({ open, onClose, data }: { open: boolean; onClose: () => void; data: any }) {
    // Provide default values to avoid errors when data is {}
    const summary = data?.summary ?? '';
    const matching_score = data?.matching_score ?? 0;
    const matching = data?.matching ?? {};
    const missing = data?.missing ?? {};
    const note_of_improvement = data?.note_of_improvement ?? [];

    console.log('DialogBox data:', data);
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}
                >
                    {"Use Google's location service?"}
                    <Button
                        onClick={onClose}
                        sx={{ minWidth: 0, padding: 0, ml: 2 }}
                        aria-label="close"
                    >
                        <span style={{ fontSize: 20, fontWeight: 'bold' }}>&times;</span>
                    </Button>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {/* Candidate Summary */}
                    <DialogContentText id="candidate-summary" sx={{ mb: 2 }}>
                        {summary}
                    </DialogContentText>

                    {/* Matching Score Meter */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                        <span style={{ fontWeight: 500, marginRight: 12 }}>Matching Score:</span>
                        <div style={{ flex: 1, marginRight: 12 }}>
                            <div style={{
                                background: '#e0e0e0',
                                borderRadius: 8,
                                height: 16,
                                width: '100%',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${matching_score}%`,
                                    background: matching_score > 80 ? '#4caf50' : matching_score > 60 ? '#ffb300' : '#f44336',
                                    height: '100%',
                                    transition: 'width 0.5s'
                                }} />
                            </div>
                        </div>
                        <span style={{ minWidth: 32, fontWeight: 600 }}>{matching_score}%</span>
                    </div>

                    {/* Matching Details */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
                        <div style={{ flex: 1, minWidth: 220 }}>
                            <h4 style={{ margin: '12px 0 8px' }}>Technical Skills Match</h4>
                            <ul>
                                {(matching.technical_skills ?? []).map((skill: string) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                            <h4 style={{ margin: '16px 0 8px' }}>Soft Skills Match</h4>
                            <ul>
                                {(matching.soft_skills ?? []).map((skill: string) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                            <h4 style={{ margin: '16px 0 8px' }}>Domain Knowledge Match</h4>
                            <ul>
                                {(matching.domain_knowledge ?? []).map((item: string) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <h4 style={{ margin: '16px 0 8px' }}>Responsibilities Match</h4>
                            <ul>
                                {(matching.responsibilities ?? []).map((item: string) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ flex: 1, minWidth: 220 }}>
                            <h4 style={{ margin: '12px 0 8px', color: '#d32f2f' }}>Missing Technical Skills</h4>
                            <ul>
                                {(missing.technical_skills ?? []).map((skill: string) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                            <h4 style={{ margin: '16px 0 8px', color: '#d32f2f' }}>Missing Experience/Responsibilities</h4>
                            <ul>
                                {(missing.experience_or_responsibilities ?? []).map((item: string) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <h4 style={{ margin: '16px 0 8px', color: '#d32f2f' }}>Missing Domain Knowledge</h4>
                            <ul>
                                {(missing.domain_knowledge ?? []).map((item: string) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <h4 style={{ margin: '16px 0 8px', color: '#d32f2f' }}>Missing Certifications</h4>
                            <ul>
                                {(missing.certifications ?? []).map((item: string) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <DialogContent
                        sx={{
                            background: '#fffde7',
                            mb: 2,
                            borderRadius: 1,
                            height: 'auto',
                            maxHeight: 'none',
                            overflow: 'visible',
                            p: 3
                        }}
                    >
                        <DialogContentText sx={{ fontWeight: 600, color: '#ff9800', mb: 1 }}>
                            Note of Improvements:
                        </DialogContentText>
                        <ul style={{ marginTop: 0, marginBottom: 16, paddingLeft: 24 }}>
                            {(note_of_improvement ?? []).map((note: string, idx: number) => (
                                <li key={idx} style={{ marginBottom: 4 }}>{note}</li>
                            ))}
                        </ul>
                    </DialogContent>
                    <Divider />
                </DialogContent>
                {/* Note of Improvements - moved to the end */}
                <Divider />
                <DialogActions sx={{ justifyContent: 'flex-end' }}>
                    <Button onClick={onClose}>Disagree</Button>
                    <Button onClick={onClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
